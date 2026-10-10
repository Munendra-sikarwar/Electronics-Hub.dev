(function () {
  "use strict";

  const data = window.EH_DATA;
  const page = document.body.dataset.page || "home";
  const main = document.getElementById("main-content");
  const allLessons = data.levels.flatMap((level) => level.lessons.map((lesson, index) => ({
    id: lesson[0], title: lesson[1], time: lesson[2], level: level.id, levelTitle: level.title,index: index, difficulty: level.difficulty
  })));
  const storageKey = "electronicsHub.progress.v1";
  const defaultState = { completed: [], lastLesson: "voltage-current-resistance", activityDates: [], quizWins: [], toolsUsed: [] };

  function loadState() {
    try {
      return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
    } catch (_) {
      return { ...defaultState };
    }
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function localDate(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function recordActivity() {
    const today = localDate();
    if (!state.activityDates.includes(today)) {
      state.activityDates.push(today);
      state.activityDates = state.activityDates.slice(-60);
      saveState();
    }
  }

  function getStreak() {
    const dates = new Set(state.activityDates);
    let cursor = new Date();
    if (!dates.has(localDate(cursor))) cursor.setDate(cursor.getDate() - 1);
    let streak = 0;
    while (dates.has(localDate(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function progressPercent() {
    const knownCompleted = state.completed.filter((id) => allLessons.some((lesson) => lesson.id === id)).length;
    return Math.min(100, Math.round((knownCompleted / allLessons.length) * 100) || 0);
  }

  function levelProgress(level) {
    const completed = level.lessons.filter((lesson) => state.completed.includes(lesson[0])).length;
    return Math.round((completed / level.lessons.length) * 100) || 0;
  }

  function currentLevel() {
    return data.levels.find((level) => levelProgress(level) < 100) || data.levels[data.levels.length - 1];
  }

  function lastLesson() {
    return allLessons.find((lesson) => lesson.id === state.lastLesson) || allLessons[0];
  }

  function achievements() {
    return [
      { name: "First Signal", unlocked: state.completed.length >= 1 },
      { name: "Circuit Builder", unlocked: state.completed.length >= 5 },
      { name: "Quiz Ready", unlocked: state.quizWins.length >= 1 },
      { name: "Tool User", unlocked: state.toolsUsed.length >= 1 },
      { name: "Three Day Streak", unlocked: getStreak() >= 3 },
      { name: "Level Complete", unlocked: data.levels.some((level) => levelProgress(level) === 100) }
    ];
  }

  function initialTheme() {
    const saved = localStorage.getItem("electronicsHub.theme");
    if (saved === "dark" || saved === "light") return saved;
    return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function setTheme(theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    if (persist) localStorage.setItem("electronicsHub.theme", theme);
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.name = "theme-color";
      document.head.appendChild(themeColor);
    }
    themeColor.content = theme === "light" ? "#eef6f9" : "#17191c";
    const button = document.getElementById("theme-toggle");
    if (!button) return;
    const next = theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", `Switch to ${next} mode`);
    button.setAttribute("aria-pressed", String(theme === "light"));
    button.title = `Switch to ${next} mode`;
    const label = button.querySelector(".theme-label");
    if (label) label.textContent = theme === "dark" ? "Light" : "Dark";
  }

  const navItems = [
    ["learn", "Start Learning", "learn.html"],
    ["projects", "Projects", "projects.html"],
    ["workshop", "Workshop", "workshop.html"],
    ["tools", "Tools", "tools.html"],
    ["student", "Student Zone", "student-zone.html"],
    ["blog", "Blog", "blog.html"]
  ];

  function navLinks() {
    return navItems.map(([id, label, href]) => `<a class="nav-link ${page === id ? "active" : ""}" href="${href}">${label}</a>`).join("");
  }

  function renderShell() {
    document.body.insertAdjacentHTML("afterbegin", `
      <a class="skip-link" href="#main-content">Skip to content</a>
      <header class="site-header" id="site-header">
        <div class="container nav-shell">
          <a class="brand" href="index.html" aria-label="Electronics Hub home"><span class="brand-mark"><img src="assets/images/logo.svg" alt="" width="25" height="25" loading="eager"></span><span>Electronics Hub</span></a>
          <nav class="desktop-nav" aria-label="Main navigation">${navLinks()}</nav>
          <div class="nav-actions">
            <button class="icon-button theme-toggle" id="theme-toggle" aria-label="Switch theme"><span class="theme-glyph" aria-hidden="true"></span><span class="theme-label">Light</span></button>
            <button class="icon-button" id="search-open" aria-label="Open site search"><span class="search-symbol" aria-hidden="true"></span></button>
            <a class="button button-primary button-small" href="learn.html">Learn</a>
            <button class="menu-button" id="menu-button" aria-expanded="false" aria-controls="mobile-panel" aria-label="Toggle navigation"><span class="menu-bars" aria-hidden="true"></span></button>
          </div>
        </div>
        <nav class="mobile-panel" id="mobile-panel" aria-label="Mobile navigation">${navLinks()}<a class="nav-link" href="about.html">About</a><a class="nav-link" href="contact.html">Contact</a></nav>
      </header>
    `);

    document.body.insertAdjacentHTML("beforeend", `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark"><img src="assets/images/logo.svg" alt="" width="25" height="25" loading="lazy"></span><span>Electronics Hub</span></a><p class="muted">A free, structured path from first circuit to embedded system.</p></div>
          <div class="footer-links"><h3>Learn</h3><a href="learn.html">Learning roadmap</a><a href="projects.html">Projects</a><a href="tools.html">Calculators</a><a href="workshop.html">Workshop</a></div>
          <div class="footer-links"><h3>Explore</h3><a href="student-zone.html">Student zone</a><a href="blog.html">Articles</a><a href="about.html">About</a><a href="contact.html">Contact</a></div>
          <div class="footer-links"><h3>Legal</h3><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="disclaimer.html">Disclaimer</a><a href="cookies.html">Cookies</a><a href="copyright.html">Copyright</a><a href="sitemap.html">Sitemap</a></div>
        </div>
        <div class="container footer-bottom">© ${new Date().getFullYear()} Electronics Hub. Educational content for curious builders.</div>
      </footer>
      <div class="search-modal" id="search-modal" role="dialog" aria-modal="true" aria-label="Search Electronics Hub">
        <div class="search-dialog"><div class="search-head"><input class="search-input" id="global-search" type="search" placeholder="Search lessons, projects, and articles" aria-label="Search"><button class="icon-button" id="search-close" aria-label="Close search">×</button></div><div class="search-results" id="search-results"></div></div>
      </div>
      <div class="cookie-banner" id="cookie-banner"><strong>Small, useful storage only.</strong><p class="muted">Electronics Hub uses LocalStorage for learning progress, streaks, achievements, and this preference. No tracking account is created.</p><div class="cluster"><button class="button button-primary button-small" id="cookie-accept">Allow progress storage</button><a class="button button-small" href="cookies.html">Learn more</a></div></div>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>
    `);
  }

  function dashboardMarkup() {
    const level = currentLevel();
    const lesson = lastLesson();
    const unlocked = achievements().filter((badge) => badge.unlocked).length;
    return `
      <div class="dashboard-grid">
        <div class="card dashboard-stat"><span class="stat-label">Current level</span><div><div class="stat-value">Level ${level.id}</div><p class="muted">${level.title}</p></div></div>
        <div class="card dashboard-stat"><span class="stat-label">Completed lessons</span><div><div class="stat-value">${state.completed.length}</div><p class="muted">of ${allLessons.length} available lessons</p></div></div>
        <div class="card dashboard-stat"><span class="stat-label">Total progress</span><div><div class="stat-value">${progressPercent()}%</div><div class="meter"><span style="width:${progressPercent()}%"></span></div></div></div>
        <div class="card dashboard-stat"><span class="stat-label">Learning streak</span><div><div class="stat-value">${getStreak()} day${getStreak() === 1 ? "" : "s"}</div><p class="muted">${unlocked} achievements unlocked</p></div></div>
      </div>
      <div class="split" style="margin-top:16px">
        <a class="card" href="lesson.html?id=${lesson.id}"><span class="stat-label">Continue learning</span><h3 style="margin-top:9px">${lesson.title}</h3><p class="muted" style="margin-top:7px">Level ${lesson.level} · ${lesson.time}</p><div class="button button-primary button-small" style="margin-top:18px">Resume lesson</div></a>
        <div class="card"><span class="stat-label">Badges</span><div class="badge-list" style="margin-top:14px">${achievements().map((badge) => `<span class="badge ${badge.unlocked ? "" : "locked"}">${badge.name}</span>`).join("")}</div></div>
      </div>`;
  }

  function roadmapMini() {
    const active = currentLevel().id;
    const shortLabels = ["Discover", "Electricity", "Components", "Circuits", "Analog", "Digital", "Processors", "Controllers", "Embedded", "Workshop", "Projects"];
    return `<div class="roadmap-track">${data.levels.map((level) => `<div class="roadmap-node ${level.id < active ? "done" : ""} ${level.id === active ? "current" : ""}"><span class="node-dot">${level.id}</span><small>${shortLabels[level.id]}</small></div>`).join("")}</div>`;
  }

  function projectCard(project) {
    return `<article class="card project-card" data-difficulty="${project.difficulty}" data-tags="${project.tags.join(" ")}">
      <div class="project-top"><div><div class="eyebrow" style="margin-bottom:8px">Build project</div><h3>${project.title}</h3></div><span class="project-level ${project.difficulty}">${project.difficulty}</span></div>
      <p class="muted">${project.description}</p>
      <div class="project-meta"><div><span>Cost</span><strong>${project.cost}</strong></div><div><span>Build time</span><strong>${project.time}</strong></div><div><span>Track</span><strong>${project.tags[0]}</strong></div></div>
      <p><strong>Components:</strong> <span class="muted">${project.components}</span></p><div class="outcome"><strong>Outcome:</strong> ${project.outcome}</div>
    </article>`;
  }

  function renderHome() {
    const percent = progressPercent();
    const level = currentLevel();
    const lesson = lastLesson();
    main.innerHTML = `
      <section class="hero"><div class="container hero-grid">
        <div class="hero-copy"><div><span class="eyebrow">From first circuit to embedded systems</span><h1>Learn Electronics Level by Level</h1></div><p class="lead">Master electronics through interactive lessons, real-world examples, engineering concepts, and practical projects.</p><div class="hero-actions"><a class="button button-primary" href="learn.html">Start Learning</a><a class="button" href="projects.html">Explore Projects</a></div></div>
        <div class="panel learning-console"><div class="console-top"><div class="console-block"><span class="console-label">Current level</span><h3 class="current-level">Level ${level.id}</h3><p class="muted">${level.title}</p><div class="progress-layout"><div class="progress-ring" style="--progress:${percent * 3.6}deg"><strong>${percent}%</strong><span>complete</span></div><div style="flex:1"><div class="tiny">${state.completed.length} / ${allLessons.length} lessons</div><div class="meter" style="margin-top:7px"><span style="width:${percent}%"></span></div><div class="tiny" style="margin-top:14px">${getStreak()} day learning streak</div><div class="meter green" style="margin-top:7px"><span style="width:${Math.min(getStreak() * 14, 100)}%"></span></div></div></div></div>
        <div><div class="console-block"><span class="console-label">Continue learning</span><a class="continue-row" href="lesson.html?id=${lesson.id}"><div class="cluster"><div><div class="continue-title">${lesson.title}</div><div class="tiny">Level ${lesson.level} · ${lesson.time}</div></div><span class="resume-action">Resume</span></div></a></div><div class="console-block"><span class="console-label">Milestones</span><div class="milestones"><div class="milestone"><div class="milestone-mark">01</div><span>First lesson<br>complete</span></div><div class="milestone"><div class="milestone-mark">Q</div><span>Quiz<br>mastery</span></div><div class="milestone"><div class="milestone-mark">P</div><span>Practical<br>projects</span></div></div></div></div></div><div class="roadmap-mini"><span class="console-label">Learning roadmap</span>${roadmapMini()}</div></div>
      </div></section>
      <section class="section-tight"><div class="container metrics"><div class="metric"><strong>10</strong><span>Learning Levels</span></div><div class="metric"><strong>100+</strong><span>Lessons and explainers</span></div><div class="metric"><strong>50+</strong><span>Practical projects</span></div><div class="metric"><strong>Free Forever</strong><span>No login or paywall</span></div></div></section>
      <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">A clear path forward</span><h2>Build understanding, not just circuits.</h2><p class="lead">Every level connects intuition, engineering theory, measurement, and hands-on work.</p></div><div class="card-grid">${data.levels.slice(0, 6).map((level) => `<a class="card" href="learn.html#level-${level.id}"><div class="cluster" style="justify-content:space-between"><span class="level-number">${level.id}</span><span class="badge ${level.id === currentLevel().id ? "primary" : ""}">${level.difficulty}</span></div><h3 style="margin-top:20px">${level.title}</h3><p class="muted" style="margin-top:9px">${level.description}</p><div class="level-meta" style="margin-top:18px"><span>${level.count} lessons</span><span>${level.time}</span></div></a>`).join("")}</div><div class="cluster" style="margin-top:24px"><a class="button button-primary" href="learn.html">View all learning levels</a></div></div></section>
      <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Build while you learn</span><h2>Projects with an engineering outcome.</h2><p class="lead">Each build teaches a measurable skill, not just assembly steps.</p></div><div class="project-grid">${data.projects.slice(0, 3).map(projectCard).join("")}</div><div class="cluster" style="margin-top:24px"><a class="button" href="projects.html">Explore every project</a></div></div></section>`;
  }

  function renderLearn() {
    const selectedChapter = location.hash.replace("#level-", "");
    const openChapterId = data.levels.some((level) => String(level.id) === selectedChapter) ? Number(selectedChapter) : currentLevel().id;
    main.innerHTML = `<section class="page-hero learning-hero minimal-learning-hero"><div class="container"><h1>Start Learning</h1></div></section>
      <section class="section-tight learning-chapters minimal-learning"><div class="container"><div class="level-list minimal-level-list">${data.levels.map((level) => `<details class="level-item course-group" id="level-${level.id}" ${level.id === openChapterId ? "open" : ""}><summary class="level-summary"><h2 class="level-title">${level.title}</h2></summary><div class="lesson-list" aria-label="${level.title} topics">${level.lessons.map((lesson) => `<a class="lesson-row ${state.completed.includes(lesson[0]) ? "completed" : ""}" href="${courseStartHref(lesson[0])}"><span class="lesson-title">${lesson[1]}</span></a>`).join("")}</div></details>`).join("")}</div></div></section>`;
  }

  function renderProjects() {
    const filters = ["All", "Beginner", "Intermediate", "Advanced", "Arduino", "555 Timer", "Sensors", "Microcontrollers"];
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Hands-on engineering</span><h1>Projects That Teach</h1><p class="lead">Build useful systems while learning why each design decision matters.</p></div></section><section class="section-tight"><div class="container"><div class="filter-bar" id="project-filters">${filters.map((filter, index) => `<button class="filter-chip ${index === 0 ? "active" : ""}" data-filter="${filter}">${filter}</button>`).join("")}</div><div class="project-grid" id="project-grid">${data.projects.map(projectCard).join("")}</div></div></section>`;
    document.getElementById("project-filters").addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      document.querySelectorAll("#project-filters .filter-chip").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".project-card").forEach((card) => {
        card.hidden = filter !== "All" && card.dataset.difficulty !== filter && !card.dataset.tags.includes(filter);
      });
    });
  }

  function renderWorkshop() {
    const workshopLessons = ["multimeter-mastery", "oscilloscope-basics", "soldering-reliable-joints", "kicad-pcb-design", "ltspice-simulation", "reading-datasheets", "troubleshooting-circuits"];
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Measure. Build. Debug.</span><h1>Engineer's Workshop</h1><p class="lead">Practical guides for the instruments, software, and habits behind reliable electronics.</p></div></section><section class="section-tight"><div class="container"><div class="card-grid">${data.workshop.map((item, index) => `<article class="card"><div class="cluster" style="justify-content:space-between"><span class="level-number">${String(index + 1).padStart(2, "0")}</span><span class="tag">${item[2]}</span></div><h3 style="margin-top:20px">${item[0]}</h3><p class="muted" style="margin-top:10px">${item[1]}</p><div class="cluster" style="margin-top:20px"><a class="button button-small" href="lesson.html?id=${workshopLessons[index]}">Open guide</a></div></article>`).join("")}</div></div></section>
    <section class="section"><div class="container split"><div><span class="eyebrow">Troubleshooting loop</span><h2>Observe before you replace.</h2><p class="lead" style="margin-top:14px">A disciplined engineer defines the symptom, forms a hypothesis, measures the circuit, and changes one variable at a time.</p></div><div class="card"><div class="stack"><span class="badge primary">01 Observe</span><span class="badge primary">02 Hypothesize</span><span class="badge primary">03 Measure</span><span class="badge primary">04 Isolate</span><span class="badge primary">05 Verify</span></div></div></div></section>`;
  }

  const tools = [
    ["ohm", "Ohm's Law"], ["led", "LED Resistor"], ["divider", "Voltage Divider"], ["power", "Power"], ["binary", "Binary Converter"]
  ];

  function calculatorPanel(id, title, fields, note) {
    return `<section class="tool-panel ${id === "ohm" ? "active" : ""}" id="tool-${id}"><div class="card"><span class="eyebrow">Interactive calculator</span><h2>${title}</h2><p class="muted" style="margin-top:10px">${note}</p><form class="form-grid" id="form-${id}" style="margin-top:22px">${fields}<button class="button button-primary" type="submit">Calculate</button></form></div><div class="calculator-result"><span class="stat-label">Result</span><div class="result-value" id="result-${id}">—</div><p class="muted" id="detail-${id}">Enter values to begin.</p></div></section>`;
  }

  function field(id, label, placeholder, type = "number") {
    return `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${type === "number" ? "step=\"any\"" : ""} placeholder="${placeholder}"></div>`;
  }

  function renderTools() {
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Engineering utilities</span><h1>Tools & Calculators</h1><p class="lead">Fast, transparent calculators for everyday circuit design and number conversion.</p></div></section><section class="section-tight"><div class="container tool-layout"><div class="tool-tabs" role="tablist">${tools.map((tool, index) => `<button class="button tool-tab ${index === 0 ? "button-primary" : ""}" data-tool="${tool[0]}" role="tab">${tool[1]}</button>`).join("")}</div><div>
      ${calculatorPanel("ohm", "Ohm's Law Calculator", `${field("ohm-v", "Voltage (V)", "e.g. 12")}${field("ohm-i", "Current (A)", "e.g. 0.02")}${field("ohm-r", "Resistance (Ω)", "Leave one field empty")}`, "Enter any two values and leave the unknown field empty.")}
      ${calculatorPanel("led", "LED Resistor Calculator", `${field("led-s", "Supply voltage (V)", "5")}${field("led-f", "LED forward voltage (V)", "2")}${field("led-i", "Desired LED current (mA)", "15")}`, "Choose a series resistor that limits current safely.")}
      ${calculatorPanel("divider", "Voltage Divider Calculator", `${field("div-v", "Input voltage (V)", "12")}${field("div-r1", "R1 (Ω)", "10000")}${field("div-r2", "R2 (Ω)", "4700")}`, "Calculate the unloaded output of a two-resistor divider.")}
      ${calculatorPanel("power", "Power Calculator", `${field("power-v", "Voltage (V)", "12")}${field("power-i", "Current (A)", "0.5")}`, "Calculate electrical power from voltage and current.")}
      ${calculatorPanel("binary", "Binary Converter", `${field("binary-value", "Number", "Enter a value", "text")}<div class="field"><label for="binary-base">Input base</label><select id="binary-base"><option value="10">Decimal</option><option value="2">Binary</option><option value="8">Octal</option><option value="16">Hexadecimal</option></select></div>`, "Convert a whole number across binary, decimal, octal, and hexadecimal.")}
      </div></div></section>`;
    bindTools();
  }

  function useTool(name) {
    if (!state.toolsUsed.includes(name)) {
      state.toolsUsed.push(name);
      saveState();
      showToast("Achievement progress: Tool User");
    }
  }

  function numberValue(id) {
    const value = document.getElementById(id).value.trim();
    return value === "" ? null : Number(value);
  }

  function setResult(id, value, detail) {
    document.getElementById(`result-${id}`).textContent = value;
    document.getElementById(`detail-${id}`).textContent = detail;
    useTool(id);
  }

  function bindTools() {
    document.querySelector(".tool-tabs").addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      document.querySelectorAll(".tool-tab").forEach((tab) => tab.classList.remove("button-primary"));
      document.querySelectorAll(".tool-panel").forEach((panel) => panel.classList.remove("active"));
      button.classList.add("button-primary");
      document.getElementById(`tool-${button.dataset.tool}`).classList.add("active");
    });
    document.getElementById("form-ohm").addEventListener("submit", (event) => {
      event.preventDefault(); const v = numberValue("ohm-v"), i = numberValue("ohm-i"), r = numberValue("ohm-r");
      if (v === null && i && r) setResult("ohm", `${(i * r).toFixed(3)} V`, "V = I × R");
      else if (i === null && v !== null && r) setResult("ohm", `${(v / r).toFixed(6)} A`, "I = V ÷ R");
      else if (r === null && v !== null && i) setResult("ohm", `${(v / i).toFixed(2)} Ω`, "R = V ÷ I");
      else setResult("ohm", "Check input", "Enter exactly two valid, non-zero values.");
    });
    document.getElementById("form-led").addEventListener("submit", (event) => {
      event.preventDefault(); const supply = numberValue("led-s"), forward = numberValue("led-f"), milliamps = numberValue("led-i");
      if (supply > forward && milliamps > 0) { const resistor = (supply - forward) / (milliamps / 1000); const power = Math.pow(milliamps / 1000, 2) * resistor; setResult("led", `${Math.ceil(resistor)} Ω`, `Minimum resistor. Dissipation is about ${power.toFixed(3)} W; select a comfortable wattage margin.`); }
      else setResult("led", "Check input", "Supply voltage must exceed LED forward voltage.");
    });
    document.getElementById("form-divider").addEventListener("submit", (event) => {
      event.preventDefault(); const input = numberValue("div-v"), r1 = numberValue("div-r1"), r2 = numberValue("div-r2");
      if (input !== null && r1 > 0 && r2 > 0) setResult("divider", `${(input * r2 / (r1 + r2)).toFixed(3)} V`, `Divider current: ${(input / (r1 + r2) * 1000).toFixed(3)} mA`);
      else setResult("divider", "Check input", "Enter positive resistance values.");
    });
    document.getElementById("form-power").addEventListener("submit", (event) => {
      event.preventDefault(); const voltage = numberValue("power-v"), current = numberValue("power-i");
      if (voltage !== null && current !== null) setResult("power", `${(voltage * current).toFixed(3)} W`, `P = V × I. Equivalent resistance: ${current ? (voltage / current).toFixed(2) : "∞"} Ω`);
      else setResult("power", "Check input", "Enter voltage and current.");
    });
    document.getElementById("form-binary").addEventListener("submit", (event) => {
      event.preventDefault(); const raw = document.getElementById("binary-value").value.trim(); const base = Number(document.getElementById("binary-base").value); const value = parseInt(raw, base);
      if (Number.isInteger(value) && value >= 0) setResult("binary", value.toString(2), `Decimal ${value} · Octal ${value.toString(8)} · Hex ${value.toString(16).toUpperCase()}`);
      else setResult("binary", "Invalid", "Enter a non-negative whole number valid for the selected base.");
    });
  }

  function renderStudent() {
    const resources = [
      ["ECE Roadmap", "A semester-friendly path through circuits, signals, digital systems, and communication."],
      ["Embedded Roadmap", "A practical route from C programming to peripherals, RTOS, and connected devices."],
      ["Project Ideas", "Portfolio projects organized by skill, cost, duration, and available equipment."],
      ["Internship Preparation", "Interview topics, lab skills, resume evidence, and project storytelling."],
      ["Learning Resources", "Curated books, simulators, channels, datasheets, and practice references."]
    ];
    const link = ['learn.html'];

    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">For ECE students</span><h1>Student Zone</h1><p class="lead">Turn coursework into practical confidence, stronger projects, and internship-ready evidence.</p></div></section><section class="section-tight"><div class="container resource-grid">${resources.map((resource, index) => `<article class="card"><span class="level-number">${index + 1}</span><h3 style="margin-top:18px">${resource[0]}</h3><p class="muted" style="margin-top:9px">${resource[1]}</p><a class="button button-small" style="margin-top:18px" href="${link[0]}">Explore</a></article>`).join("")}</div></section><section class="section"><div class="container split"><div><span class="eyebrow">Internship readiness</span><h2>Show your engineering process.</h2><p class="lead" style="margin-top:14px">A strong portfolio explains the problem, constraints, circuit choices, measurements, failures, and final result.</p></div><div class="card"><div class="stack"><div><strong>1. Build</strong><p class="muted">Choose one focused system.</p></div><div><strong>2. Measure</strong><p class="muted">Capture evidence and performance.</p></div><div><strong>3. Document</strong><p class="muted">Explain trade-offs and revisions.</p></div><div><strong>4. Present</strong><p class="muted">Tell a concise engineering story.</p></div></div></div></div></section>`;
  }

  function articleCard(post) {
    return `<article class="card article-card" data-category="${post.category}" data-search="${`${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase()}"><div class="article-meta"><span class="tag">${post.category}</span><span>${post.time} read</span></div><h3><a href="article.html?id=${post.id}">${post.title}</a></h3><p class="muted">${post.excerpt}</p><div class="cluster">${post.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")}</div><a class="button button-small" href="article.html?id=${post.id}">Read article</a></article>`;
  }

  function renderBlog() {
    const categories = ["All", ...new Set(data.posts.map((post) => post.category))];
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Ideas and explanations</span><h1>Electronics Articles</h1><p class="lead">Practical explanations for circuits, tools, components, projects, and engineering careers.</p></div></section><section class="section-tight"><div class="container"><div class="search-row"><input class="search-input" id="blog-search" type="search" placeholder="Search articles, topics, and tags" aria-label="Search articles"><div class="filter-bar" id="blog-filters" style="margin:0">${categories.map((category, index) => `<button class="filter-chip ${index === 0 ? "active" : ""}" data-category="${category}">${category}</button>`).join("")}</div></div><div class="blog-grid" id="blog-grid">${data.posts.map(articleCard).join("")}</div></div></section>`;
    let category = "All";
    const apply = () => { const query = document.getElementById("blog-search").value.toLowerCase().trim(); document.querySelectorAll(".article-card").forEach((card) => { card.hidden = (category !== "All" && card.dataset.category !== category) || !card.dataset.search.includes(query); }); };
    document.getElementById("blog-search").addEventListener("input", apply);
    document.getElementById("blog-filters").addEventListener("click", (event) => { const button = event.target.closest("button"); if (!button) return; category = button.dataset.category; document.querySelectorAll("#blog-filters button").forEach((item) => item.classList.remove("active")); button.classList.add("active"); apply(); });
  }

  function renderArticle() {
    const id = new URLSearchParams(location.search).get("id") || data.posts[0].id;
    const post = data.posts.find((item) => item.id === id) || data.posts[0];
    document.title = `${post.title} | Electronics Hub`;
    const related = data.posts.filter((item) => item.id !== post.id && (item.category === post.category || item.tags.some((tag) => post.tags.includes(tag)))).slice(0, 3);
    main.innerHTML = `<section class="page-hero"><div class="container"><nav class="breadcrumb"><a href="index.html">Home</a><span>/</span><a href="blog.html">Blog</a><span>/</span><span>${post.category}</span></nav><span class="eyebrow">${post.category}</span><h1>${post.title}</h1><div class="lesson-meta"><span>${post.time} read</span>${post.tags.map((tag) => `<span>#${tag}</span>`).join("")}</div></div></section><section class="section-tight"><div class="container article-layout"><article class="article-body"><p class="lead">${post.excerpt}</p><h2 id="mental-model">Start with the mental model</h2><p>Electronics becomes easier when each concept is tied to something observable. Instead of memorizing a rule, ask what charge is doing, what the component is controlling, and what a meter would show.</p><p>That habit turns formulas into tools. It also makes troubleshooting faster because every measurement can confirm or reject a specific idea.</p><h2 id="practical-method">A practical method</h2><h3>1. Define the expected behavior</h3><p>Write down the voltage, timing, or output you expect before touching the circuit. A prediction gives the measurement meaning.</p><h3>2. Measure one boundary at a time</h3><p>Begin at the source, then move through each functional block. Avoid changing several parts at once because it destroys useful evidence.</p><h3>3. Record what changed</h3><p>Simple notes prevent repeated mistakes and make design decisions easier to explain later.</p><h2 id="takeaway">The engineering takeaway</h2><p>A strong engineer does not merely know the correct answer. They can explain why it is correct, test the explanation, and communicate the result clearly.</p></article><aside class="toc panel"><span class="stat-label">On this page</span><a href="#mental-model">Mental model</a><a href="#practical-method">Practical method</a><a href="#takeaway">Engineering takeaway</a></aside></div></section><section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Keep reading</span><h2>Related articles</h2></div><div class="blog-grid">${(related.length ? related : data.posts.slice(1,4)).map(articleCard).join("")}</div></div></section>`;
  }

  function lessonById(id) {
    const known = allLessons.find((lesson) => lesson.id === id);
    if (known) return known;
    const title = id.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return { id, title, time: "18 min", level: 9, levelTitle: "Engineer's Workshop", difficulty: "Intermediate" };
  }

  const lessonTopics = [
    {
      id: "opening-question",
      title: "Opening question",
      label: "Start",
      content: `<div class="question-callout">How can a small hidden circuit change the way we communicate, travel, study, cook, and stay safe?</div><p class="lead lesson-topic-lead">This topic starts with the big idea: electronics are not only components on a board. They are systems that sense the world, make decisions, and create useful actions.</p><p>A phone wakes when you touch the screen. A washing machine measures water level. A traffic signal changes timing. A medical monitor watches a heartbeat. Each example looks different, but the pattern underneath is similar.</p><p>By the end of this lesson, you should be able to look at everyday technology and ask: What does it sense? What decision does it make? What output does it control?</p>`
    },
    {
      id: "beginner-explanation",
      title: "The beginner explanation",
      label: "Concept",
      content: `<h2>The beginner explanation</h2><p>Most electronic systems can be understood with three simple words: input, processing, and output. An input collects information, processing decides what that information means, and an output makes something happen.</p><p>A temperature sensor is an input. A microcontroller or circuit is the processing part. A fan, display, buzzer, motor, or light is the output.</p><p>This simple model helps you understand technology without getting lost in details. Before worrying about formulas, chips, or code, ask what information enters the system and what action leaves it.</p>`
    },
    {
      id: "relationship",
      title: "See the relationship",
      label: "Visual",
      content: `<h2>See the relationship</h2><p>The basic relationship in everyday electronics is a flow of information and energy: the system senses something, decides what it means, then acts.</p><div class="diagram" role="img" aria-label="Flow from sensing through decision to action"><div class="diagram-grid"></div><div class="diagram-flow"><div class="diagram-node">Sense<br>input</div><div class="diagram-line"></div><div class="diagram-node">Decide<br>logic</div><div class="diagram-line"></div><div class="diagram-node">Act<br>output</div></div></div><p>A smart light senses darkness, decides the room needs light, and turns on an LED. A phone senses touch, decides which command you selected, and updates the display.</p>`
    },
    {
      id: "engineering-explanation",
      title: "The engineering explanation",
      label: "Theory",
      content: `<h2>The engineering explanation</h2><p>Engineers describe electronic products as systems made of sensors, signal conditioning, computation or control logic, actuators, power delivery, and feedback.</p><p>The sensor converts a real-world condition into an electrical signal. The control circuit or processor interprets that signal. The output stage drives a load such as a speaker, motor, display, relay, or LED.</p><p>Good engineering means the system must work reliably under real conditions: low battery, electrical noise, changing temperature, user mistakes, and component tolerances.</p>`
    },
    {
      id: "applications",
      title: "Where it appears",
      label: "Examples",
      content: `<h2>Where it appears</h2><div class="application-grid"><div class="application"><strong>Smartphones</strong><p class="muted">Touch, motion, microphones, cameras, radios, processors, and displays work as one system.</p></div><div class="application"><strong>Home appliances</strong><p class="muted">Sensors and controllers manage temperature, water, timing, speed, and safety.</p></div><div class="application"><strong>Transportation</strong><p class="muted">Vehicles use electronics for sensing, lighting, braking, charging, navigation, and communication.</p></div></div><p>Once you notice the pattern, electronics stops feeling invisible. Everyday devices become understandable systems with inputs, decisions, outputs, and power.</p>`
    },
    {
      id: "quick-check",
      title: "Quick check",
      label: "Practice",
      content: `<h2>Quick check</h2><form class="quiz" id="lesson-quiz"><p><strong>In an automatic night light, what role does the light sensor play?</strong></p><label class="quiz-option"><input type="radio" name="answer" value="correct"> Input</label><label class="quiz-option"><input type="radio" name="answer" value="wrong"> Output</label><label class="quiz-option"><input type="radio" name="answer" value="wrong"> Power source</label><button class="button button-secondary" type="submit">Check answer</button><div class="quiz-feedback" id="quiz-feedback" aria-live="polite"></div></form><p>The sensor provides information about the environment. The circuit uses that information to decide whether the lamp should turn on.</p>`
    },
    {
      id: "key-takeaways",
      title: "Key takeaways",
      label: "Summary",
      content: `<h2>Key takeaways</h2><ul class="takeaway-list"><li>Everyday electronics can be understood as input, processing, and output.</li><li>Sensors turn real-world conditions into electrical information.</li><li>Controllers or circuits decide what should happen next.</li><li>Outputs make the decision visible through light, motion, sound, heat, or data.</li></ul><p>Before moving on, choose one device near you and identify its input, processing, output, and power source.</p>`
    }
  ];

  const courseCurricula = {
    "C-PROGRAMMING": [
      {
        title: "Getting Started with C",
        topics: [
          { id: "Your-First-C-Program", title: "Your First C Program", label: "Start", content: `<div class="question-callout">How can a small set of instructions control hardware, from a blinking LED to an entire embedded system?</div><p class="lead">C is a fast, widely used programming language that gives you direct control over memory and hardware. That is why it is a core language for embedded systems.</p><p>A C program is a precise list of instructions. You write the instructions, compile them into machine code, and the computer follows them step by step.</p><p>As you learn C, focus on what each line stores, changes, checks, or sends to the hardware.</p>` },
          { id: "Compile-Build-&-Run", title: "Compile, Build & Run", label: "Build", content: `<h2>Your first C program</h2><p>Every C program starts at <code>main</code>. It is the function the computer runs first.</p><p><code>int main(void) { return 0; }</code></p><p>The braces contain the instructions. A semicolon finishes an instruction. The <code>return 0</code> tells the operating system the program finished successfully.</p><p>Write a small program, compile it, and change one line at a time. That feedback loop is the fastest way to build confidence.</p>` },
          
        ]
      },
      {
        title: "Variables, Types & Memory",
        topics: [
          { id: "variables", title: "Variables & Constants", label: "Concept", content: `<div class="question-callout">How does a program remember a sensor reading, a counter value, or whether an LED is on?</div><h2>Variables</h2><p>A variable is a named place in memory that stores a value your program can use and change.</p><p><code>int ledState = 0;</code> creates a variable named <code>ledState</code> and gives it the initial value <code>0</code>. Later, your program can set it to <code>1</code> when the LED should turn on.</p><p>Choose names that explain the value: <code>temperatureC</code> is clearer than <code>x</code>. Good names make programs easier to test and debug.</p>` },
          { id: "data-types", title: "Data Types in C", label: "Concept", content: `<h2>Data types</h2><p>A data type tells C what kind of value a variable stores and how much memory it needs.</p><div class="application-grid"><div class="application"><strong><code>int</code></strong><p class="muted">Whole numbers, such as a button press count.</p></div><div class="application"><strong><code>float</code></strong><p class="muted">Decimal values, such as a measured voltage.</p></div><div class="application"><strong><code>char</code></strong><p class="muted">A single character, such as a command received over serial communication.</p></div></div><p>Select a type that fits the data and its expected range. This matters especially on microcontrollers with limited memory.</p>` },
          { id: "operators", title: "Signed vs Unsigned Integers", label: "Practice", content: `<h2>Operators and expressions</h2><p>Operators let you calculate and compare values. C uses <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code> for arithmetic, and comparison operators such as <code>==</code> and <code>&gt;</code> for decisions.</p><p><code>int nextCount = count + 1;</code> is an expression: it reads the current value, adds one, and stores the result.</p><p>Keep expressions readable. Split a complicated calculation into named variables when you need to check it.</p>` },
          { id: "operators", title: "Integer Size & Range", label: "Practice", content: `<h2>Operators and expressions</h2><p>Operators let you calculate and compare values. C uses <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code> for arithmetic, and comparison operators such as <code>==</code> and <code>&gt;</code> for decisions.</p><p><code>int nextCount = count + 1;</code> is an expression: it reads the current value, adds one, and stores the result.</p><p>Keep expressions readable. Split a complicated calculation into named variables when you need to check it.</p>` },
          { id: "operators", title: "Fixed-Width Integer Types", label: "Practice", content: `<h2>Operators and expressions</h2><p>Operators let you calculate and compare values. C uses <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code> for arithmetic, and comparison operators such as <code>==</code> and <code>&gt;</code> for decisions.</p><p><code>int nextCount = count + 1;</code> is an expression: it reads the current value, adds one, and stores the result.</p><p>Keep expressions readable. Split a complicated calculation into named variables when you need to check it.</p>` }
        ]
      },
      {
        title: "Input, Output & Type Conversion",
        topics: [
          { id: "if-else", title: "Type Conversion", label: "Control", content: `<h2>if and else</h2><p>Use <code>if</code> when a program must choose an action based on a condition.</p><p><code>if (temperatureC &gt; 30) { fanOn = 1; } else { fanOn = 0; }</code></p><p>The condition is either true or false. This is how software reacts to a button, threshold, error, or sensor value.</p>` },
          { id: "loops", title: "Formatted Output with printf()", label: "Control", content: `<h2>Loops</h2><p>Loops repeat instructions. A <code>for</code> loop is useful when you know how many times to repeat, while a <code>while</code> loop continues until a condition changes.</p><p>In embedded work, a main loop often reads inputs, makes a decision, updates outputs, and then repeats.</p><p>Always make sure a loop has a clear stopping condition when it is not intended to run forever.</p>` },
          { id: "functions", title: "Input with scanf()", label: "Structure", content: `<h2>Functions</h2><p>A function groups one job under a meaningful name. Instead of repeating the same code, define it once and call it whenever you need it.</p><p><code>void turnLedOn(void)</code> describes a function that performs an action and returns no value.</p><p>Small functions make a program easier to read, test, and reuse in future projects.</p>` },
          { id: "functions", title: "Debugging with Input & Output", label: "Structure", content: `<h2>Functions</h2><p>A function groups one job under a meaningful name. Instead of repeating the same code, define it once and call it whenever you need it.</p><p><code>void turnLedOn(void)</code> describes a function that performs an action and returns no value.</p><p>Small functions make a program easier to read, test, and reuse in future projects.</p>` }
        ]
      },
      {
        title: "Operators & Expressions",
        topics: [
          { id: "arrays", title: "Arithmetic Operators", label: "Concept", content: `<h2>Arithmetic operators</h2><p>Arithmetic operators calculate numeric values. C provides <code>+</code> for addition, <code>-</code> for subtraction, <code>*</code> for multiplication, and <code>/</code> for division. The remainder operator <code>%</code> gives the remainder after integer division.</p><p>For example, <code>int half = 9 / 2;</code> stores <code>4</code> because integer division discards the fractional part. Use a floating-point value when you need a decimal result.</p>` },
          { id: "strings", title: "Relational & Equality Operators", label: "Concept", content: `<h2>Relational and equality operators</h2><p>These operators compare two values and produce true (nonzero) or false (zero): <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>, <code>==</code>, and <code>!=</code>.</p><p>For example, <code>if (temperature &gt;= limit)</code> checks whether the temperature has reached a limit. Use <code>==</code> to compare values; a single <code>=</code> assigns a value.</p>` },
          { id: "logical-operators", title: "Logical Operators", label: "Concept", content: `<h2>Logical operators</h2><p>Logical operators combine or reverse conditions. <code>&amp;&amp;</code> is true when both conditions are true, <code>||</code> is true when either condition is true, and <code>!</code> reverses a condition.</p><p><code>if (buttonPressed &amp;&amp; temperature &lt; limit)</code> runs only when the button is pressed and the temperature is below the limit. C evaluates these operators from left to right with short-circuit behavior.</p>` },
          { id: "assignment-increment-operators", title: "Assignment & Increment Operators", label: "Concept", content: `<h2>Assignment and increment operators</h2><p>Assignment operators store or update a variable. Along with <code>=</code>, C provides shortcuts such as <code>+=</code>, <code>-=</code>, <code>*=</code>, and <code>/=</code>. For example, <code>count += 1;</code> adds one to <code>count</code>.</p><p><code>++</code> increments a value and <code>--</code> decrements it. Prefix (<code>++count</code>) updates before the expression is used; postfix (<code>count++</code>) uses the old value first.</p>` },
          { id: "operator-precedence", title: "Operator Precedence & Expressions", label: "Concept", content: `<h2>Operator precedence and expressions</h2><p>Precedence determines which operations are evaluated first. Multiplication and division happen before addition and subtraction, so <code>2 + 3 * 4</code> evaluates to <code>14</code>.</p><p>Use parentheses to make the intended order clear: <code>(2 + 3) * 4</code> evaluates to <code>20</code>. Parentheses make expressions easier to read and help prevent subtle logic errors.</p>` }
        ]
      },
      {
        title: "Decisions & Repetition",
        topics: [
          { id: "arrays", title: "if, else if & else", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "switch Statements", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "for, while & do-while Loops", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "break, continue & Nested Loops", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
          
        ]
      },
      {
        title: "Functions & Program Organization",
        topics: [
          { id: "arrays", title: "Functions: Declaration, Definition & Calling", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "Parameters, Arguments & Return Values", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "Local Variables, Scope & Lifetime", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Passing Values to Functions", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Function Prototypes & Modular Code", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
        ]
      },
      {
        title: "Arrays & Data Handling",
        topics: [
          { id: "arrays", title: "Arrays: Declaration & Initialization", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "Accessing Elements & Array Indexing", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "Traversing Arrays with Loops", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Multidimensional Arrays", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Character Arrays & Basic Strings", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Arrays in Sensor Data Collection", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
        ]
      },
      {
        title: "Pointers & Memory Addresses",
        topics: [
          { id: "arrays", title: "Memory Addresses & the Address-of Operator", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "Pointer Declaration & Initialization", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "Dereferencing Pointers", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Pointers and Functions", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Pointers and Arrays", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Pointers and Functions", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Pointers and Arrays", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "NULL Pointers & Common Pointer Errors", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Pointers in Embedded Programming", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
        ]
      },
      {
        title: "Structures & User-Defined Types",
        topics: [
          { id: "arrays", title: "Structures (struct)", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "Accessing Structure Members", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "Arrays of Structures", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Enumerations (enum)", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Unions (union)", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Enumerations (enum)", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "typedef and Custom Type Names", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
        ]
      },
      {
        title: "Scope, Storage & Memory Qualifiers",
        topics: [
          { id: "arrays", title: "Local & Global Variables", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "Storage Classes: static and extern", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "const and Read-Only Data", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "volatile in Embedded C", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Variable Lifetime & Linkage", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "volatile in Embedded C", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Stack, Static Storage & Memory Layout", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
        ]
      },
      {
        title: "Preprocessor & Header Files",
        topics: [
          { id: "arrays", title: "#include and Header Files", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "Macros with #define", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "Conditional Compilation", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Header Guards", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Splitting a Program into .c and .h Files", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
        ]
      },
      {
        title: "Bit Manipulation & Binary Operations",
        topics: [
          { id: "arrays", title: "Binary, Hexadecimal & Bit Positions", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "Bitwise Operators: &, |, ^, ~", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "Left & Right Shift Operators", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Setting, Clearing & Toggling Bits", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Masks and Bit Fields", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Reading & Modifying Register Bits", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Common Bit Manipulation Errors", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
        ]
      },
      {
        title: "Embedded C Fundamentals",
        topics: [
          { id: "arrays", title: "What Makes Embedded C Different?", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "Memory-Mapped Hardware Registers", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "GPIO Registers & Pin Control", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Polling vs Interrupts", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Hardware Timers & Counters", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "UART, SPI & I²C Data Handling", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Fixed-Width Types and Register Access", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Hardware, Compiler & Portability Considerations", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
        ]
      },
      {
        title: "Practical C for Embedded Systems",
        topics: [
          { id: "arrays", title: "Building a Sensor Data Processor", label: "Data", content: `<h2>Arrays</h2><p>An array stores several values of the same type in order. For example, <code>int readings[5]</code> can hold five sensor readings.</p><p>Array positions start at zero, so the first item is <code>readings[0]</code>. Be careful not to read or write beyond the final position.</p>` },
          { id: "strings", title: "Implementing a Software Counter & Timer", label: "Data", content: `<h2>Strings</h2><p>In C, a string is an array of characters that ends with a special null character.</p><p>Strings are used for labels, serial messages, and simple command text. Give them enough space for every character plus the ending null character.</p>` },
          { id: "pointers", title: "Building a Circular Buffer", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Reading and Updating Register Fields", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Writing Interrupt-Friendly Code", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Debugging Common Embedded C Errors", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` },
          { id: "pointers", title: "Mini Project: Sensor Data Acquisition", label: "Advanced", content: `<h2>Pointers</h2><p>A pointer stores the memory address of another value. Pointers allow functions to work with original data and let embedded programs access hardware registers efficiently.</p><p>Start by treating a pointer as an address. Use it only after you can clearly explain which value it points to and whether that memory is valid.</p>` }
        ]
      }
    ]
  };

 function createCourseTopic(id, title, label, courseTitle, explanation) {
  const content = topicContent[id] || `<div class="question-callout">${explanation}</div><h2>${title}</h2><p>...</p>`;
  return { id, title, label, content };
}

  function defaultCourseChapters(lesson) {
    const courseTitle = lesson.title;
    
    const i = lesson.index % details.length;
    const info = details[i];
    return [
      { title:  info.above1, topics: [
        createCourseTopic("introduction", info.under1[0], "Start", courseTitle, `What problem does ${courseTitle} solve, and where is it used?`),
        createCourseTopic("core-ideas", info.under1[1], "Concept", courseTitle, `Which basic ideas make ${courseTitle} work?`),
        createCourseTopic("essential-tools", info.under1[2], "Setup", courseTitle, `What tools, parts, or software do you need before you begin?`)
      ] },
      { title:  info.above2, topics: [
        createCourseTopic("main-parts", info.under2[0], "Concept", courseTitle, `Which parts make up a typical ${courseTitle} system?`),
        createCourseTopic("how-it-works", info.under2[1], "Theory", courseTitle, `How do the important parts work together?`),
        createCourseTopic("common-patterns", info.under2[2], "Practice", courseTitle, `Which recurring patterns help you recognize ${courseTitle} in practice?`)
      ] },
      { title:  info.above3, topics: [
        createCourseTopic("first-example", info.under3[0], "Build", courseTitle, `What is the smallest useful example you can build or test?`),
        createCourseTopic("measure-and-debug", info.under3[1], "Practice", courseTitle, `How can you check whether your ${courseTitle} work is behaving correctly?`),
        createCourseTopic("real-world-use", info.under3[2], "Examples", courseTitle, `Where does ${courseTitle} appear in real engineering systems?`)
      ] },
      { title:  info.above4, topics: [
        createCourseTopic("common-mistakes", info.under4[0], "Troubleshoot", courseTitle, `Which mistakes should you look for first when something does not work?`),
        createCourseTopic("mini-challenge", info.under4[1], "Practice", courseTitle, `How can you apply ${courseTitle} in a small, focused challenge?`),
        createCourseTopic("key-takeaways", info.under4[2], "Summary", courseTitle, `What are the most useful ideas to carry into the next course?`)
      ] }
    ];
  }

  function courseChapters(lesson) {
    const chapters = courseCurricula[lesson.id] || defaultCourseChapters(lesson);
    return chapters.map((chapter) => {
      const idCounts = new Map();
      chapter.topics.forEach((topic) => {
        const id = String(topic.id || "");
        idCounts.set(id, (idCounts.get(id) || 0) + 1);
      });
      const reservedIds = new Set([...idCounts].filter(([, count]) => count === 1).map(([id]) => id));
      const usedIds = new Set();
      return {
        ...chapter,
        topics: chapter.topics.map((topic, topicIndex) => {
          let id = String(topic.id || "");
          if (usedIds.has(id)) {
            const baseId = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `topic-${topicIndex + 1}`;
            id = baseId;
            let suffix = 2;
            while (usedIds.has(id) || reservedIds.has(id)) id = `${baseId}-${suffix++}`;
          }
          usedIds.add(id);
          return id === topic.id ? topic : { ...topic, id };
        })
      };
    });
  }

  function courseTopicHref(lessonId, chapterIndex, topicId) {
    return `lesson.html?id=${encodeURIComponent(lessonId)}&chapter=${chapterIndex}&topic=${encodeURIComponent(topicId)}`;
  }

  function courseStartHref(lessonId) {
    const courseLesson = lessonById(lessonId);
    const firstTopic = courseChapters(courseLesson)[0].topics[0];
    return courseTopicHref(courseLesson.id, 0, firstTopic.id);
  }

  function lessonChapterNav(lesson, chapters, currentChapterIndex, currentTopicId) {
    return chapters.map((chapter, chapterIndex) => `<details class="lesson-chapter" ${chapterIndex === currentChapterIndex ? "open" : ""}><summary class="lesson-chapter-summary"><strong>${chapter.title}</strong></summary><div class="lesson-chapter-topics">${chapter.topics.map((topic) => `<a class="lesson-side-link ${chapterIndex === currentChapterIndex && topic.id === currentTopicId ? "active" : ""}" href="${courseTopicHref(lesson.id, chapterIndex, topic.id)}" ${chapterIndex === currentChapterIndex && topic.id === currentTopicId ? 'aria-current="page"' : ""}><span>${topic.title}</span></a>`).join("")}</div></details>`).join("");
  }

  function renderLesson() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id") || "voltage-current-resistance";
    const lesson = lessonById(id);
    state.lastLesson = lesson.id; saveState();
    const index = allLessons.findIndex((item) => item.id === lesson.id);
    const previous = allLessons[index > 0 ? index - 1 : 0];
    const next = allLessons[index >= 0 && index < allLessons.length - 1 ? index + 1 : Math.min(1, allLessons.length - 1)];
    const chapters = courseChapters(lesson);
    const requestedChapter = Number(params.get("chapter"));
    const chapterIndex = Number.isInteger(requestedChapter) && chapters[requestedChapter] ? requestedChapter : 0;
    const chapter = chapters[chapterIndex];
    const requestedTopic = params.get("topic") || chapter.topics[0].id;
    const topicIndex = Math.max(0, chapter.topics.findIndex((topic) => topic.id === requestedTopic));
    const topic = chapter.topics[topicIndex];
    const courseTopics = chapters.flatMap((courseChapter, courseChapterIndex) => courseChapter.topics.map((courseTopic, courseTopicIndex) => ({ chapterIndex: courseChapterIndex, topicIndex: courseTopicIndex, chapter: courseChapter, topic: courseTopic })));
    const courseTopicIndex = courseTopics.findIndex((courseTopic) => courseTopic.chapterIndex === chapterIndex && courseTopic.topicIndex === topicIndex);
    const previousTopic = courseTopics[courseTopicIndex - 1];
    const nextTopic = courseTopics[courseTopicIndex + 1];
    document.title = `${topic.title} | ${lesson.title} | Electronics Hub`;
    const chapterNav = lessonChapterNav(lesson, chapters, chapterIndex, topic.id);
    main.innerHTML = `<section class="page-hero course-topic-hero"><div class="container"><span class="eyebrow">${lesson.title}</span><h1>${topic.title}</h1></div></section><section class="section-tight"><div class="container lesson-shell"><article class="lesson-content">
      <section class="lesson-block lesson-topic-page">${topic.content}</section>
      <nav class="lesson-nav" aria-label="Topic navigation">${previousTopic ? `<a href="${courseTopicHref(lesson.id, previousTopic.chapterIndex, previousTopic.topic.id)}"><span class="tiny">Previous topic</span><strong style="display:block">${previousTopic.topic.title}</strong></a>` : `<a href="${courseStartHref(previous.id)}"><span class="tiny">Previous course</span><strong style="display:block">${previous.title}</strong></a>`}${nextTopic ? `<a href="${courseTopicHref(lesson.id, nextTopic.chapterIndex, nextTopic.topic.id)}"><span class="tiny">Next topic</span><strong style="display:block">${nextTopic.topic.title}</strong></a>` : `<a href="${courseStartHref(next.id)}"><span class="tiny">Next course</span><strong style="display:block">${next.title}</strong></a>`}</nav>
      </article><aside class="lesson-aside"><div class="lesson-sidebar"><nav class="panel lesson-course-nav course-outline" aria-label="${lesson.title} chapters"><h2 class="course-outline-title">${lesson.title}</h2><div class="lesson-chapter-list">${chapterNav}</div></nav></div></aside></div></section>`;
    bindLesson(lesson);
  }

  function bindLesson(lesson) {
    const quiz = document.getElementById("lesson-quiz");
    if (quiz) {
      quiz.addEventListener("submit", (event) => {
        event.preventDefault(); const selected = document.querySelector('input[name="answer"]:checked'); const feedback = document.getElementById("quiz-feedback");
        if (!selected) { feedback.textContent = "Choose an answer first."; feedback.style.color = "var(--warning)"; return; }
        if (selected.value === "correct") { feedback.textContent = "Correct. The light sensor is the input because it detects the environment and sends information to the circuit."; feedback.style.color = "var(--secondary)"; if (!state.quizWins.includes(lesson.id)) { state.quizWins.push(lesson.id); saveState(); showToast("Achievement unlocked: Quiz Ready"); } }
        else { feedback.textContent = "Not quite. The output is what the system controls, like the lamp or LED. The sensor is the input."; feedback.style.color = "var(--danger)"; }
      });
    }
    const button = document.getElementById("complete-lesson");
    if (!button) return;
    button.addEventListener("click", () => {
      if (!state.completed.includes(lesson.id)) state.completed.push(lesson.id);
      state.lastLesson = lesson.id; saveState(); button.textContent = "Lesson completed"; button.disabled = true; button.classList.remove("button-primary"); button.classList.add("button-secondary"); showToast("Lesson complete. Progress saved locally.");
    });
  }

  function renderAbout() {
   main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Our purpose</span><h1>Making electronics easier to understand.</h1><p class="lead">Electronics is at the heart of smartphones, computers, medical equipment, satellites, robots, and vehicles — yet learning it often feels disconnected from the technology around us. Electronics Hub exists to close that gap.</p></div></section><section class="section"><div class="container split"><div class="stack"><h2>Why Electronics Hub exists.</h2><p class="lead">There's no shortage of information about electronics online. The real challenge is finding information that's structured, understandable, and connected to practical engineering. Instead of stopping at "what is it," we explore how it works, why it works that way, where it's used, and how it becomes part of a larger system.</p></div><div class="card"><span class="stat-label">The person behind it</span><div class="stack" style="margin-top:18px"><div><strong>Munendra Sikarwar</strong><p class="muted">An Electronics and Communication Engineering student at NIT Srinagar.</p></div><div><strong>Built from experience</strong><p class="muted">The idea grew out of wanting to understand more than what's covered in a classroom or textbook.</p></div><div><strong>Learning in public</strong><p class="muted">Not built on the idea that everything is already mastered — built around learning, experimenting, and sharing the process.</p></div></div></div></div></section><section class="section"><div class="container"><div class="stack"><h2>What you'll find here.</h2></div><div class="grid"><div class="card"><strong>Learn</strong><p class="muted">A strong foundation, from electricity and basic components to semiconductors, transistors, analog and digital circuits, microcontrollers, and communication systems.</p></div><div class="card"><strong>Explore</strong><p class="muted">Go beyond textbooks and discover what happens inside the devices and technologies we use every day.</p></div><div class="card"><strong>Build</strong><p class="muted">Apply concepts through projects, experiments, simulations, and practical systems.</p></div><div class="card"><strong>Troubleshoot</strong><p class="muted">Learn how engineers identify faults, understand why systems fail, and find practical solutions.</p></div><div class="card"><strong>Grow</strong><p class="muted">Explore career paths, skills, internships, and opportunities relevant to electronics and communication students.</p></div></div></div></section><section class="section"><div class="container"><div class="stack"><h2>Our approach.</h2><p class="lead">Start with curiosity. Build understanding. Apply it in practice. A topic shouldn't end with a definition — it should lead to the principle behind it, the component involved, the circuit that uses it, and the application where it becomes useful. A sensor, for example, is a full journey: physical quantity → sensor → electrical signal → microcontroller → processing → decision → output.</p></div></div></section><section class="section-tight"><div class="container metrics"><div class="metric"><strong>11</strong><span>Connected levels</span></div><div class="metric"><strong>100+</strong><span>Planned lessons</span></div><div class="metric"><strong>50+</strong><span>Project pathways</span></div><div class="metric"><strong>0</strong><span>Accounts required</span></div></div></section><section class="section"><div class="container"><blockquote class="lead">Don't just learn what a circuit does. Understand why it works.</blockquote><p class="muted">Once you understand the principles, you're no longer limited to following someone else's circuit. You can experiment with it, troubleshoot it, improve it, and eventually design your own.</p></div></section>`;
  }

  function renderContact() {
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Contact</span><h1>Tell us what would help.</h1><p class="lead">Share a correction, suggest a lesson, or tell us which project you want to build next.</p></div></section><section class="section-tight"><div class="container split"><form class="card form-grid" id="contact-form"><div class="form-grid two">${field("contact-name", "Name", "Your name", "text")}${field("contact-email", "Email", "you@example.com", "email")}</div><div class="field"><label for="contact-topic">Topic</label><select id="contact-topic"><option>Content suggestion</option><option>Technical correction</option><option>Project request</option><option>General feedback</option></select></div><div class="field"><label for="contact-message">Message</label><textarea id="contact-message" required placeholder="How can we improve Electronics Hub?"></textarea></div><button class="button button-primary" type="submit">Open email draft</button><p class="tiny">This static site sends no form data to a server. Your email app will open with a prepared draft.</p></form><div class="stack"><div class="card"><span class="stat-label">Email</span><h3 style="margin-top:8px"><a href="mailto:hello@electronicshub.example">ecehub2@gmail.com</a></h3></div><div class="card"><span class="stat-label">Response focus</span><p class="muted" style="margin-top:8px">Corrections and accessibility issues receive the highest priority.</p></div></div></div></section>`;
    document.getElementById("contact-form").addEventListener("submit", (event) => { event.preventDefault(); const subject = encodeURIComponent(document.getElementById("contact-topic").value); const body = encodeURIComponent(`Name: ${document.getElementById("contact-name").value}\nEmail: ${document.getElementById("contact-email").value}\n\n${document.getElementById("contact-message").value}`); location.href = `mailto:hello@electronicshub.example?subject=${subject}&body=${body}`; });
  }

  const legalContent = {
    privacy: ["Privacy Policy", "Electronics Hub is designed to work without accounts, profiles, or a backend database.", ["LocalStorage", "Learning progress, completed lessons, streak dates, quiz achievements, tool usage, and cookie preference are stored only in your browser. You can clear this information through your browser settings.", "Data sharing", "This static website does not sell personal information or send learning progress to a server. Third-party hosting providers may process standard access logs under their own policies.", "Contact", "If you contact us by email, your email provider processes the information you choose to send."]],
    terms: ["Terms & Conditions", "By using Electronics Hub, you agree to use the material responsibly and lawfully.", ["Educational use", "Content is provided for learning and general information. You may link to pages and use the examples for personal study.", "No warranty", "The site is provided as-is without guarantees of completeness, uninterrupted availability, or fitness for a specific purpose.", "Responsible building", "You are responsible for following electrical safety practices, component ratings, and local regulations."]],
    disclaimer: ["Disclaimer", "Electronics can involve heat, stored energy, hazardous voltages, and damaged equipment.", ["Educational information", "Lessons and calculators are educational aids, not professional engineering certification or site-specific safety advice.", "Verification", "Always verify component ratings, datasheets, calculations, polarity, isolation, and protective equipment before building.", "High voltage", "Do not work on mains electricity or hazardous voltage systems without qualified supervision and appropriate training."]],
    cookies: ["Cookie Policy", "Electronics Hub does not use advertising or analytics cookies in this static build.", ["Local preferences", "The site uses browser LocalStorage to remember learning progress and whether you dismissed the storage notice.", "Control", "You can block or clear site data at any time through browser privacy settings. Clearing it resets local progress and achievements."]],
    affiliate: ["Affiliate Disclosure", "Electronics Hub may occasionally link to components, books, tools, or learning resources.", ["Transparency", "If a link is an affiliate link, it will be identified clearly near the link.", "Editorial independence", "Affiliate relationships do not determine lesson conclusions, project requirements, tool recommendations, or review outcomes.", "Current build", "This demonstration contains no paid affiliate links."]],
    editorial: ["Editorial Policy", "Our content aims to be accurate, practical, accessible, and clear about its limitations.", ["Method", "Lessons connect beginner intuition with equations, component limits, measurement, simulation, and real applications.", "Sources", "Technical claims should be checked against primary references such as manufacturer datasheets, standards, and authoritative textbooks.", "Corrections", "Meaningful corrections are reviewed promptly and updated transparently. Readers can report issues through the contact page.", "Conflicts", "Commercial relationships must be disclosed and cannot override technical judgment."]],
    copyright: ["Copyright Notice", "The Electronics Hub site design, original writing, curriculum structure, and original code are protected by applicable copyright law.", ["Permitted use", "You may view, link to, and use the material for personal education. Short quotations should include clear attribution and a link to the source page.", "Restricted use", "Do not republish substantial portions, remove attribution, sell copies, or present original Electronics Hub material as your own without permission.", "Third-party rights", "Product names, trademarks, datasheets, and linked resources remain the property of their respective owners."]]
  };

  function renderLegal(type) {
    const content = legalContent[type];
    main.innerHTML = `<section class="page-hero"><div class="container legal"><span class="eyebrow">Legal & transparency</span><h1>${content[0]}</h1><p class="lead">${content[1]}</p><p class="tiny" style="margin-top:16px">Last updated: June 14, 2026</p></div></section><section class="section-tight"><div class="container legal">${Array.from({ length: content[2].length / 2 }, (_, index) => `<h2>${content[2][index * 2]}</h2><p>${content[2][index * 2 + 1]}</p>`).join("")}</div></section>`;
  }

  function renderSitemap() {
    const links = [["Home","index.html"],["Start Learning","learn.html"],["Projects","projects.html"],["Engineer's Workshop","workshop.html"],["Tools","tools.html"],["Student Zone","student-zone.html"],["Blog","blog.html"],["About","about.html"],["Contact","contact.html"],["Privacy Policy","privacy.html"],["Terms & Conditions","terms.html"],["Disclaimer","disclaimer.html"],["Cookie Policy","cookies.html"],["Affiliate Disclosure","affiliate.html"],["Editorial Policy","editorial.html"],["Copyright Notice","copyright.html"]];
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Every route</span><h1>Sitemap</h1><p class="lead">Navigate the complete Electronics Hub platform.</p></div></section><section class="section-tight"><div class="container split"><div class="panel" style="padding:20px"><div class="sitemap-links">${links.map((link) => `<a href="${link[1]}">${link[0]}</a>`).join("")}</div></div><div class="card"><span class="stat-label">Learning levels</span><div class="sitemap-links" style="margin-top:12px">${data.levels.map((level) => `<a href="learn.html#level-${level.id}">Level ${level.id}: ${level.title}</a>`).join("")}</div></div></div></section>`;
  }

  function renderNotFound() {
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">404</span><h1>That signal went nowhere.</h1><p class="lead">The page may have moved, but the learning path is still intact.</p><div class="cluster" style="margin-top:24px"><a class="button button-primary" href="index.html">Return home</a><a class="button" href="learn.html">Open roadmap</a></div></div></section>`;
  }

  function renderPage() {
    const renderers = { home: renderHome, learn: renderLearn, projects: renderProjects, workshop: renderWorkshop, tools: renderTools, student: renderStudent, blog: renderBlog, article: renderArticle, lesson: renderLesson, about: renderAbout, contact: renderContact, sitemap: renderSitemap, notfound: renderNotFound };
    if (legalContent[page]) renderLegal(page);
    else (renderers[page] || renderNotFound)();
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function bindShell() {
    const menuButton = document.getElementById("menu-button");
    const mobilePanel = document.getElementById("mobile-panel");
    const themeButton = document.getElementById("theme-toggle");
    themeButton.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme, true);
      showToast(`${nextTheme === "dark" ? "Dark" : "Light"} mode enabled`);
    });
    menuButton.addEventListener("click", () => { const open = mobilePanel.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(open)); });
    addEventListener("scroll", () => document.getElementById("site-header").classList.toggle("scrolled", scrollY > 10), { passive: true });
    const modal = document.getElementById("search-modal");
    const input = document.getElementById("global-search");
    const openSearch = () => { modal.classList.add("open"); document.body.style.overflow = "hidden"; setTimeout(() => input.focus(), 20); renderSearchResults(""); };
    const closeSearch = () => { modal.classList.remove("open"); document.body.style.overflow = ""; };
    document.getElementById("search-open").addEventListener("click", openSearch);
    document.getElementById("search-close").addEventListener("click", closeSearch);
    modal.addEventListener("click", (event) => { if (event.target === modal) closeSearch(); });
    addEventListener("keydown", (event) => { if (event.key === "Escape") closeSearch(); if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); } });
    input.addEventListener("input", () => renderSearchResults(input.value));
    const cookie = document.getElementById("cookie-banner");
    if (!localStorage.getItem("electronicsHub.storageNotice")) cookie.classList.add("show");
    document.getElementById("cookie-accept").addEventListener("click", () => { localStorage.setItem("electronicsHub.storageNotice", "accepted"); cookie.classList.remove("show"); });
  }

  function renderSearchResults(query) {
    const value = query.toLowerCase().trim();
    const items = [
      ...allLessons.map((lesson) => ({ title: lesson.title, type: `Lesson · Level ${lesson.level}`, href: `lesson.html?id=${lesson.id}` })),
      ...data.projects.map((project) => ({ title: project.title, type: `Project · ${project.difficulty}`, href: "projects.html" })),
      ...data.posts.map((post) => ({ title: post.title, type: `Article · ${post.category}`, href: `article.html?id=${post.id}` }))
    ];
    const matches = items.filter((item) => !value || `${item.title} ${item.type}`.toLowerCase().includes(value)).slice(0, 10);
    document.getElementById("search-results").innerHTML = matches.length ? matches.map((item) => `<a class="search-result" href="${item.href}"><strong>${item.title}</strong><span>${item.type}</span></a>`).join("") : `<div class="empty-state">No matching lessons, projects, or articles.</div>`;
  }

  function injectStructuredData() {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": page === "lesson" ? "LearningResource" : "WebSite",
      name: page === "lesson" ? document.title : "Electronics Hub",
      url: location.href,
      description: "A structured electronics learning platform with lessons, projects, engineering tools, and practical resources.",
      isAccessibleForFree: true,
      educationalLevel: "Beginner to advanced"
    });
    document.head.appendChild(script);
  }

  setTheme(initialTheme());
  recordActivity();
  renderShell();
  setTheme(document.documentElement.dataset.theme || initialTheme());
  renderPage();
  bindShell();
  injectStructuredData();
})();
