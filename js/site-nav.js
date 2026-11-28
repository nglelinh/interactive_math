/* Shared course navigation & Wired Manual Layout (Left Collapsible Rail + Warm Blueprint Theme). */
(function () {
  "use strict";

  var data = window.SITE_NAV_DATA;
  if (!data || !data.chapters) {
    return;
  }

  var STRINGS = {
    vi: {
      brand: "Toán học Tương tác",
      menu: "Mục lục",
      close: "Đóng mục lục",
      label: "Mục lục bài học",
      notes: "Ghi chú nghiên cứu",
      github: "GitHub"
    },
    en: {
      brand: "Interactive Math",
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
    if (className) node.className = className;
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        node.setAttribute(key, attrs[key]);
      });
    }
    return node;
  }

  function ensureAssets() {
    if (!document.querySelector("link[data-wired-fonts]")) {
      var fonts = document.createElement("link");
      fonts.rel = "stylesheet";
      fonts.setAttribute("data-wired-fonts", "1");
      fonts.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Semi+Condensed:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
      document.head.appendChild(fonts);
    }
    if (!document.querySelector("link[data-wired-theme]")) {
      var theme = document.createElement("link");
      theme.rel = "stylesheet";
      theme.setAttribute("data-wired-theme", "1");
      theme.href = relativeFromPage("css/wired-theme.css");
      document.head.appendChild(theme);
    }
  }

  function build() {
    ensureAssets();
    document.body.classList.add("wired-has-sidebar");

    var lang = language();
    var here = currentLessonPath() || "index.html";

    var nav = el("nav", "tex2jax_ignore", {
      id: "site-nav",
      "aria-label": text("label")
    });

    var header = el("div", "wired-side-header");
    var toggle = el("button", "wired-toggle", {
      type: "button",
      "aria-expanded": "true",
      "aria-label": text("menu")
    });
    toggle.textContent = "☰";

    var brand = el("a", "wired-brand", { href: relativeFromPage("index.html") });
    brand.textContent = text("brand");
    header.appendChild(toggle);
    header.appendChild(brand);

    var chapters = el("ul", "wired-chapters", { id: "site-nav-chapters" });
    data.chapters.forEach(function (chapter) {
      var item = el("li", "wired-item");
      var button = el("button", "wired-chapter-btn", {
        type: "button",
        "aria-expanded": "false"
      });
      var label = chapter.label && chapter.label[lang] ? chapter.label[lang] : chapter.id;
      button.appendChild(document.createTextNode(label));
      var count = el("span", "wired-count");
      count.textContent = String(chapter.lessons.length);
      button.appendChild(count);

      var sub = el("ul", "wired-sub");
      var chapterActive = false;
      chapter.lessons.forEach(function (lesson) {
        var li = el("li");
        var link = el("a", "wired-lesson", { href: relativeFromPage(lesson.href) });
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
        item.classList.add("is-current", "is-open");
        button.setAttribute("aria-expanded", "true");
      }

      button.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
      });

      item.appendChild(button);
      item.appendChild(sub);
      chapters.appendChild(item);
    });

    var footer = el("div", "wired-side-footer");
    var parts = here.split("/");
    var notesTopics = [
      "linear-algebra", "calculus", "real-analysis", "complex-analysis",
      "fourier-analysis", "linear-programming", "convex-analysis", "optimization",
      "graph-theory", "algorithms-datastructures", "cryptography", "blockchain",
      "mechanics", "machine-learning"
    ];
    if (parts.length > 1 && notesTopics.indexOf(parts[0]) !== -1) {
      var notesLink = el("a", "wired-foot-link", {
        href: "https://github.com/nglelinh/interactive_math/blob/main/notes/" + parts[0] + ".md",
        target: "_blank",
        rel: "noopener noreferrer"
      });
      notesLink.textContent = text("notes");
      footer.appendChild(notesLink);
    }

    var ghLink = el("a", "wired-foot-link", {
      href: "https://github.com/nglelinh/interactive_math",
      target: "_blank",
      rel: "noopener noreferrer"
    });
    ghLink.textContent = text("github");
    footer.appendChild(ghLink);

    toggle.addEventListener("click", function () {
      if (window.innerWidth >= 1180) {
        var collapsed = document.body.classList.toggle("wired-sidebar-collapsed");
        toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
        setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 240);
      } else {
        var open = nav.classList.toggle("is-mobile-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.textContent = open ? "✕" : "☰";
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-mobile-open")) {
        nav.classList.remove("is-mobile-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      }
    });

    nav.appendChild(header);
    nav.appendChild(chapters);
    nav.appendChild(footer);
    document.body.insertBefore(nav, document.body.firstChild);
    normalizeControlPanels();
  }

  if (document.body) {
    build();
  } else {
    document.addEventListener("DOMContentLoaded", build);
  }


  /* Ensure control panels ALWAYS dock on the right without overlapping content */
  function normalizeControlPanels() {
    var panels = document.querySelectorAll(".container > .controls, .main-container > .controls, .container > .controls-panel, .main-container > .controls-panel");
    panels.forEach(function (panel) {
      if (panel.closest(".wired-stage-split") || panel.closest("#site-nav")) return;
      var parent = panel.parentElement;
      if (!parent) return;
      var stageSelectors = ".matrix-container, .matrices-container, .result-matrix, .canvas-container, .visualization, .visualization-area, .plot-container, .chart-container, .graph-container, .demo-area";
      var siblings = [];
      var sib = panel.nextElementSibling;
      while (sib) {
        if (sib.matches(stageSelectors) || sib.querySelector("canvas, svg, .js-plotly-plot, .matrix-grid")) {
          siblings.push(sib);
          sib = sib.nextElementSibling;
        } else {
          break;
        }
      }
      if (siblings.length === 0) return;
      var split = document.createElement("div");
      split.className = "wired-stage-split";
      var main = document.createElement("div");
      main.className = "wired-stage-main";
      parent.insertBefore(split, panel);
      siblings.forEach(function (node) { main.appendChild(node); });
      panel.classList.add("wired-right-panel");
      split.appendChild(main);
      split.appendChild(panel);
    });
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
        if (e.touches.length === 1) dispatchMouse("mousedown", e.touches[0]);
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
