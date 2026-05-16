# Blog Folder Structure

This folder is organized so you can quickly post and track articles by learning stream.

## 1) Roadmap Topics

`blog/roadmap-topics/`

- `electricity-fundamentals/`
- `basic-components/`
- `semiconductor/`
- `transistors/`
- `analog-circuit/`
- `digital-logic/`
- `microprocessors-microcontrollers/`
- `signal-fundamentals/`
- `communication-systems/`
- `automation-control/`
- `modern-electronics/`
- `advanced-electronics/`

## 2) Category Dropdown

`blog/categories/`

- `inside-the-device/`
- `curiosity-lab/`
- `build-it-yourself/`
- `fix-troubleshoot/`

## 3) Career

`blog/career/`

- `ece-student-roadmap/`
- `skills-by-year/`
- `embedded-systems/`
- `vlsi/`
- `iot/`
- `robotics/`
- `pcb-design/`
- `resume-tips/`
- `certifications/`
- `industry-tools/`
- `internship-guidance/`
- `career-blog-feed/`

## Existing Article

- `blog/roadmap-topics/electricity-fundamentals/electricity-fundamentals-core-concept-deep-dive.html` (active path)
- `blog/electricity-fundamentals-core-concept-deep-dive/index.html` (legacy copy)
- `blog/roadmap-topics/electricity-fundamentals/core-concept-deep-dive/index.html` (legacy copy)

Use one folder per article slug:

`blog/<section>/<topic>/<article-slug>/index.html`

## Quick Template Workflow

Template file:

- `blog/_templates/blog-post-template.html`

Recommended file path style (your current preference):

- `blog/roadmap-topics/<topic>/<article-slug>.html`
- `blog/categories/<category>/<article-slug>.html`
- `blog/career/<track>/<article-slug>.html`

Steps:

1. Copy template into the target folder.
2. Rename file using your article slug.
3. Replace all placeholder tokens like `ARTICLE_TITLE`, `ARTICLE_CANONICAL_URL`, and `CORE_CONCEPT_1`.
4. Keep TOC links (`href="#..."`) matching section IDs (`id="..."`).
5. Add the article URL to `sitemap.xml`.
6. If you want a card button to open this article, add or update a route key in `assets/js/main.js` and set `data-route` on that button.
