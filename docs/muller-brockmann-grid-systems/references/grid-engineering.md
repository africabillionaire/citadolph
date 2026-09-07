# Grid Engineering

Load this file when the user needs the full engineering spec: CSS variables, subgrid, overlay placement, baseline lock, optical alignment code, and craft defaults.

---

## 2.1 One Source of Truth

Put every grid parameter in `:root` CSS variables:

```css
:root {
  --cols: 12;
  --gutter: 24px;
  --margin: 48px;
  --bl: 8px;
  --lh: 24px;
  --maxw: 1280px;
  --accent: #e4002b;
  --ink: #111;
  --paper: #fff;
}
```

**Content and the overlay both read these same variables.** Never hand-author the overlay separately or it will drift.

---

## 2.2 The Overlay MUST Live in the SAME Content Box as the Content

**Failure mode:** Content sits in a centered `max-width` container while the overlay is a **full-width sibling** of the section. On any viewport wider than `--maxw`, the centered content and the full-width overlay no longer share column positions → "slapped on top / misaligned."

**Fix:** Put `.guides` *inside* the same `.wrap`:

```css
.wrap {
  max-width: var(--maxw);
  margin: 0 auto;
  position: relative;
}
.guides {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: var(--margin) repeat(var(--cols), 1fr) var(--margin);
  column-gap: var(--gutter);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
body.grid-on .guides { opacity: 1; }
```

Draw the column guides with `left/right = var(--margin)` and the **same** `repeat(var(--cols), 1fr)` + `column-gap: var(--gutter)`. Then the overlay columns **are** the content columns at every width. Add left/right margin lines at `var(--margin)`.

---

## 2.3 Place Every Element by Column LINE via Subgrid Bands

Don't eyeball spans. Each horizontal **band** spans all columns and re-exposes them:

```css
.band {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  column-gap: var(--gutter);
  align-items: start;
}

@supports not (grid-template-columns: subgrid) {
  .band {
    grid-template-columns: repeat(var(--cols), 1fr);
  }
}
```

Children place with `grid-column: <startline> / <endline>` (e.g. `1 / 6`, `6 / 13`). Every headline, paragraph, photo, caption now snaps to identical lines.

---

## 2.4 Lock Vertical Rhythm to the Baseline

- Leading = `--lh` (e.g. 24px = 3×8). **Every line-height a multiple of the baseline, in px (not unitless) for display type** — unitless line-heights on large type push the box off the grid.
- Every margin/padding a multiple of the baseline.
- Spread top/bottom padding a multiple too, so content starts on a line.
- **Media heights = multiples of the leading** (e.g. 240/360/432/480px) so a photo's top AND bottom both land on lines.
- Hairline rules sit inside a baseline-height band, not free-floating.

---

## 2.5 The Toggle (Sizzle Within the Sizzle)

A control (button **+ `G` key**) toggles `body.grid-on`; overlay fades 0→1.

Overlay draws:
- Translucent **numbered column fields**
- The **baseline** (major line every `--lh`, faint minor every `--bl`)
- **Margin lines**

Showing the real grid the page is built on IS the demo.

```js
// Toggle wiring
document.addEventListener('keydown', e => {
  if (e.key === 'g' || e.key === 'G') {
    document.body.classList.toggle('grid-on');
  }
});
```

---

## 2.6 OPTICAL ALIGNMENT — Display Ink, Not Its Box

A 180px headline whose layout box is exactly on line 1 still looks misaligned against body text, because the letterform's **ink** is inset by its **left side-bearing**.

**Cure at runtime:**

```js
function alignOptically() {
  const cvs = document.createElement('canvas');
  const ctx = cvs.getContext('2d');
  document.querySelectorAll('.masthead, .numeral, .shead h2, .h2b').forEach(el => {
    el.style.marginLeft = '0px';
    const cs = getComputedStyle(el);
    const ch = (el.textContent || '').trim()[0];
    if (!ch) return;
    if (cs.textTransform === 'uppercase') ch = ch.toUpperCase();
    ctx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    ctx.textAlign = 'left';
    const abl = ctx.measureText(ch).actualBoundingBoxLeft; // +ve = ink overhangs left of box
    if (isFinite(abl)) el.style.marginLeft = abl.toFixed(2) + 'px';
  });
}

// Run after fonts load and on resize
document.fonts.ready.then(alignOptically);
window.addEventListener('resize', alignOptically);
```

Apply to the masthead, big numerals, and section headlines. It scales with fluid type (re-runs on resize) and uses the **actually-loaded** font, so it's correct in the user's browser.

**CRITICAL measurement caveat:** Side-bearing is **font-specific**. If you measure with the wrong font you get the wrong nudge. Headless/sandbox Chrome usually lacks the webfont, so canvas falls back to a different grotesque (measured **−16px on the fallback vs −7px on real Inter** for the same `H`).

To verify optics offline you must **embed the real webfont** via `@font-face` (local TTF). In production the runtime JS measures the loaded font and is correct.
