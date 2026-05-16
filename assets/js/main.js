(function () {
  if (window.__ehInitDone) {
    return;
  }
  window.__ehInitDone = true;

  const routes = {
    home: "index.html",
    learn: "learn/index.html",
    categories: "categories/index.html",
    career: "career/index.html",
    about: "about/index.html",
    contact: "contact/index.html",
    legalPrivacy: "legal/privacy-policy/index.html",
    legalDisclaimer: "legal/disclaimer/index.html",
    legalTerms: "legal/terms-conditions/index.html",
    legalCookie: "legal/cookie-policy/index.html",
    catInside: "categories/inside-the-device/index.html",
    catCuriosity: "categories/curiosity-lab/index.html",
    catBuild: "categories/build-it-yourself/index.html",
    catFix: "categories/fix-troubleshoot/index.html",
    blogElectricityCore: "blog/roadmap-topics/electricity-fundamentals/electricity-fundamentals-core-concept-deep-dive.html",
    topicElectricity: "learn/electricity-fundamentals/index.html",
    topicComponents: "learn/basic-components/index.html",
    topicSemiconductor: "learn/semiconductor/index.html",
    topicTransistors: "learn/transistors/index.html",
    topicAnalog: "learn/analog-circuit/index.html",
    topicDigital: "learn/digital-logic/index.html",
    topicMCU: "learn/microprocessors-microcontrollers/index.html",
    topicSignal: "learn/signal-fundamentals/index.html",
    topicComm: "learn/communication-systems/index.html",
    topicAutomation: "learn/automation-control/index.html",
    topicModern: "learn/modern-electronics/index.html",
    topicAdvanced: "learn/advanced-electronics/index.html"
  };

  const body = document.body;
  const depth = Number(body.dataset.depth || 0);
  const prefix = depth > 0 ? "../".repeat(depth) : "";

  function wireRoutes() {
    document.querySelectorAll("a[data-route]").forEach((link) => {
      const key = link.dataset.route;
      if (!routes[key]) {
        return;
      }
      const suffix = link.dataset.suffix || "";
      link.setAttribute("href", `${prefix}${routes[key]}${suffix}`);
    });
  }

  function setActiveNav() {
    const page = body.dataset.page;
    if (!page) {
      return;
    }
    document.querySelectorAll("[data-nav]").forEach((item) => {
      if (item.dataset.nav === page) {
        item.classList.add("active");
      }
    });
  }

  function initTheme() {
    const key = "eh-theme";
    const saved = localStorage.getItem(key);
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && preferDark)) {
      body.classList.add("theme-dark");
    }

    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) {
      return;
    }

    function setLabel() {
      toggle.textContent = body.classList.contains("theme-dark") ? "Light" : "Dark";
    }

    setLabel();
    toggle.addEventListener("click", () => {
      body.classList.toggle("theme-dark");
      localStorage.setItem(key, body.classList.contains("theme-dark") ? "dark" : "light");
      setLabel();
    });
  }

  function initMobileNav() {
    const menu = document.querySelector("[data-menu]");
    const toggle = document.querySelector("[data-nav-toggle]");
    if (!menu || !toggle) {
      return;
    }

    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    document.querySelectorAll(".dropdown .drop-toggle").forEach((button) => {
      button.addEventListener("click", (event) => {
        if (window.innerWidth > 980) {
          return;
        }
        event.preventDefault();
        event.currentTarget.parentElement.classList.toggle("open");
      });
    });
  }

  function initProgress() {
    const bar = document.querySelector("[data-reading-progress]");
    if (!bar) {
      return;
    }

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const value = total <= 0 ? 0 : (window.scrollY / total) * 100;
      bar.style.width = `${Math.min(100, Math.max(0, value))}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initBackToTop() {
    const button = document.querySelector("[data-to-top]");
    if (!button) {
      return;
    }

    const onScroll = () => {
      button.classList.toggle("visible", window.scrollY > 560);
    };

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    if (!revealElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealElements.forEach((item) => observer.observe(item));
  }

  function initCardFilters() {
    const groups = document.querySelectorAll("[data-filter-group]");
    if (!groups.length) {
      return;
    }

    groups.forEach((group) => {
      const targetId = group.dataset.filterGroup;
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      const search = group.querySelector("[data-search]");
      const select = group.querySelector("[data-filter]");
      const cards = Array.from(target.querySelectorAll(".filter-card"));

      function runFilter() {
        const query = (search?.value || "").trim().toLowerCase();
        const tag = (select?.value || "all").trim().toLowerCase();

        cards.forEach((card) => {
          const blob = `${card.dataset.title || ""} ${card.dataset.tags || ""} ${card.textContent || ""}`.toLowerCase();
          const queryHit = !query || blob.includes(query);
          const tagHit = tag === "all" || (card.dataset.tags || "").toLowerCase().includes(tag);
          card.classList.toggle("hidden", !(queryHit && tagHit));
        });
      }

      search?.addEventListener("input", runFilter);
      select?.addEventListener("change", runFilter);

      const urlQuery = new URLSearchParams(window.location.search).get("q");
      if (urlQuery && search) {
        search.value = urlQuery;
      }

      runFilter();
    });
  }

  function initNewsletter() {
    document.querySelectorAll(".newsletter-form").forEach((form) => {
      const note = form.parentElement.querySelector("[data-newsletter-note]");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (note) {
          note.textContent = "Thanks for subscribing. New electronics guides are on the way.";
        }
        form.reset();
      });
    });
  }

  function initShare() {
    document.querySelectorAll("[data-share]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const kind = btn.dataset.share;
        const url = window.location.href;
        const title = document.title;

        if (kind === "copy") {
          try {
            await navigator.clipboard.writeText(url);
            btn.textContent = "Copied";
            setTimeout(() => {
              btn.textContent = "Copy Link";
            }, 1200);
          } catch (_error) {
            btn.textContent = "Cannot Copy";
          }
          return;
        }

        const targets = {
          x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };

        if (targets[kind]) {
          window.open(targets[kind], "_blank", "noopener,noreferrer,width=600,height=500");
        }
      });
    });
  }

  function initGlobalSearch() {
    const form = document.querySelector("[data-site-search]");
    if (!form) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      const q = input?.value.trim();
      if (!q) {
        return;
      }
      window.location.href = `${prefix}${routes.categories}?q=${encodeURIComponent(q)}`;
    });
  }

  function setYear() {
    document.querySelectorAll("[data-year]").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  }

  wireRoutes();
  setActiveNav();
  initTheme();
  initMobileNav();
  initProgress();
  initBackToTop();
  initReveal();
  initCardFilters();
  initNewsletter();
  initShare();
  initGlobalSearch();
  setYear();
})();
