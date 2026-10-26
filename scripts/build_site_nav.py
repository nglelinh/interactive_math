#!/usr/bin/env python3
"""Generate js/site-nav-data.js from the homepage chapter order and lesson files.

Re-run after adding a lesson HTML file. New pages are picked up from the
filesystem and from index.html card order; menu entries are not hand-edited.
"""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
DATA_OUT = ROOT / "js" / "site-nav-data.js"

# Homepage topic sections, in course order. keyword must appear in that section's h2.
CHAPTERS = [
    ("linear-algebra", "Đại số tuyến tính", "Linear algebra", "Đại Số Tuyến Tính"),
    ("calculus", "Giải tích", "Calculus", "Giải Tích -"),
    ("real-analysis", "Giải tích thực", "Real analysis", "Real Analysis"),
    ("complex-analysis", "Giải tích phức", "Complex analysis", "Complex Analysis"),
    ("fourier-analysis", "Fourier", "Fourier", "Fourier"),
    ("linear-programming", "Quy hoạch tuyến tính", "Linear programming", "Quy Hoạch Tuyến Tính"),
    ("convex-analysis", "Tối ưu lồi", "Convex optimization", "Tối Ưu Lồi"),
    ("optimization", "Tối ưu hóa", "Optimization", "Tối Ưu Hóa Tổng Quát"),
    ("graph-theory", "Đồ thị", "Graph theory", "Graph Theory"),
    ("algorithms-datastructures", "Thuật toán", "Algorithms", "Algorithms"),
    ("cryptography", "Mật mã", "Cryptography", "Mật Mã"),
    ("blockchain", "Blockchain", "Blockchain", "Blockchain"),
    ("mechanics", "Cơ học", "Mechanics", "Mechanics"),
    ("machine-learning", "Học máy", "Machine learning", "Machine Learning"),
]

# Not lessons: tests, empty stub, unlinked backup duplicate.
SKIP = {
    "css-test.html",
    "optimization/threejs_test.html",
    "optimization/lagrangian_fixed.html",
    "optimization/lagrangian_kkt_conditions_backup.html",
}

SCRIPT_RE = re.compile(
    r'\n?<script src="(?:\.\./)*js/site-nav-data\.js" data-site-nav="data"></script>\n'
    r'<script src="(?:\.\./)*js/site-nav\.js" data-site-nav="boot"></script>\n?'
)


def clean(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def page_title(path: Path) -> str:
    raw = path.read_text(encoding="utf-8", errors="ignore")
    title = re.search(r"<title>(.*?)</title>", raw, re.I | re.S)
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", raw, re.I | re.S)
    for match in (title, h1):
        if match:
            value = clean(match.group(1))
            value = re.sub(r"\s+-\s+Interactive Math\s*$", "", value, flags=re.I)
            if value:
                return value
    return path.stem.replace("_", " ")


def lesson_files() -> list[str]:
    found = []
    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT).as_posix()
        if rel == "index.html" or rel in SKIP:
            continue
        if rel.startswith("notes/"):
            continue
        found.append(rel)
    return found


def parse_homepage() -> list[list[tuple[str, str]]]:
    raw = INDEX.read_text(encoding="utf-8")
    sections = re.split(r'<div class="topic-section">', raw)[1:]
    if len(sections) != len(CHAPTERS):
        raise SystemExit(f"expected {len(CHAPTERS)} topic sections, found {len(sections)}")
    parsed: list[list[tuple[str, str]]] = []
    for (_cid, _vi, _en, keyword), section in zip(CHAPTERS, sections):
        h2 = re.search(r"<h2[^>]*>(.*?)</h2>", section, re.S)
        heading = clean(h2.group(1)) if h2 else ""
        if keyword not in heading:
            raise SystemExit(f"section heading {heading!r} does not contain {keyword!r}")
        cards = re.findall(
            r"openIllustration\('([^']+)'\)[\s\S]{0,800}?<div class=\"card-title\"[^>]*>\s*(.*?)\s*</div>",
            section,
        )
        opens = re.findall(r"openIllustration\('([^']+)'\)", section)
        if len(cards) != len(opens):
            raise SystemExit(f"card parse mismatch in section {keyword}: {len(cards)} titles, {len(opens)} links")
        parsed.append([(href, clean(label)) for href, label in cards])
    return parsed


def chapter_index_order(chapter_id: str) -> list[str]:
    index = ROOT / chapter_id / "index.html"
    if not index.exists():
        return []
    raw = index.read_text(encoding="utf-8", errors="ignore")
    ordered: list[str] = []
    for match in re.finditer(r"(?:href|openIllustration\()\s*['\"]([^'\"]+\.html)", raw):
        name = match.group(1)
        if name.startswith(("http", "../", "/")):
            continue
        rel = f"{chapter_id}/{Path(name).name}"
        if rel not in ordered and (ROOT / rel).is_file() and rel not in SKIP:
            ordered.append(rel)
    return ordered


