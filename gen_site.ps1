$ErrorActionPreference = "Stop"
$root = "C:\Users\Lenovo\Documents\Codex\2026-05-15\use-this-as-your-master-build"

function Prefix([int]$depth) {
  if ($depth -le 0) { return "" }
  return ("../" * $depth)
}

function Write-Page {
  param(
    [string]$Relative,
    [string]$Title,
    [string]$Description,
    [int]$Depth,
    [string]$Page,
    [string]$Content,
    [string]$SchemaJson = ""
  )

  $prefix = Prefix $Depth
  $canonical = if ($Relative -eq "index.html") { "/" } else { "/" + (($Relative -replace "\\", "/") -replace "index\.html$", "") }
  if (-not $canonical.EndsWith("/")) { $canonical += "/" }
  $schemaBlock = if ([string]::IsNullOrWhiteSpace($SchemaJson)) { "" } else { "<script type=`"application/ld+json`">$SchemaJson</script>" }

  $html = @"
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$Title | Electronics Hub</title>
  <meta name="description" content="$Description">
  <meta name="robots" content="index,follow">
  <meta property="og:type" content="website">
  <meta property="og:title" content="$Title | Electronics Hub">
  <meta property="og:description" content="$Description">
  <meta property="og:url" content="https://electronicshub.github.io$canonical">
  <meta property="og:image" content="https://electronicshub.github.io/assets/images/chip.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="$Title | Electronics Hub">
  <meta name="twitter:description" content="$Description">
  <meta name="twitter:image" content="https://electronicshub.github.io/assets/images/chip.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${prefix}assets/css/styles.css">
</head>
<body data-depth="$Depth" data-page="$Page">
  <div class="progress-wrap"><div class="reading-progress" data-reading-progress></div></div>
  <header class="site-header">
    <div class="container nav-shell">
      <a class="brand" data-route="home" aria-label="Electronics Hub home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>Electronics Hub</span>
      </a>
      <button class="nav-toggle" data-nav-toggle aria-label="Open navigation">Menu</button>
      <ul class="nav-links" data-menu>
        <li><a class="nav-link" data-route="home" data-nav="home">Home</a></li>
        <li><a class="nav-link" data-route="learn" data-nav="learn">Learn</a></li>
        <li class="dropdown">
          <a class="nav-link drop-toggle" href="#" data-nav="categories">Categories</a>
          <div class="dropdown-menu">
            <a data-route="catInside">Inside the Device</a>
            <a data-route="catCuriosity">Curiosity Lab</a>
            <a data-route="catBuild">Build It Yourself</a>
            <a data-route="catFix">Fix & Troubleshoot</a>
          </div>
        </li>
        <li><a class="nav-link" data-route="career" data-nav="career">Career</a></li>
        <li><a class="nav-link" data-route="about" data-nav="about">About</a></li>
        <li><a class="nav-link" data-route="contact" data-nav="contact">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <form data-site-search aria-label="Site search">
          <input class="input small" type="search" placeholder="Search topics">
        </form>
        <button class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode">Dark</button>
      </div>
    </div>
  </header>

$Content

  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <h3>Electronics Hub</h3>
        <p>Trusted, student-friendly electronics learning platform with practical projects and deep concept guides.</p>
        <p class="small">Copyright <span data-year></span> Electronics Hub. All rights reserved.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul class="footer-links">
          <li><a data-route="about">About</a></li>
          <li><a data-route="contact">Contact</a></li>
          <li><a data-route="learn">Learn</a></li>
          <li><a data-route="categories">Categories</a></li>
        </ul>
      </div>
      <div>
        <h4>Legal</h4>
        <ul class="footer-links">
          <li><a data-route="legalPrivacy">Privacy Policy</a></li>
          <li><a data-route="legalDisclaimer">Disclaimer</a></li>
          <li><a data-route="legalTerms">Terms & Conditions</a></li>
          <li><a data-route="legalCookie">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
  </footer>

  <button class="to-top" data-to-top aria-label="Back to top">▲</button>
  <script src="${prefix}assets/js/main.js" defer></script>
  $schemaBlock
</body>
</html>
"@

  $fullPath = Join-Path $root $Relative
  $dir = Split-Path -Parent $fullPath
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  Set-Content -Path $fullPath -Value $html -Encoding UTF8
}

$topics = @(
  @{ key = "topicElectricity"; slug = "electricity-fundamentals"; title = "Electricity Fundamentals"; desc = "Voltage, current, resistance, power, and safe measurement habits."; icon = "resistor.svg"; level = "Beginner" },
  @{ key = "topicComponents"; slug = "basic-components"; title = "Basic Components"; desc = "Resistors, capacitors, inductors, diodes, and how to choose them correctly."; icon = "capacitor.svg"; level = "Beginner" },
  @{ key = "topicSemiconductor"; slug = "semiconductor"; title = "Semiconductor"; desc = "Band theory, doping, PN junction behavior, and practical device behavior."; icon = "transistor.svg"; level = "Beginner" },
  @{ key = "topicTransistors"; slug = "transistors"; title = "Transistors"; desc = "BJT and MOSFET operation for switching and amplification."; icon = "transistor.svg"; level = "Intermediate" },
  @{ key = "topicAnalog"; slug = "analog-circuit"; title = "Analog Circuit"; desc = "Op-amps, filters, feedback stability, and analog design workflow."; icon = "ic.svg"; level = "Intermediate" },
  @{ key = "topicDigital"; slug = "digital-logic"; title = "Digital Logic"; desc = "Combinational and sequential logic with practical timing insights."; icon = "ic.svg"; level = "Intermediate" },
  @{ key = "topicMCU"; slug = "microprocessors-microcontrollers"; title = "Microprocessors and Microcontrollers"; desc = "Architectures, buses, memory maps, and firmware-centric design."; icon = "microchip.svg"; level = "Intermediate" },
  @{ key = "topicSignal"; slug = "signal-fundamentals"; title = "Signal Fundamentals"; desc = "Time and frequency domain, sampling, noise, and signal integrity basics."; icon = "signal.svg"; level = "Intermediate" },
  @{ key = "topicComm"; slug = "communication-systems"; title = "Communication Systems"; desc = "Modulation, channels, error control, and practical protocols."; icon = "signal.svg"; level = "Advanced" },
  @{ key = "topicAutomation"; slug = "automation-control"; title = "Automation and Control"; desc = "Feedback control, sensors, actuators, and industrial reliability."; icon = "robotics.svg"; level = "Advanced" },
  @{ key = "topicModern"; slug = "modern-electronics"; title = "Modern Electronics"; desc = "IoT, edge AI, low-power design, and connected systems."; icon = "chip.svg"; level = "Advanced" },
  @{ key = "topicAdvanced"; slug = "advanced-electronics"; title = "Advanced Electronics"; desc = "High-speed design, mixed-signal systems, EMC, and optimization."; icon = "pcb.svg"; level = "Advanced" }
)

$categories = @(
  @{ slug = "inside-the-device"; title = "Inside the Device"; summary = "Device teardown and subsystem-level engineering stories."; image = "chip.svg"; badge = "Teardown" },
  @{ slug = "curiosity-lab"; title = "Curiosity Lab"; summary = "Question-driven electronics experiments and concept explainers."; image = "components.svg"; badge = "Concept Lab" },
  @{ slug = "build-it-yourself"; title = "Build It Yourself"; summary = "Hands-on project builds from beginner circuits to integrated systems."; image = "robotics.svg"; badge = "Projects" },
  @{ slug = "fix-troubleshoot"; title = "Fix & Troubleshoot"; summary = "Practical repair and debugging workflows for common electronics issues."; image = "repair.svg"; badge = "Repair" }
)

$homeSchema = '{"@context":"https://schema.org","@type":"BlogPosting","headline":"Master Electronics from Basics to Advanced","description":"Electronics Hub teaches electronics from fundamentals to advanced design through practical articles.","author":{"@type":"Organization","name":"Electronics Hub"},"mainEntityOfPage":{"@type":"WebPage","@id":"https://electronicshub.github.io/"},"image":"https://electronicshub.github.io/assets/images/chip.svg","datePublished":"2026-05-15","dateModified":"2026-05-15"}'

$homeContent = @"
<main>
  <section class="hero">
    <div class="container hero-grid">
      <div class="reveal">
        <span class="badge">Modern Electronics Learning Platform</span>
        <h1>Master Electronics from Basics to Advanced</h1>
        <p>Learn, Build, Repair, and Explore the World of Electronics through clear guides, practical projects, and career-focused roadmaps.</p>
        <div class="hero-cta">
          <a class="btn btn-primary" data-route="learn">Start Learning</a>
          <a class="btn btn-secondary" data-route="categories">Explore Categories</a>
        </div>
      </div>
      <div class="hero-panel circuit-surface reveal">
        <img src="assets/images/chip.svg" alt="Electronics board visual" loading="lazy">
        <div class="hero-node-grid" aria-hidden="true">
          <div class="node"></div><div class="node"></div><div class="node"></div><div class="node"></div>
        </div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <h2 class="section-title">Featured Sections</h2>
      <p class="section-copy">Explore the complete ecosystem of Electronics Hub, from theory-first learning to hands-on repair and career growth.</p>
      <div class="grid grid-3">
        <article class="card reveal"><div class="card-body"><span class="badge">Learning</span><h3>Learn Electronics</h3><p>Structured beginner-to-advanced learning paths with clear milestones.</p><a class="btn btn-secondary" data-route="learn">Open Roadmap</a></div></article>
        <article class="card reveal"><div class="card-body"><span class="badge">Teardown</span><h3>Inside the Device</h3><p>Understand how products are designed, organized, and engineered internally.</p><a class="btn btn-secondary" data-route="catInside">View Category</a></div></article>
        <article class="card reveal"><div class="card-body"><span class="badge">Ideas</span><h3>Curiosity Lab</h3><p>Investigate practical what-if questions and experiment-driven explanations.</p><a class="btn btn-secondary" data-route="catCuriosity">View Category</a></div></article>
        <article class="card reveal"><div class="card-body"><span class="badge">Projects</span><h3>Build It Yourself</h3><p>Build mini circuits and systems with step-by-step breakdowns.</p><a class="btn btn-secondary" data-route="catBuild">View Category</a></div></article>
        <article class="card reveal"><div class="card-body"><span class="badge">Repair</span><h3>Fix & Troubleshoot</h3><p>Trace faults, isolate causes, and restore working conditions safely.</p><a class="btn btn-secondary" data-route="catFix">View Category</a></div></article>
        <article class="card reveal"><div class="card-body"><span class="badge">Career</span><h3>Career Roadmap</h3><p>Grow from student to industry-ready electronics professional.</p><a class="btn btn-secondary" data-route="career">Open Career Page</a></div></article>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <h2 class="section-title">Latest Blog Posts</h2>
      <div class="grid grid-3">
        <article class="card filter-card reveal" data-title="Understanding voltage current power" data-tags="fundamentals basics"><img src="assets/images/signal.svg" alt="Waveform and fundamentals" loading="lazy"><div class="card-body"><span class="badge">Electricity Fundamentals</span><h3>Voltage, Current, and Power Without Confusion</h3><p>Build reliable intuition for the three core quantities that define every circuit.</p><a class="btn btn-secondary" data-route="topicElectricity">Read More</a></div></article>
        <article class="card filter-card reveal" data-title="inside smartphone power path" data-tags="inside-device teardown"><img src="assets/images/pcb.svg" alt="Inside device board" loading="lazy"><div class="card-body"><span class="badge">Inside the Device</span><h3>Inside a Smartphone Power Path</h3><p>Follow charging to regulation and distribution with clear block-level visuals.</p><a class="btn btn-secondary" data-route="catInside">Read More</a></div></article>
        <article class="card filter-card reveal" data-title="fix noisy audio amp" data-tags="repair troubleshooting analog"><img src="assets/images/repair.svg" alt="Repair and troubleshooting" loading="lazy"><div class="card-body"><span class="badge">Fix & Troubleshoot</span><h3>Fixing a Noisy Audio Amplifier</h3><p>Use signal tracing and grounding checks to isolate and eliminate noise sources.</p><a class="btn btn-secondary" data-route="catFix">Read More</a></div></article>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container grid grid-2">
      <article class="card reveal"><div class="card-body"><h2 class="section-title">Popular Topics</h2><p class="section-copy">Fast entry points for learners who want practical value quickly.</p><p><span class="badge">Transistors</span> <span class="badge">Digital Logic</span> <span class="badge">Microcontrollers</span> <span class="badge">IoT</span> <span class="badge">PCB Design</span></p><a class="btn btn-secondary" data-route="learn">Browse All Topics</a></div></article>
      <article class="card reveal"><div class="card-body"><h2 class="section-title">Beginner Roadmap</h2><p class="section-copy">Follow this order for confident progress.</p><ol><li>Start with electricity fundamentals and components.</li><li>Move to semiconductor devices and transistor operation.</li><li>Advance into digital logic, microcontrollers, and modern systems.</li></ol><a class="btn btn-secondary" data-route="topicElectricity">Start at Step 1</a></div></article>
    </div>
  </section>
  <section class="section">
    <div class="container newsletter-box circuit-surface reveal">
      <h2 class="section-title">Newsletter Signup</h2>
      <p class="section-copy">Get weekly electronics learning packs, project ideas, and internship-focused tips.</p>
      <form class="newsletter-form" aria-label="Newsletter form"><input class="input" type="email" placeholder="Enter your email" required><button class="btn btn-primary" type="submit">Join Newsletter</button></form>
      <p class="small" data-newsletter-note></p>
    </div>
  </section>
</main>
"@

Write-Page -Relative "index.html" -Title "Home" -Description "Electronics Hub helps students and enthusiasts master electronics from basics to advanced through practical guides." -Depth 0 -Page "home" -Content $homeContent -SchemaJson $homeSchema

$roadSteps = ($topics | ForEach-Object {
@"
<article class="road-step circuit-surface reveal">
  <div class="icon-row"><img src="../assets/images/$($_.icon)" alt="$($_.title) icon"><span class="badge">$($_.level)</span></div>
  <h3>$($_.title)</h3>
  <p>$($_.desc)</p>
  <a class="btn btn-secondary" data-route="$($_.key)">Read Articles</a>
</article>
"@
}) -join "`n"

$learnContent = @"
<main>
  <section class="hero"><div class="container text-center reveal"><span class="badge">Structured Learning Path</span><h1>Learn Electronics Step by Step</h1><p class="section-copy">This roadmap takes you from first principles to modern and advanced electronics without overwhelming jumps.</p></div></section>
  <section class="section"><div class="container topic-roadmap">$roadSteps</div></section>
  <section class="section"><div class="container grid grid-2"><article class="card reveal"><div class="card-body"><h2 class="section-title">How to Use This Roadmap</h2><p>Complete each topic in sequence, build one small project per milestone, and keep a circuit journal to retain key lessons.</p></div></article><article class="card reveal"><div class="card-body"><h2 class="section-title">Practice Recommendation</h2><p>For every concept article, spend at least 30 minutes implementing or simulating one circuit so theory turns into intuition.</p></div></article></div></section>
</main>
"@

Write-Page -Relative "learn/index.html" -Title "Learn" -Description "Follow a beginner-to-advanced electronics learning roadmap with structured topic pages." -Depth 1 -Page "learn" -Content $learnContent

$categoriesHomeContent = @"
<main>
  <section class="hero"><div class="container reveal"><span class="badge">Explore by Interest</span><h1>Electronics Categories</h1><p class="section-copy">Choose a category and dive into article collections designed for curiosity, projects, repair, and real-world understanding.</p></div></section>
  <section class="section"><div class="container grid grid-4">
    <article class="card reveal"><img src="../assets/images/chip.svg" alt="Inside the Device" loading="lazy"><div class="card-body"><span class="badge">Teardown</span><h3>Inside the Device</h3><p>Learn architecture and subsystem-level design inside modern products.</p><a class="btn btn-secondary" data-route="catInside">Open</a></div></article>
    <article class="card reveal"><img src="../assets/images/components.svg" alt="Curiosity Lab" loading="lazy"><div class="card-body"><span class="badge">Concept Lab</span><h3>Curiosity Lab</h3><p>Answer practical what-if questions with experiments and concept stories.</p><a class="btn btn-secondary" data-route="catCuriosity">Open</a></div></article>
    <article class="card reveal"><img src="../assets/images/robotics.svg" alt="Build It Yourself" loading="lazy"><div class="card-body"><span class="badge">Projects</span><h3>Build It Yourself</h3><p>From blinking LEDs to control systems, build projects in guided stages.</p><a class="btn btn-secondary" data-route="catBuild">Open</a></div></article>
    <article class="card reveal"><img src="../assets/images/repair.svg" alt="Fix and Troubleshoot" loading="lazy"><div class="card-body"><span class="badge">Repair</span><h3>Fix & Troubleshoot</h3><p>Diagnose faults with structured checklists and practical measurement flow.</p><a class="btn btn-secondary" data-route="catFix">Open</a></div></article>
  </div></section>
</main>
"@

Write-Page -Relative "categories/index.html" -Title "Categories" -Description "Browse Electronics Hub categories including teardown, projects, curiosity, and troubleshooting." -Depth 1 -Page "categories" -Content $categoriesHomeContent

$careerContent = @"
<main>
  <section class="hero"><div class="container reveal"><span class="badge">Career Guidance</span><h1>Career Roadmap for Electronics and ECE Students</h1><p class="section-copy">Plan your four years, build high-impact projects, and align your skills with embedded, VLSI, IoT, robotics, and PCB opportunities.</p></div></section>
  <section class="section"><div class="container grid grid-2">
    <article class="card reveal"><div class="card-body"><h2 class="section-title">ECE Student Roadmap</h2><p>Build strong fundamentals in years 1-2, then specialize through domain projects, internships, and portfolio outcomes in years 3-4.</p></div></article>
    <article class="card reveal"><div class="card-body"><h2 class="section-title">Skills by Year (1st to 4th Year)</h2><p><strong>1st Year:</strong> circuit basics. <strong>2nd Year:</strong> analog/digital design. <strong>3rd Year:</strong> embedded and communication systems. <strong>4th Year:</strong> specialization and placement readiness.</p></div></article>
    <article class="card reveal"><div class="card-body"><h3>Embedded Systems</h3><p>Firmware architecture, real-time constraints, and board-level debugging.</p></div></article>
    <article class="card reveal"><div class="card-body"><h3>VLSI</h3><p>Digital design flow, timing closure basics, and verification mindset.</p></div></article>
    <article class="card reveal"><div class="card-body"><h3>IoT</h3><p>Sensor integration, wireless communication stacks, and cloud handshakes.</p></div></article>
    <article class="card reveal"><div class="card-body"><h3>Robotics</h3><p>Perception-control integration with actuator and power reliability focus.</p></div></article>
    <article class="card reveal"><div class="card-body"><h3>PCB Design</h3><p>Schematic capture, layer planning, routing, and DFM-aware handoff.</p></div></article>
    <article class="card reveal"><div class="card-body"><h3>Industry Tools</h3><p>LTspice, KiCad, MATLAB, Altium, Git, oscilloscopes, and logic analyzers.</p></div></article>
  </div></section>
  <section class="section"><div class="container grid grid-2">
    <article class="card reveal"><div class="card-body"><h2 class="section-title">Downloadable Roadmap</h2><p>Download a printable semester-by-semester checklist for projects, certifications, and interview preparation.</p><a class="btn btn-primary" href="#" aria-label="Download career roadmap">Download PDF Roadmap</a></div></article>
    <article class="card reveal"><div class="card-body"><h2 class="section-title">Internship Guidance</h2><p>Pick domain-focused internships, document measurable outcomes, and convert work into resume-ready portfolio proof.</p><p class="small">Career blog feed: firmware internship playbook, resume teardown, interview problem sets, and project storytelling.</p></div></article>
  </div></section>
  <section class="section"><div class="container card reveal"><div class="card-body"><h2 class="section-title">Resume Tips and Certifications</h2><p>Highlight measurable project outcomes, avoid generic responsibilities, and map each line to job requirements. Useful certifications include embedded systems, PCB design, industrial automation, and electronics manufacturing quality.</p></div></div></section>
</main>
"@

Write-Page -Relative "career/index.html" -Title "Career" -Description "Career roadmap for electronics students with skills by year, specialization tracks, certifications, and internship guidance." -Depth 1 -Page "career" -Content $careerContent

$aboutContent = @"
<main><section class="hero"><div class="container reveal"><span class="badge">About Electronics Hub</span><h1>Mission-Driven Electronics Education</h1><p class="section-copy">Electronics Hub exists to make electronics easier to learn, practice, and apply for beginners, students, and curious enthusiasts.</p></div></section><section class="section"><div class="container grid grid-2"><article class="card reveal"><div class="card-body"><h2 class="section-title">Why This Platform Exists</h2><p>Many learners get lost between theory-heavy textbooks and project-only tutorials. Electronics Hub bridges that gap with structured learning plus practical implementation.</p></div></article><article class="card reveal"><div class="card-body"><h2 class="section-title">Our Focus</h2><p>We focus on practical electronics and deep understanding: not just what to connect, but why the circuit behaves that way under real conditions.</p></div></article><article class="card reveal"><div class="card-body"><h3>Who We Help</h3><p>Beginners, ECE students, self-learners, and professionals upskilling into embedded and hardware roles.</p></div></article><article class="card reveal"><div class="card-body"><h3>Learning Philosophy</h3><p>Clear concept-first explanations, repeatable troubleshooting methods, and confidence through hands-on practice.</p></div></article></div></section></main>
"@

Write-Page -Relative "about/index.html" -Title "About" -Description "Learn the mission behind Electronics Hub and how it helps students and enthusiasts master practical electronics." -Depth 1 -Page "about" -Content $aboutContent

$contactContent = @"
<main><section class="hero"><div class="container reveal"><span class="badge">Contact</span><h1>Talk to Electronics Hub</h1><p class="section-copy">Share your feedback, collaboration ideas, or topic requests. We read every message.</p></div></section><section class="section"><div class="container contact-grid grid grid-2"><article class="card reveal"><div class="card-body"><h2 class="section-title">Contact Form</h2><form aria-label="Contact form"><input class="input" type="text" placeholder="Your name" required><input class="input" type="email" placeholder="Your email" required><input class="input" type="text" placeholder="Subject" required><textarea class="textarea" placeholder="Your message" required></textarea><button class="btn btn-primary" type="submit">Send Message</button></form><p class="small">Static form design for GitHub Pages. Email placeholder: hello@electronicshub.com</p></div></article><article class="card reveal"><div class="card-body"><h2 class="section-title">Social and FAQ</h2><p>Email: <a href="mailto:hello@electronicshub.com">hello@electronicshub.com</a></p><p>Social: <a href="#">LinkedIn</a> | <a href="#">YouTube</a> | <a href="#">GitHub</a></p><h3>FAQ Snippet</h3><p><strong>Can beginners start here?</strong><br>Yes, start with the Learn roadmap and follow the beginner sequence.</p><p><strong>Are projects beginner-friendly?</strong><br>Each project includes difficulty tags and expected prerequisites.</p></div></article></div></section></main>
"@

Write-Page -Relative "contact/index.html" -Title "Contact" -Description "Contact Electronics Hub for feedback, topic requests, and collaboration." -Depth 1 -Page "contact" -Content $contactContent

$privacyContent = '<main><section class="section"><div class="container card reveal"><div class="card-body"><h1>Privacy Policy</h1><p>Electronics Hub respects your privacy. We collect minimal data for analytics and communication only. No personal data is sold. Newsletter emails are used only for learning updates, and you can unsubscribe anytime.</p><p>For questions, contact hello@electronicshub.com.</p></div></div></section></main>'
$disclaimerContent = '<main><section class="section"><div class="container card reveal"><div class="card-body"><h1>Disclaimer</h1><p>All content is for educational purposes. Always follow electrical safety practices and manufacturer guidance before repairs or modifications. Electronics Hub is not liable for damage, loss, or injury from misuse of information.</p><p>For questions, contact hello@electronicshub.com.</p></div></div></section></main>'
$termsContent = '<main><section class="section"><div class="container card reveal"><div class="card-body"><h1>Terms & Conditions</h1><p>By using Electronics Hub, you agree to lawful and responsible use. Content may be updated without notice. Reproduction of content requires prior permission.</p><p>For questions, contact hello@electronicshub.com.</p></div></div></section></main>'
$cookieContent = '<main><section class="section"><div class="container card reveal"><div class="card-body"><h1>Cookie Policy</h1><p>Electronics Hub uses essential cookies and optional analytics cookies to improve performance and content quality. You can manage cookies through your browser settings.</p><p>For questions, contact hello@electronicshub.com.</p></div></div></section></main>'

Write-Page -Relative "legal/privacy-policy/index.html" -Title "Privacy Policy" -Description "Privacy policy for Electronics Hub." -Depth 2 -Page "legal" -Content $privacyContent
Write-Page -Relative "legal/disclaimer/index.html" -Title "Disclaimer" -Description "Disclaimer for Electronics Hub." -Depth 2 -Page "legal" -Content $disclaimerContent
Write-Page -Relative "legal/terms-conditions/index.html" -Title "Terms & Conditions" -Description "Terms and conditions for Electronics Hub." -Depth 2 -Page "legal" -Content $termsContent
Write-Page -Relative "legal/cookie-policy/index.html" -Title "Cookie Policy" -Description "Cookie policy for Electronics Hub." -Depth 2 -Page "legal" -Content $cookieContent

foreach ($cat in $categories) {
  $catSchema = '{"@context":"https://schema.org","@type":"BlogPosting","headline":"' + $cat.title + '","description":"' + $cat.summary + '","author":{"@type":"Organization","name":"Electronics Hub"},"datePublished":"2026-05-15"}'
  $catContent = @"
<main>
  <section class="hero"><div class="container hero-grid"><div class="reveal"><div class="breadcrumb"><a data-route="home">Home</a> / <a data-route="categories">Categories</a> / <span>$($cat.title)</span></div><span class="badge">$($cat.badge)</span><h1>$($cat.title)</h1><p>$($cat.summary)</p></div><div class="card reveal"><img src="../../assets/images/$($cat.image)" alt="$($cat.title) banner" loading="lazy"></div></div></section>
  <section class="section"><div class="container page-layout"><div>
    <div class="search-wrap" data-filter-group="posts-grid-$($cat.slug)"><input class="search-input" type="search" placeholder="Search articles in $($cat.title)" data-search><select class="select-input" data-filter><option value="all">All levels</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>
    <div class="grid grid-2" id="posts-grid-$($cat.slug)">
      <article class="card filter-card reveal" data-title="$($cat.title) basics" data-tags="beginner fundamentals"><img src="../../assets/images/signal.svg" alt="Article visual" loading="lazy"><div class="card-body"><span class="badge">Beginner</span><h3>$($cat.title): Foundations You Should Not Skip</h3><p>The core concepts and checkpoints every learner should understand first.</p><a class="btn btn-secondary" data-route="topicElectricity">Read More</a></div></article>
      <article class="card filter-card reveal" data-title="$($cat.title) workflow" data-tags="intermediate practical"><img src="../../assets/images/pcb.svg" alt="Article visual" loading="lazy"><div class="card-body"><span class="badge">Intermediate</span><h3>$($cat.title): Real-World Workflow</h3><p>A practical process from problem framing to measurement-driven decisions.</p><a class="btn btn-secondary" data-route="topicDigital">Read More</a></div></article>
      <article class="card filter-card reveal" data-title="$($cat.title) design" data-tags="advanced design"><img src="../../assets/images/chip.svg" alt="Article visual" loading="lazy"><div class="card-body"><span class="badge">Advanced</span><h3>$($cat.title): Advanced Design Considerations</h3><p>Tradeoffs, reliability concerns, and scaling strategies for complex systems.</p><a class="btn btn-secondary" data-route="topicAdvanced">Read More</a></div></article>
      <article class="card filter-card reveal" data-title="$($cat.title) checklist" data-tags="beginner checklist"><img src="../../assets/images/components.svg" alt="Article visual" loading="lazy"><div class="card-body"><span class="badge">Beginner</span><h3>$($cat.title): Quick Checklist</h3><p>Use this checklist before starting your next article, project, or repair task.</p><a class="btn btn-secondary" data-route="learn">Read More</a></div></article>
    </div>
    <article class="card reveal" style="margin-top:1.2rem;"><div class="card-body"><h3>Related Posts</h3><div class="share-row"><button class="icon-btn" data-share="x" type="button">Share on X</button><button class="icon-btn" data-share="linkedin" type="button">Share on LinkedIn</button><button class="icon-btn" data-share="copy" type="button">Copy Link</button></div></div></article>
  </div><aside class="sidebar reveal"><h3>Latest Posts</h3><ul class="sidebar-list"><li><a data-route="topicComponents">Component Selection for Reliability</a></li><li><a data-route="topicMCU">Microcontroller Clocking Pitfalls</a></li><li><a data-route="topicSignal">Noise vs Signal Integrity Basics</a></li><li><a data-route="topicAutomation">Control Loop Tuning Essentials</a></li></ul></aside></div></section>
</main>
"@
  Write-Page -Relative ("categories/" + $cat.slug + "/index.html") -Title $cat.title -Description $cat.summary -Depth 2 -Page "categories" -Content $catContent -SchemaJson $catSchema
}

foreach ($topic in $topics) {
  $topicSchema = '{"@context":"https://schema.org","@type":"BlogPosting","headline":"' + $topic.title + '","description":"' + $topic.desc + '","author":{"@type":"Organization","name":"Electronics Hub"},"datePublished":"2026-05-15"}'
  $topicContent = @"
<main>
  <section class="hero"><div class="container hero-grid"><div class="reveal"><div class="breadcrumb"><a data-route="home">Home</a> / <a data-route="learn">Learn</a> / <span>$($topic.title)</span></div><span class="badge">$($topic.level)</span><h1>$($topic.title)</h1><p>$($topic.desc)</p></div><div class="card reveal"><img src="../../assets/images/chip.svg" alt="$($topic.title) banner" loading="lazy"></div></div></section>
  <section class="section"><div class="container"><div class="search-wrap" data-filter-group="posts-grid-$($topic.slug)"><input class="search-input" type="search" placeholder="Search in $($topic.title)" data-search><select class="select-input" data-filter><option value="all">All articles</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>
    <div class="grid grid-3" id="posts-grid-$($topic.slug)">
      <article class="card filter-card reveal" data-title="$($topic.title) core concept" data-tags="beginner concept"><img src="../../assets/images/signal.svg" alt="Core concept" loading="lazy"><div class="card-body"><span class="badge">Beginner</span><h3>$($topic.title): Core Concept Deep Dive</h3><p>Build an accurate mental model using simplified but precise explanations.</p><a class="btn btn-secondary" href="#">Read More</a></div></article>
      <article class="card filter-card reveal" data-title="$($topic.title) practical guide" data-tags="intermediate practical"><img src="../../assets/images/pcb.svg" alt="Practical guide" loading="lazy"><div class="card-body"><span class="badge">Intermediate</span><h3>$($topic.title): Practical Circuit Workflow</h3><p>Apply theory with step-by-step design and measurement checkpoints.</p><a class="btn btn-secondary" href="#">Read More</a></div></article>
      <article class="card filter-card reveal" data-title="$($topic.title) advanced tradeoffs" data-tags="advanced design"><img src="../../assets/images/chip.svg" alt="Advanced design" loading="lazy"><div class="card-body"><span class="badge">Advanced</span><h3>$($topic.title): Advanced Tradeoffs and Optimization</h3><p>Evaluate performance, cost, noise, and reliability in real-world constraints.</p><a class="btn btn-secondary" href="#">Read More</a></div></article>
    </div>
  </div></section>
  <section class="section"><div class="container grid grid-2"><article class="card reveal"><div class="card-body"><h3>Related Posts</h3><p>Continue learning with adjacent topics to strengthen system-level understanding.</p><p><a data-route="topicComponents">Basic Components</a> | <a data-route="topicTransistors">Transistors</a> | <a data-route="topicMCU">Microcontrollers</a></p></div></article><article class="card reveal"><div class="card-body"><h3>Share This Topic</h3><div class="share-row"><button class="icon-btn" data-share="x" type="button">Share on X</button><button class="icon-btn" data-share="linkedin" type="button">Share on LinkedIn</button><button class="icon-btn" data-share="copy" type="button">Copy Link</button></div></div></article></div></section>
</main>
"@
  Write-Page -Relative ("learn/" + $topic.slug + "/index.html") -Title $topic.title -Description $topic.desc -Depth 2 -Page "learn" -Content $topicContent -SchemaJson $topicSchema
}

$allUrls = @(
  "",
  "learn/",
  "categories/",
  "categories/inside-the-device/",
  "categories/curiosity-lab/",
  "categories/build-it-yourself/",
  "categories/fix-troubleshoot/",
  "career/",
  "about/",
  "contact/",
  "legal/privacy-policy/",
  "legal/disclaimer/",
  "legal/terms-conditions/",
  "legal/cookie-policy/"
)
$allUrls += $topics | ForEach-Object { "learn/" + $_.slug + "/" }

$entries = ($allUrls | ForEach-Object { "  <url><loc>https://electronicshub.github.io/$($_)</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>" }) -join "`n"
$sitemap = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
$entries
</urlset>
"@
Set-Content -Path (Join-Path $root "sitemap.xml") -Value $sitemap -Encoding UTF8

$robots = @"
User-agent: *
Allow: /
Sitemap: https://electronicshub.github.io/sitemap.xml
"@
Set-Content -Path (Join-Path $root "robots.txt") -Value $robots -Encoding UTF8
