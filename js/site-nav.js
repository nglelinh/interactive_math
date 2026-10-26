/* Shared course navigation. Lesson data is generated into js/site-nav-data.js. */
(function () {
  "use strict";

  var data = window.SITE_NAV_DATA;
  if (!data || !data.chapters) {
    return;
  }

  var STRINGS = {
    vi: {
      home: "Trang chủ",
      menu: "Mục lục",
      close: "Đóng mục lục",
      label: "Mục lục bài học"
    },
    en: {
      home: "Home",
      menu: "Menu",
      close: "Close menu",
      label: "Lesson menu"
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
    var i = 0;
    while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
      i += 1;
    }
    var up = fromParts.length - i;
    var rel = [];
    var n;
    for (n = 0; n < up; n += 1) {
      rel.push("..");
    }
    rel = rel.concat(toParts.slice(i));
    var href = rel.join("/");
    if (dest.search) {
      href += dest.search;
    }
    if (dest.hash) {
      href += dest.hash;
    }
    return href || ".";
  }

  function currentLessonPath() {
    var rootPath = siteRoot().pathname;
    var path = window.location.pathname;
    if (path.indexOf(rootPath) === 0) {
      path = path.slice(rootPath.length);
    }
    return path.replace(/^\/+/, "");
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

  function build() {
    var lang = language();
    var here = currentLessonPath();
    if (here === "") {
      here = "index.html";
    }

    var nav = el("nav", "tex2jax_ignore", {
      id: "site-nav",
      "aria-label": text("label")
    });

    var bar = el("div", "site-nav-bar");
    var home = el("a", "site-nav-home", { href: relativeFromPage("index.html") });
    home.textContent = text("home");
    if (here === "index.html") {
      home.setAttribute("aria-current", "page");
    }

    var toggle = el("button", "site-nav-toggle", {
      type: "button",
      "aria-expanded": "false",
      "aria-controls": "site-nav-chapters"
    });
    toggle.textContent = text("menu");

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
          link.setAttribute("aria-current", "page");
          link.classList.add("is-current");
          chapterActive = true;
        }
        li.appendChild(link);
        sub.appendChild(li);
      });
      if (chapterActive) {
        item.classList.add("is-current-chapter");
      }
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        var open = item.classList.toggle("is-open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
        placeSubmenu(item, sub);
      });
      item.appendChild(button);
      item.appendChild(sub);
      chapters.appendChild(item);
    });

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? text("close") : text("menu");
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target)) {
        closeAll(nav, toggle);
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeAll(nav, toggle);
      }
    });
    chapters.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (link) {
        closeAll(nav, toggle);
      }
    });
    window.addEventListener("resize", function () {
      reserveSpace(nav);
    });
    if (window.ResizeObserver) {
      var observer = new ResizeObserver(function () {
        reserveSpace(nav);
      });
      observer.observe(nav);
    }

    bar.appendChild(home);
    bar.appendChild(toggle);
    nav.appendChild(bar);
    nav.appendChild(chapters);
    document.body.insertBefore(nav, document.body.firstChild);
    reserveSpace(nav);
  }

  function placeSubmenu(item, sub) {
    sub.style.left = "0";
    sub.style.right = "auto";
    var rect = sub.getBoundingClientRect();
    if (rect.right > window.innerWidth - 8) {
      sub.style.left = "auto";
      sub.style.right = "0";
    }
  }

  function closeAll(nav, toggle) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = text("menu");
    nav.querySelectorAll(".site-nav-item.is-open").forEach(function (item) {
      item.classList.remove("is-open");
      var button = item.querySelector(".site-nav-chapter");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function reserveSpace(nav) {
    var height = nav.offsetHeight;
    if (!document.body.dataset.siteNavBasePad) {
      document.body.dataset.siteNavBasePad = String(parseFloat(getComputedStyle(document.body).paddingTop) || 0);
    }
    var base = parseFloat(document.body.dataset.siteNavBasePad) || 0;
    document.body.style.paddingTop = base + height + "px";
  }

  var style = document.createElement("style");
  style.setAttribute("data-site-nav", "css");
  style.textContent = [
    "#site-nav{position:fixed;top:0;left:0;right:0;z-index:100000;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#fff;}",
    "#site-nav.tex2jax_ignore{line-height:1.4;}",
    "#site-nav .site-nav-bar{display:flex;align-items:center;gap:8px;min-height:52px;padding:8px 12px;background:rgba(10,16,36,.94);border-bottom:1px solid rgba(79,195,247,.35);backdrop-filter:blur(10px);}",
    "#site-nav .site-nav-home{color:#4fc3f7;font-weight:700;text-decoration:none;padding:8px 10px;border-radius:8px;white-space:nowrap;}",
    "#site-nav .site-nav-home:hover,#site-nav .site-nav-home:focus{background:rgba(79,195,247,.15);}",
    "#site-nav .site-nav-home[aria-current='page']{box-shadow:inset 0 -2px 0 #4fc3f7;}",
    "#site-nav .site-nav-toggle{margin-left:auto;background:rgba(79,195,247,.18);color:#fff;border:1px solid rgba(79,195,247,.55);border-radius:8px;padding:8px 12px;font:inherit;cursor:pointer;}",
    "#site-nav .site-nav-chapters{display:none;}",
    "#site-nav .site-nav-chapter,#site-nav .site-nav-lesson{font:inherit;}",
    "#site-nav .site-nav-chapter{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;text-align:left;background:transparent;color:#fff;border:0;border-radius:8px;padding:10px 12px;cursor:pointer;}",
    "#site-nav .site-nav-chapter:hover,#site-nav .site-nav-chapter:focus,#site-nav .site-nav-item.is-open>.site-nav-chapter,#site-nav .site-nav-item.is-current-chapter>.site-nav-chapter{background:rgba(79,195,247,.18);}",
    "#site-nav .site-nav-count{min-width:1.5rem;padding:0 6px;border-radius:999px;background:rgba(255,255,255,.12);color:#9cdcfe;font-size:.75rem;text-align:center;}",
    "#site-nav .site-nav-sub{list-style:none;margin:0;padding:4px;}",
    "#site-nav .site-nav-lesson{display:block;color:#fff;text-decoration:none;padding:8px 10px;border-radius:8px;}",
    "#site-nav .site-nav-lesson:hover,#site-nav .site-nav-lesson:focus{background:rgba(255,255,255,.1);}",
    "#site-nav .site-nav-lesson.is-current{background:rgba(79,195,247,.28);color:#fff;}",
    "@media (max-width:959px){",
    "#site-nav.is-open .site-nav-chapters{display:block;position:absolute;top:100%;left:0;right:0;max-height:calc(100vh - 56px);overflow:auto;background:rgba(10,16,36,.98);border-bottom:1px solid rgba(79,195,247,.35);padding:8px;}",
    "#site-nav .site-nav-sub{display:none;padding-left:8px;}",
    "#site-nav .site-nav-item.is-open>.site-nav-sub{display:block;}",
    "}",
    "@media (min-width:960px){",
    "#site-nav .site-nav-toggle{display:none;}",
    "#site-nav .site-nav-bar{flex-wrap:wrap;}",
    "#site-nav .site-nav-chapters{display:flex;flex-wrap:wrap;gap:2px;align-items:center;list-style:none;margin:0;padding:0 8px 8px;background:rgba(10,16,36,.94);}",
    "#site-nav .site-nav-item{position:relative;}",
    "#site-nav .site-nav-chapter{width:auto;white-space:nowrap;padding:6px 8px;}",
    "#site-nav .site-nav-sub{display:none;position:absolute;top:100%;left:0;z-index:2;min-width:240px;max-width:min(22rem,80vw);max-height:min(70vh,28rem);overflow:auto;background:rgba(10,16,36,.98);border:1px solid rgba(79,195,247,.4);border-radius:10px;box-shadow:0 12px 32px rgba(0,0,0,.35);}",
    "#site-nav .site-nav-item.is-open>.site-nav-sub,#site-nav .site-nav-item:focus-within>.site-nav-sub{display:block;}",
    "}"
  ].join("");
  document.head.appendChild(style);

  if (document.body) {
    build();
  } else {
    document.addEventListener("DOMContentLoaded", build);
  }
})();
