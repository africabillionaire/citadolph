---
name: muller-brockmann-grid-systems
description: >-
  Build editorial/magazine/report webpages on a genuine Müller-Brockmann modular
  grid (International Typographic Style). Covers grid discipline, subgrid bands,
  baseline-locked vertical rhythm, optical alignment for display type, an
  interactive grid-toggle overlay, and a Puppeteer verification harness. Trigger
  when the user asks for Swiss/International Typographic Style layouts, magazine
  spreads, grid overlays, baseline grids, or rigorous editorial web design.
---

# Müller-Brockmann Grid Systems — built real, visible, and verified

> **"The grid system is an aid, not a guarantee. It permits a number of possible uses and each designer can look for a solution appropriate to his personal style. But one must learn how to use the grid; it is an art that requires practice."** — Josef Müller-Brockmann

A grid you can't toggle on and measure is a mood board, not a system. This skill encodes the discipline AND the load-bearing front-end engineering to make the grid real, visible, and verifiable at 0px.

---

## 1. Trigger Map — When to Activate What

| User Request | Activate Workflow | Load Reference / Script |
|-------------|-------------------|------------------------|
| "Build a magazine page" / "Swiss grid" / "Editorial layout" | A: Scaffold & Grid Setup | `scripts/grid_tokens.py` + `references/grid-engineering.md` |
| "Show the grid / grid overlay toggle" / "Baseline grid" | A: Scaffold & Grid Setup | `references/grid-engineering.md` |
| "Align display type to grid" / "Headlines look off" | B: Optical Alignment Fix | `references/grid-engineering.md` §2.6 |
| "Verify the grid" / "Prove alignment" / "Test layout" | C: Verify & Debug | `scripts/verify_grid.js` + `references/verification-protocol.md` |
| "Explain the discipline" / "Swiss design principles" | — | `references/discipline-and-aesthetics.md` |
| "Why is my overlay misaligned?" / "Grid drift" | C: Verify & Debug | `references/verification-protocol.md` §Common Failures |

**Default stance:** The overlay lives in the SAME content box as the content. Box-on-grid ≠ ink-on-grid. One CSS-variable source of truth. No blue/purple gradients, no warm-cream Claude look.

---

## 2. Workflow A: Scaffold & Grid Setup

**Goal:** Emit a single-file HTML scaffold with a real, toggleable, verifiable grid.

### Step 1 — Generate the Scaffold
Run `python3 scripts/grid_tokens.py --scaffold` to emit a complete page. Override defaults:
```bash
python3 scripts/grid_tokens.py --scaffold   --cols=12 --baseline=8 --gutter=24 --margin=48 --maxw=1280 --accent="#e4002b"
```
The script warns if gutter or margin are not multiples of the baseline.

### Step 2 — One Source of Truth
Verify the generated `:root` block contains ALL grid parameters:
```css
:root {
  --cols: 12; --gutter: 24px; --margin: 48px;
  --bl: 8px; --lh: 24px; --maxw: 1280px;
  --accent: #e4002b; --ink: #111; --paper: #fff;
}
```
**Rule:** Content AND overlay MUST read these same variables. Never hand-author the overlay separately.

### Step 3 — The Overlay Must Live Inside the Content Box
**Failure mode:** Overlay is a full-width sibling of a centered `.wrap` → drift on wide viewports.
**Fix:** `.guides` is a child of `.wrap`, drawing columns with the same `repeat(var(--cols),1fr)` + `column-gap:var(--gutter)` and margin lines at `var(--margin)`.

### Step 4 — Subgrid Bands
Every horizontal band spans all columns and re-exposes them:
```css
.band {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  column-gap: var(--gutter);
  align-items: start;
}
```
Children place by LINE: `grid-column: 1 / 6;` or `grid-column: 6 / 13;`.

### Step 5 — Baseline Lock
- Leading `--lh` must be a multiple of `--bl` (e.g. 24px = 3×8px).
- **Display type line-height in px**, not unitless — unitless values push the box off the grid at large sizes.
- Every margin, padding, and media height is a multiple of `--lh`.
- Hairline rules sit inside a `--lh`-height band.

### Step 6 — Toggle Wiring
The scaffold includes a `G` key + button toggle that adds/removes `body.grid-on`. The overlay fades `opacity: 0 → 1` and draws:
- Translucent numbered column fields
- Major baseline every `--lh`, faint minor every `--bl`
- Margin lines at `var(--margin)`

---

## 3. Workflow B: Build Editorial Spreads

**Goal:** Compose magazine spreads where every element snaps to a column line and baseline.

### Layout Rules
- **Full-width sections**, each its own `.grid` + `.guides` inside `.wrap`.
- **Consistent margins and folios** per spread.
- **Asymmetric compositions** held in tension by the grid — generous white space is intentional.

