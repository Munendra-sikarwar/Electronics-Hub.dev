(function () {
  "use strict";

  const data = window.EH_DATA;
  const page = document.body.dataset.page || "home";
  const main = document.getElementById("main-content");
  const allLessons = data.levels.flatMap((level) => level.lessons.map((lesson) => ({
    id: lesson[0], title: lesson[1], time: lesson[2], level: level.id, levelTitle: level.title, difficulty: level.difficulty
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
    return "dark";
  }

  function setTheme(theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    if (persist) localStorage.setItem("electronicsHub.theme", theme);
    const button = document.getElementById("theme-toggle");
    if (!button) return;
    const next = theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", `Switch to ${next} mode`);
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
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Your learning console</span><h1>Electronics Roadmap</h1><p class="lead">Move from curiosity to independent engineering through eleven connected levels.</p></div></section>
      <section class="section-tight"><div class="container">${dashboardMarkup()}</div></section>
      <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">Level by level</span><h2>Your complete path.</h2></div><div class="level-list">${data.levels.map((level) => {
        const lp = levelProgress(level);
        return `<details class="level-item" id="level-${level.id}" ${level.id === currentLevel().id ? "open" : ""}><summary class="level-summary"><div class="level-main"><span class="level-number">${level.id}</span><div><h3 class="level-title">${level.title}</h3><p class="level-description">${level.description}</p><div class="level-meta" style="margin-top:9px"><span>${level.difficulty}</span><span>${level.time}</span><span>${level.count} lessons</span></div></div></div><div class="level-progress"><div class="cluster" style="justify-content:space-between"><span class="tiny">Progress</span><strong>${lp}%</strong></div><div class="meter" style="margin-top:7px"><span style="width:${lp}%"></span></div></div></summary><div class="lesson-list">${level.lessons.map((lesson) => `<a class="lesson-row ${state.completed.includes(lesson[0]) ? "completed" : ""}" href="lesson.html?id=${lesson[0]}"><span class="lesson-title">${lesson[1]}</span><span class="tiny">${lesson[2]}</span></a>`).join("")}<div class="lesson-row"><span class="muted">Plus ${Math.max(level.count - level.lessons.length, 0)} guided lessons in this level</span><span class="tiny">Curriculum</span></div></div></details>`;
      }).join("")}</div></div></section>`;
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
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">For ECE students</span><h1>Student Zone</h1><p class="lead">Turn coursework into practical confidence, stronger projects, and internship-ready evidence.</p></div></section><section class="section-tight"><div class="container resource-grid">${resources.map((resource, index) => `<article class="card"><span class="level-number">${index + 1}</span><h3 style="margin-top:18px">${resource[0]}</h3><p class="muted" style="margin-top:9px">${resource[1]}</p><a class="button button-small" style="margin-top:18px" href="learn.html">Explore</a></article>`).join("")}</div></section><section class="section"><div class="container split"><div><span class="eyebrow">Internship readiness</span><h2>Show your engineering process.</h2><p class="lead" style="margin-top:14px">A strong portfolio explains the problem, constraints, circuit choices, measurements, failures, and final result.</p></div><div class="card"><div class="stack"><div><strong>1. Build</strong><p class="muted">Choose one focused system.</p></div><div><strong>2. Measure</strong><p class="muted">Capture evidence and performance.</p></div><div><strong>3. Document</strong><p class="muted">Explain trade-offs and revisions.</p></div><div><strong>4. Present</strong><p class="muted">Tell a concise engineering story.</p></div></div></div></div></section>`;
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

  function renderLesson() {
    const id = new URLSearchParams(location.search).get("id") || "voltage-current-resistance";
    const lesson = lessonById(id);
    document.title = `${lesson.title} | Electronics Hub`;
    state.lastLesson = lesson.id; saveState();
    const index = allLessons.findIndex((item) => item.id === lesson.id);
    const previous = allLessons[index > 0 ? index - 1 : 0];
    const next = allLessons[index >= 0 && index < allLessons.length - 1 ? index + 1 : Math.min(1, allLessons.length - 1)];
    const complete = state.completed.includes(lesson.id);
    main.innerHTML = `<section class="page-hero"><div class="container"><nav class="breadcrumb"><a href="index.html">Home</a><span>/</span><a href="learn.html">Learn</a><span>/</span><span>Level ${lesson.level}</span></nav><span class="eyebrow">${lesson.levelTitle}</span><h1>${lesson.title}</h1><div class="lesson-meta"><span>${lesson.time} read</span><span>${lesson.difficulty}</span><span>Level ${lesson.level}</span></div></div></section><section class="section-tight"><div class="container lesson-shell"><article class="lesson-content">
      <section class="lesson-block"><div class="question-callout">Why can a tiny resistor determine whether an LED works for years or fails in seconds?</div></section>
      <section class="lesson-block"><h2>The beginner explanation</h2><p>Voltage is the electrical push available to move charge. Current is the rate at which charge moves. Resistance limits that movement. They are connected: changing one affects the others.</p><p>Think of a circuit as a complete path. The source provides energy, components transform or control it, and current returns to the source. Nothing useful happens without that complete loop.</p></section>
      <section class="lesson-block"><h2>See the relationship</h2><div class="diagram" role="img" aria-label="Flow from voltage through resistance to current"><div class="diagram-grid"></div><div class="diagram-flow"><div class="diagram-node">Voltage<br>push</div><div class="diagram-line"></div><div class="diagram-node">Resistance<br>control</div><div class="diagram-line"></div><div class="diagram-node">Current<br>flow</div></div></div></section>
      <section class="lesson-block"><h2>The engineering explanation</h2><p>Ohm's law describes the relationship as V = I × R. In a resistive circuit, current rises when voltage rises and falls when resistance rises. Engineers use this relationship to choose component values, predict operating points, and identify measurements that do not make physical sense.</p><p>Real components also have limits. A resistor dissipates power as heat, described by P = V × I or I²R. Choosing resistance without checking power can produce the correct current but an unreliable design.</p></section>
      <section class="lesson-block"><h2>Where it appears</h2><div class="application-grid"><div class="application"><strong>LED indicators</strong><p class="muted">A resistor keeps current below the LED's safe limit.</p></div><div class="application"><strong>Sensor inputs</strong><p class="muted">Resistors translate changing resistance into measurable voltage.</p></div><div class="application"><strong>Power systems</strong><p class="muted">Voltage drop and heat reveal losses in wires and connections.</p></div></div></section>
      <section class="lesson-block"><h2>Quick check</h2><form class="quiz" id="lesson-quiz"><p><strong>A 10 V source is connected across a 1 kΩ resistor. What current flows?</strong></p><label class="quiz-option"><input type="radio" name="answer" value="wrong"> 1 mA</label><label class="quiz-option"><input type="radio" name="answer" value="correct"> 10 mA</label><label class="quiz-option"><input type="radio" name="answer" value="wrong"> 100 mA</label><button class="button button-secondary" type="submit">Check answer</button><div class="quiz-feedback" id="quiz-feedback" aria-live="polite"></div></form></section>
      <section class="lesson-block"><h2>Key takeaways</h2><ul class="takeaway-list"><li>Voltage provides electrical potential; current describes charge flow.</li><li>Resistance limits current and creates predictable voltage drops.</li><li>Ohm's law links all three quantities: V = I × R.</li><li>Always check power dissipation as well as resistance.</li></ul></section>
      <nav class="lesson-nav" aria-label="Lesson navigation"><a href="lesson.html?id=${previous.id}"><span class="tiny">Previous</span><strong style="display:block">${previous.title}</strong></a><a href="lesson.html?id=${next.id}"><span class="tiny">Next</span><strong style="display:block">${next.title}</strong></a></nav>
      </article><aside class="lesson-aside"><div class="panel sticky-progress"><span class="stat-label">Lesson progress</span><div class="progress-ring" style="--progress:${complete ? 360 : 72}deg;margin:18px auto"><strong>${complete ? 100 : 20}%</strong><span>complete</span></div><button class="button ${complete ? "button-secondary" : "button-primary"}" id="complete-lesson" ${complete ? "disabled" : ""}>${complete ? "Lesson completed" : "Mark lesson complete"}</button><a class="button" href="learn.html" style="width:100%;margin-top:10px">Back to roadmap</a></div></aside></div></section>`;
    bindLesson(lesson);
  }

  function bindLesson(lesson) {
    document.getElementById("lesson-quiz").addEventListener("submit", (event) => {
      event.preventDefault(); const selected = document.querySelector('input[name="answer"]:checked'); const feedback = document.getElementById("quiz-feedback");
      if (!selected) { feedback.textContent = "Choose an answer first."; feedback.style.color = "var(--warning)"; return; }
      if (selected.value === "correct") { feedback.textContent = "Correct. I = V ÷ R = 10 V ÷ 1000 Ω = 0.01 A = 10 mA."; feedback.style.color = "var(--secondary)"; if (!state.quizWins.includes(lesson.id)) { state.quizWins.push(lesson.id); saveState(); showToast("Achievement unlocked: Quiz Ready"); } }
      else { feedback.textContent = "Not quite. Convert the result from amperes to milliamperes and try again."; feedback.style.color = "var(--danger)"; }
    });
    const button = document.getElementById("complete-lesson");
    button.addEventListener("click", () => {
      if (!state.completed.includes(lesson.id)) state.completed.push(lesson.id);
      state.lastLesson = lesson.id; saveState(); button.textContent = "Lesson completed"; button.disabled = true; button.classList.remove("button-primary"); button.classList.add("button-secondary"); showToast("Lesson complete. Progress saved locally.");
    });
  }

  function renderAbout() {
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Our purpose</span><h1>Electronics should feel learnable.</h1><p class="lead">Electronics Hub turns a broad engineering field into a clear path of explanations, measurements, and practical builds.</p></div></section><section class="section"><div class="container split"><div class="stack"><h2>From first principles to working systems.</h2><p class="lead">We teach intuition first, then add the math, engineering constraints, and practical evidence needed to design confidently.</p></div><div class="card"><span class="stat-label">Learning principles</span><div class="stack" style="margin-top:18px"><div><strong>Clarity before complexity</strong><p class="muted">Every advanced idea starts with a useful mental model.</p></div><div><strong>Evidence over guessing</strong><p class="muted">Measurement and simulation are part of learning.</p></div><div><strong>Projects with purpose</strong><p class="muted">Each build develops a specific engineering capability.</p></div></div></div></div></section><section class="section-tight"><div class="container metrics"><div class="metric"><strong>11</strong><span>Connected levels</span></div><div class="metric"><strong>100+</strong><span>Planned lessons</span></div><div class="metric"><strong>50+</strong><span>Project pathways</span></div><div class="metric"><strong>0</strong><span>Accounts required</span></div></div></section>`;
  }

  function renderContact() {
    main.innerHTML = `<section class="page-hero"><div class="container"><span class="eyebrow">Contact</span><h1>Tell us what would help.</h1><p class="lead">Share a correction, suggest a lesson, or tell us which project you want to build next.</p></div></section><section class="section-tight"><div class="container split"><form class="card form-grid" id="contact-form"><div class="form-grid two">${field("contact-name", "Name", "Your name", "text")}${field("contact-email", "Email", "you@example.com", "email")}</div><div class="field"><label for="contact-topic">Topic</label><select id="contact-topic"><option>Content suggestion</option><option>Technical correction</option><option>Project request</option><option>General feedback</option></select></div><div class="field"><label for="contact-message">Message</label><textarea id="contact-message" required placeholder="How can we improve Electronics Hub?"></textarea></div><button class="button button-primary" type="submit">Open email draft</button><p class="tiny">This static site sends no form data to a server. Your email app will open with a prepared draft.</p></form><div class="stack"><div class="card"><span class="stat-label">Email</span><h3 style="margin-top:8px"><a href="mailto:hello@electronicshub.example">hello@electronicshub.example</a></h3></div><div class="card"><span class="stat-label">Response focus</span><p class="muted" style="margin-top:8px">Corrections and accessibility issues receive the highest priority.</p></div></div></div></section>`;
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
