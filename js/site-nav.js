/* Shared course navigation — Unified Course Theme (Charcoal Monochrome #202020 + Source Sans 3 / Source Serif 4). */
(function () {
  "use strict";

  var data = window.SITE_NAV_DATA;
  if (!data || !data.chapters) {
    return;
  }

  var STRINGS = {
    vi: {
      brand: "Toán học Tương tác",
      home: "Trang chủ",
      menu: "Mục lục",
      close: "Đóng mục lục",
      label: "Mục lục bài học",
      notes: "Ghi chú nghiên cứu",
      github: "GitHub"
    },
    en: {
      brand: "Interactive Mathematics",
      home: "Home",
      menu: "Menu",
      close: "Close menu",
      label: "Lesson menu",
      notes: "Research Notes",
      github: "GitHub"
    }
  };

  function language() {
    var lang = (document.documentElement.getAttribute("lang") || "vi").toLowerCase();
    return lang.indexOf("en") === 0 ? "en" : "vi";
  }

  function text(key) {
    return STRINGS[language()][key];
  }

  function siteRoot() {
    var script = document.querySelector("script[data-site-nav='boot']");
    if (!script) {
      return new URL("./", window.location.href);
    }
    return new URL("../", script.src);
  }

  function relativeFromPage(targetPath) {
    var root = siteRoot();
    var dest = new URL(targetPath, root);
    var fromParts = window.location.pathname.split("/").slice(0, -1);
    var toParts = dest.pathname.split("/");
    var common = 0;
    while (common < fromParts.length && common < toParts.length - 1 && fromParts[common] === toParts[common]) {
      common += 1;
    }
    var ups = [];
    for (var i = common; i < fromParts.length; i += 1) {
      ups.push("..");
    }
    return ups.concat(toParts.slice(common)).join("/") || dest.href;
  }

  function currentLessonPath() {
    var root = siteRoot().pathname.replace(/\/$/, "");
    var here = window.location.pathname;
    if (root && here.indexOf(root) === 0) {
      here = here.slice(root.length);
    }
    return here.replace(/^\//, "");
  }

  function el(tag, className, attrs) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        node.setAttribute(key, attrs[key]);
      });
    }
    return node;
  }

  function ensureFonts() {
    if (document.querySelector("link[data-course-fonts]")) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute("data-course-fonts", "1");
    link.href = "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap";
    document.head.appendChild(link);
  }

  function closeMenus(nav) {
    nav.classList.remove("is-open");
    var toggle = nav.querySelector(".site-nav-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰ " + text("menu");
    }
    nav.querySelectorAll(".site-nav-item.is-open").forEach(function (item) {
      item.classList.remove("is-open");
      var btn = item.querySelector(".site-nav-chapter");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function build() {
    ensureFonts();
    var lang = language();
    var here = currentLessonPath() || "index.html";

    var nav = el("nav", "tex2jax_ignore", {
      id: "site-nav",
      "aria-label": text("label")
    });

    var bar = el("div", "site-nav-bar");
    var leftGroup = el("div", "site-nav-left");

    var toggle = el("button", "site-nav-toggle", {
      type: "button",
      "aria-expanded": "false",
      "aria-controls": "site-nav-chapters"
    });
    toggle.textContent = "☰ " + text("menu");
    leftGroup.appendChild(toggle);

    var home = el("a", "site-nav-home", { href: relativeFromPage("index.html") });
    home.textContent = text("brand");
    if (here === "index.html") {
      home.setAttribute("aria-current", "page");
    }
    leftGroup.appendChild(home);
    bar.appendChild(leftGroup);

    var rightGroup = el("div", "site-nav-right");
    var parts = here.split("/");
    var notesTopics = [
      "linear-algebra", "calculus", "real-analysis", "complex-analysis",
      "fourier-analysis", "linear-programming", "convex-analysis", "optimization",
      "graph-theory", "algorithms-datastructures", "cryptography", "blockchain",
      "mechanics", "machine-learning"
    ];
    if (parts.length > 1 && notesTopics.indexOf(parts[0]) !== -1) {
      var notesLink = el("a", "site-nav-action", {
        href: "https://github.com/nglelinh/interactive_math/blob/main/notes/" + parts[0] + ".md",
        target: "_blank",
        rel: "noopener noreferrer"
      });
      notesLink.textContent = text("notes");
      rightGroup.appendChild(notesLink);
    }

    var ghLink = el("a", "site-nav-action", {
      href: "https://github.com/nglelinh/interactive_math",
      target: "_blank",
      rel: "noopener noreferrer"
    });
    ghLink.textContent = text("github");
    rightGroup.appendChild(ghLink);
    bar.appendChild(rightGroup);

    var chapters = el("ul", "site-nav-chapters", { id: "site-nav-chapters" });
    data.chapters.forEach(function (chapter) {
      var item = el("li", "site-nav-item");
      var button = el("button", "site-nav-chapter", {
        type: "button",
        "aria-expanded": "false"
      });
      var label = chapter.label && chapter.label[lang] ? chapter.label[lang] : chapter.id;
      button.appendChild(document.createTextNode(label));
      var count = el("span", "site-nav-count");
      count.textContent = String(chapter.lessons.length);
      button.appendChild(count);

      var sub = el("ul", "site-nav-sub");
      var chapterActive = false;
      chapter.lessons.forEach(function (lesson) {
        var li = el("li");
        var link = el("a", "site-nav-lesson", { href: relativeFromPage(lesson.href) });
        link.textContent = lesson.label;
        if (here === lesson.href) {
          link.classList.add("is-current");
          link.setAttribute("aria-current", "page");
          chapterActive = true;
        }
        li.appendChild(link);
        sub.appendChild(li);
      });

      if (chapterActive) {
        item.classList.add("is-current");
      }

      button.addEventListener("click", function (event) {
        event.stopPropagation();
        var open = item.classList.contains("is-open");
        nav.querySelectorAll(".site-nav-item.is-open").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            var b = other.querySelector(".site-nav-chapter");
            if (b) b.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", !open);
        button.setAttribute("aria-expanded", open ? "false" : "true");
      });

      item.appendChild(button);
      item.appendChild(sub);
      chapters.appendChild(item);
    });

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = (open ? "✕ " + text("close") : "☰ " + text("menu"));
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target)) {
        closeMenus(nav);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenus(nav);
      }
    });

    nav.appendChild(bar);
    nav.appendChild(chapters);
    document.body.insertBefore(nav, document.body.firstChild);
  }

  var style = document.createElement("style");
  style.textContent = [
    "#site-nav{position:sticky;top:0;z-index:2000;font-family:'Source Sans 3',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.4;background:#202020;color:rgba(255,255,255,0.85);border-bottom:1px solid rgba(255,255,255,0.12);}",
    "#site-nav *{box-sizing:border-box;}",
    "#site-nav .site-nav-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 18px;max-width:1400px;margin:0 auto;}",
    "#site-nav .site-nav-left,#site-nav .site-nav-right{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}",
    "#site-nav .site-nav-home{color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;letter-spacing:-0.01em;padding:4px 8px;border-radius:4px;}",
    "#site-nav .site-nav-home:hover,#site-nav .site-nav-home[aria-current='page']{background:rgba(255,255,255,0.12);}",
    "#site-nav .site-nav-action{color:rgba(255,255,255,0.82);text-decoration:none;font-size:13px;font-weight:500;padding:5px 10px;border:1px solid rgba(255,255,255,0.2);border-radius:4px;white-space:nowrap;}",
    "#site-nav .site-nav-action:hover{background:rgba(255,255,255,0.1);color:#ffffff;border-color:rgba(255,255,255,0.4);}",
    "#site-nav .site-nav-toggle{background:rgba(255,255,255,0.08);color:#ffffff;border:1px solid rgba(255,255,255,0.22);border-radius:4px;padding:5px 11px;font:inherit;font-weight:600;cursor:pointer;}",
    "#site-nav .site-nav-toggle:hover{background:rgba(255,255,255,0.16);}",
    "#site-nav .site-nav-chapters{display:none;list-style:none;margin:0;padding:0 18px 10px;max-width:1400px;margin:0 auto;border-top:1px solid rgba(255,255,255,0.08);}",
    "#site-nav.is-open .site-nav-chapters{display:block;max-height:72vh;overflow:auto;background:#202020;}",
    "#site-nav .site-nav-item{margin:2px 0;}",
    "#site-nav .site-nav-chapter{display:flex;align-items:center;justify-content:space-between;gap:6px;width:100%;background:transparent;color:rgba(255,255,255,0.78);border:none;border-radius:4px;padding:6px 10px;font:inherit;font-size:13px;font-weight:600;text-align:left;cursor:pointer;}",
    "#site-nav .site-nav-chapter:hover,#site-nav .site-nav-item.is-current>.site-nav-chapter,#site-nav .site-nav-item.is-open>.site-nav-chapter{background:rgba(255,255,255,0.12);color:#ffffff;}",
    "#site-nav .site-nav-count{font-size:11px;opacity:.7;margin-left:3px;}",
    "#site-nav .site-nav-sub{display:none;list-style:none;margin:4px 0 0;padding:4px 0 4px 12px;}",
    "#site-nav .site-nav-item.is-open>.site-nav-sub{display:block;}",
    "#site-nav .site-nav-lesson{display:block;padding:6px 12px;color:rgba(255,255,255,0.76);text-decoration:none;font-size:13px;border-radius:4px;}",
    "#site-nav .site-nav-lesson:hover{background:rgba(255,255,255,0.09);color:#ffffff;}",
    "#site-nav .site-nav-lesson.is-current{background:#2c5282;color:#ffffff;font-weight:600;}",
    "@media (min-width:960px){",
    "#site-nav .site-nav-toggle{display:none;}",
    "#site-nav .site-nav-chapters{display:flex;flex-wrap:wrap;gap:2px;align-items:center;padding:4px 14px 8px;}",
    "#site-nav .site-nav-item{position:relative;}",
    "#site-nav .site-nav-chapter{width:auto;white-space:nowrap;padding:5px 9px;}",
    "#site-nav .site-nav-sub{display:none;position:absolute;top:100%;left:0;z-index:20;min-width:250px;max-width:min(22rem,80vw);max-height:min(70vh,28rem);overflow:auto;background:#202020;border:1px solid rgba(255,255,255,0.16);border-radius:6px;padding:6px;box-shadow:0 12px 32px rgba(0,0,0,0.45);}",
    "#site-nav .site-nav-item.is-open>.site-nav-sub,#site-nav .site-nav-item:focus-within>.site-nav-sub{display:block;}",
    "}"
,
    "input[type=range]{accent-color:#667eea;cursor:pointer;}",".canvas-container canvas{max-width:100%!important;height:auto!important;border-radius:10px;}","@media (min-width:900px){.interactive-container:has(>.controls),.interactive-container:has(>.controls-panel),.main-content:has(>.canvas-container):has(>.controls),.main-content:has(>.canvas-container):has(>.controls-panel),.container:has(>.canvas-container):has(>.controls),.workspace:has(>.canvas-container):has(>.controls){display:flex!important;flex-wrap:nowrap!important;align-items:flex-start!important;gap:24px;}.canvas-container{flex:1 1 0!important;min-width:0!important;}.interactive-container>.controls,.interactive-container>.controls-panel,.main-content>.controls,.main-content>.controls-panel,.container>.controls,.workspace>.controls{flex:0 0 360px!important;max-width:380px;border-radius:10px;}}"
  ].join("");
  document.head.appendChild(style);

  if (document.body) {
    build();
  } else {
    document.addEventListener("DOMContentLoaded", build);
  }

  /* Touch-to-Mouse Bridge for Canvas */
  (function initCanvasTouchBridge() {
    if (!("ontouchstart" in window)) return;
    var canvases = document.querySelectorAll("canvas");
    canvases.forEach(function (canvas) {
      if (canvas.dataset.touchBridged) return;
      canvas.dataset.touchBridged = "1";
      if (!canvas.style.touchAction) {
        canvas.style.touchAction = "none";
      }
      function dispatchMouse(type, touch) {
        var evt = new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          clientX: touch.clientX,
          clientY: touch.clientY,
          screenX: touch.screenX,
          screenY: touch.screenY,
          button: 0
        });
        canvas.dispatchEvent(evt);
      }
      canvas.addEventListener("touchstart", function (e) {
        if (e.touches.length === 1) {
          dispatchMouse("mousedown", e.touches[0]);
        }
      }, { passive: true });
      canvas.addEventListener("touchmove", function (e) {
        if (e.touches.length === 1) {
          e.preventDefault();
          dispatchMouse("mousemove", e.touches[0]);
        }
      }, { passive: false });
      canvas.addEventListener("touchend", function (e) {
        var t = (e.changedTouches && e.changedTouches[0]) || null;
        if (t) dispatchMouse("mouseup", t);
      }, { passive: true });
    });
  })();
})();