### Typography Rules
- **Grotesque sans:** Inter, Helvetica Now, or Archivo. Mono (Space Mono / IBM Plex Mono) for folios and captions.
- **Flush-left, ragged-right.**
- **Hierarchy through scale + weight + white space**, not color.
- **Big numerals/data** set large is a signature move.
- **Kicker labels** in mono caps.

### Palette Rules
- Paper `#fff`, ink `#111`, one accent (Swiss red `#e4002b` canonical).
- **Never** warm-cream "Claude look." **Never** blue/purple gradients.

### Media Rules
- Photo heights = multiples of `--lh` (240/360/432/480px) so top AND bottom land on lines.
- Real photography; ground real subjects in real photos.

---

## 4. Workflow C: Verify & Debug

**Goal:** Prove 0px adherence at multiple widths, including above and below `--maxw`.

### Step 1 — Run the Harness
```bash
CHROME=/usr/bin/chromium PUP=/path/to/puppeteer-core   node scripts/verify_grid.js <file-or-url> --widths=1440,1180,900
```

### Step 2 — Read the Report
A clean run prints:
```
width=1440  col=0px  overlay=0px  baseline≤4px  ink=0px  → PASS
width=1180  col=0px  overlay=0px  baseline≤4px  ink=0px  → PASS
width=900   col=0px  overlay=0px  baseline≤4px  ink=0px  → PASS
GRID VERIFY: PASS
```

### Step 3 — Fix Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| "Grid overlay misaligned" | Overlay is full-width sibling, not child of `.wrap` | Move `.guides` inside `.wrap` (§2.2) |
| "Headline looks off the grid" | Box is on grid, but ink has side-bearing | Apply optical-alignment JS to display elements (§2.6) |
| "Column adherence error at wide widths" | Centered container vs full-width overlay | Verify `.guides` uses same `repeat(var(--cols),1fr)` inside `.wrap` |
| "Baseline drift on large type" | Unitless line-height on display text | Set `line-height` in px (e.g. `96px`) |
| "Overlay columns don't match content" | Different gap or margin values | Both must read identical CSS custom properties |
| "Ink alignment wrong in headless test" | Headless Chrome lacks the webfont, canvas falls back | Embed the real webfont via `@font-face` (local TTF) for offline verification |

### Step 4 — Eyeball Check
Screenshot a **zoom crop of the top-left corner** (masthead vs body vs column line). The fastest human verification.

---

## 5. Principle Quick-Reference Toolkit

| Principle | Tactical Command | Common Failure |
|-----------|------------------|----------------|
| **One source of truth** | All grid params in `:root` CSS variables; content + overlay read the same vars. | Hand-authored overlay drifts from content. |
| **Same content box** | `.guides` is a child of `.wrap`, not a sibling of the section. | "Slapped on top / misaligned" on wide viewports. |
| **Subgrid bands** | Each `.band` spans `1 / -1` and re-exposes columns via `subgrid`. | Eyeball spans; elements don't snap to lines. |
| **Baseline lock** | Leading = multiple of `--bl`; margins/padding/media heights = multiples of `--lh`. | Unitless line-heights on display type push boxes off grid. |
| **Optical alignment** | Runtime JS measures `actualBoundingBoxLeft` and shifts box so INK lands on the line. | Box-on-grid looks correct to dev tools but wrong to the eye. |
| **Flush-left rag-right** | All body text aligns to the left; right edge is irregular. | Justified text violates the Swiss editorial register. |
| **Scale hierarchy** | Few sizes, large jumps; big numerals as display elements. | Too many sizes create noise, not hierarchy. |
| **Restrained palette** | White, near-black, one accent (red canonical). No gradients. | Warm cream or blue/purple gradients break the ethic. |

---

## 6. File & Asset Map

| File | When to Load |
|------|-------------|
| `references/discipline-and-aesthetics.md` | User asks for Swiss/International Typographic Style history, design principles, palette rules, or typography discipline. |
| `references/grid-engineering.md` | User needs the full engineering spec: CSS variables, subgrid, overlay placement, baseline lock, optical alignment code, and craft defaults. |
| `references/verification-protocol.md` | User needs the Puppeteer harness details, four-check algorithm, common failure modes, or headless Chrome setup. |
| `scripts/grid_tokens.py` | User needs to generate a scaffold. Run with `--scaffold` for a full page; override `--cols`, `--baseline`, `--gutter`, `--margin`, `--maxw`, `--accent`. |
| `scripts/verify_grid.js` | User needs to verify alignment. Run with `CHROME=` and `PUP=` env vars; `--widths` for multi-viewport testing. |
| `assets/minimal-scaffold.html` | A pre-generated minimal working example for reference or rapid prototyping. |