def splice_extras(primary: list[str], extras: list[str], guide: list[str]) -> list[str]:
    result = list(primary)
    guide_pos = {href: i for i, href in enumerate(guide)}
    for href in extras:
        if href not in guide_pos:
            result.append(href)
            continue
        position = guide_pos[href]
        insert_at = len(result)
        for index, existing in enumerate(result):
            if existing in guide_pos and guide_pos[existing] > position:
                insert_at = index
                break
        result.insert(insert_at, href)
    return result


def unique_label(preferred: str, fallback: str, used: set[str]) -> str:
    label = preferred or fallback
    if label not in used:
        used.add(label)
        return label
    if fallback and fallback not in used:
        used.add(fallback)
        return fallback
    stem = fallback or preferred
    n = 2
    candidate = f"{label} ({n})"
    while candidate in used:
        n += 1
        candidate = f"{label} ({n})"
    used.add(candidate)
    return candidate


def build_data() -> dict:
    homepage = parse_homepage()
    available = set(lesson_files())
    assigned: dict[str, str] = {}
    chapters = []
    missing_links = []

    for (cid, vi, en, _keyword), cards in zip(CHAPTERS, homepage):
        lessons = []
        for href, card_label in cards:
            if not (ROOT / href).is_file():
                missing_links.append(href)
                continue
            if href in assigned:
                continue
            assigned[href] = cid
            lessons.append((href, card_label))
        chapters.append({"id": cid, "label": {"vi": vi, "en": en}, "lessons": lessons})

    by_id = {chapter["id"]: chapter for chapter in chapters}
    for href in lesson_files():
        if href in assigned:
            continue
        folder = href.split("/")[0]
        if folder not in by_id:
            raise SystemExit(f"no chapter for {href}")
        assigned[href] = folder
        by_id[folder]["lessons"].append((href, page_title(ROOT / href)))

    for chapter in chapters:
        cid = chapter["id"]
        primary = [href for href, _label in chapter["lessons"] if href in {c[0] for c in parse_cards(homepage, cid)}]
        # primary is already homepage order; extras were appended
        homepage_hrefs = [href for href, _label in parse_cards(homepage, cid) if (ROOT / href).is_file()]
        labels = {href: label for href, label in chapter["lessons"]}
        extras = [href for href, _label in chapter["lessons"] if href not in homepage_hrefs]
        ordered = splice_extras(homepage_hrefs, extras, chapter_index_order(cid))
        used: set[str] = set()
        rendered = []
        for href in ordered:
            preferred = labels.get(href) or page_title(ROOT / href)
            fallback = page_title(ROOT / href)
            rendered.append({"href": href, "label": unique_label(preferred, fallback, used)})
        chapter["lessons"] = rendered

    unused = sorted(available - set(assigned))
    if unused:
        raise SystemExit(f"lessons not assigned: {unused}")
    return {"chapters": chapters, "missingLinks": missing_links}


def parse_cards(homepage: list[list[tuple[str, str]]], cid: str) -> list[tuple[str, str]]:
    for (chapter_id, _vi, _en, _keyword), cards in zip(CHAPTERS, homepage):
        if chapter_id == cid:
            return cards
    return []


def write_data(payload: dict) -> None:
    body = json.dumps(payload["chapters"], ensure_ascii=False, indent=2)
    DATA_OUT.write_text(
        "/* Generated by scripts/build_site_nav.py. Do not edit by hand. */\n"
        f"window.SITE_NAV_DATA = {json.dumps({'chapters': payload['chapters']}, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    # body kept so a JSON-only mistake fails loudly above via dumps
    del body


def inject_scripts() -> int:
    updated = 0
    pages = ["index.html", *lesson_files()]
    # lesson_files excludes index and skips. Home still needs the menu.
    for rel in pages:
        path = ROOT / rel
        text = path.read_text(encoding="utf-8")
        text = SCRIPT_RE.sub("\n", text)
        depth = rel.count("/")
        prefix = "../" * depth
        tag = (
            f'<script src="{prefix}js/site-nav-data.js" data-site-nav="data"></script>\n'
            f'<script src="{prefix}js/site-nav.js" data-site-nav="boot"></script>\n'
        )
        marker = text.lower().rfind("</body>")
        if marker < 0:
            raise SystemExit(f"no </body> in {rel}")
        text = text[:marker] + tag + text[marker:]
        path.write_text(text, encoding="utf-8")
        updated += 1
    return updated


def main() -> None:
    payload = build_data()
    write_data(payload)
    pages = inject_scripts()
    counts = {chapter["id"]: len(chapter["lessons"]) for chapter in payload["chapters"]}
    total = sum(counts.values())
    print(f"pages_with_nav={pages} lessons_in_menu={total}")
    for cid, count in counts.items():
        print(f"  {cid}: {count}")
    if payload["missingLinks"]:
        print("homepage links with no file:")
        for href in payload["missingLinks"]:
            print(f"  {href}")


if __name__ == "__main__":
    main()
