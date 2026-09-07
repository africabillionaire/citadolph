# Verification Protocol

Load this file when the user needs the Puppeteer harness details, four-check algorithm, common failure modes, or headless Chrome setup.

---

## PART 3 — VERIFY (Don't Trust, Measure)

Render with headless Chrome (Puppeteer) and assert, at **several widths including > and < `--maxw`** (to catch centered-container drift, e.g. 1440 / 1180 / 900):

### Check 1: Column Adherence
Every placed `.band > *` left snaps to a column START and right to a column END (~0px).

**Exclude optically-aligned display elements** from this box check (their box is intentionally side-bearing-offset; they're validated in Check 4).

**Gotcha:** Build BOTH the column-start set and the column-end set. A grid item spanning "to line N" ends at the *far* side of the gutter, so single-edge math falsely reports a one-gutter error.

### Check 2: Overlay Match
Each `.guides .col` rect equals the computed column rect (~0px).

### Check 3: Baseline
Text tops modulo the baseline ≈ 0 (tolerance ≈ half a baseline; the box-top is a proxy — the leading does the real work).

### Check 4: Optical Ink
Each display element's ink-left (box − `actualBoundingBoxLeft`, real font) equals **its own** column line (nearest column-start to its box), not always line 1.

---

## Headless Chrome Setup

Sandbox Chrome flags that work:
```
--headless=new --no-sandbox --disable-gpu --disable-dbus --use-gl=angle --use-angle=swiftshader
```

`file://` works for non-ES-module pages. The CLI `--screenshot` can hang on tall pages — drive via Puppeteer and screenshot per viewport. Read PNGs back with the image-capable Read tool to eyeball a **zoom crop of the top-left corner** (masthead vs body vs column line) — the fastest human check.

A clean run looks like:
```
col=0px overlay=0px baseline≤4px ink=0px → GRID VERIFY: PASS
```

---

## Common Failures & Fixes

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| "Grid overlay misaligned" | Overlay is full-width sibling, not child of `.wrap` | Move `.guides` inside `.wrap` using same grid columns + gap |
| "Headline looks off the grid" | Box is on grid, but ink has side-bearing | Apply optical-alignment JS to display elements |
| "Column adherence error at wide widths" | Centered container vs full-width overlay | Verify `.guides` uses same `repeat(var(--cols),1fr)` inside `.wrap` |
| "Baseline drift on large type" | Unitless line-height on display text | Set `line-height` in px (e.g. `96px`) |
| "Overlay columns don't match content" | Different gap or margin values | Both must read identical CSS custom properties |
| "Ink alignment wrong in headless test" | Headless Chrome lacks webfont, canvas falls back | Embed real webfont via `@font-face` (local TTF) for offline verification |
| "False column-end errors" | Single-edge math doesn't account for gutter width | Build both column-start AND column-end sets for validation |

---

## Environment Variables

- `CHROME` — path to Chrome/Chromium binary
- `PUP` — path to puppeteer-core module

Example:
```bash
CHROME=/usr/bin/chromium PUP=/path/to/puppeteer-core   node scripts/verify_grid.js index.html --widths=1440,1180,900
```
