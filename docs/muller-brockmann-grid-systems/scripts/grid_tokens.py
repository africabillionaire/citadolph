#!/usr/bin/env python3
"""
grid_tokens.py — Müller-Brockmann scaffold generator
Emits a :root token block, subgrid band scaffold, overlay CSS,
toggle JS, and optical-alignment JS — all wired to one source of truth.

Usage:
  python3 grid_tokens.py --scaffold > page.html
  python3 grid_tokens.py --cols=12 --baseline=8 --gutter=24 --margin=48 --maxw=1280 --accent="#e4002b" > tokens.css
"""

import argparse
import sys

DEFAULTS = {
    "cols": 12,
    "baseline": 8,
    "gutter": 24,
    "margin": 48,
    "maxw": 1280,
    "accent": "#e4002b",
    "ink": "#111",
    "paper": "#fff",
}


def warn(msg: str):
    print(f"/* WARNING: {msg} */", file=sys.stderr)


def generate_css(args) -> str:
    bl = args.baseline
    gutter = args.gutter
    margin = args.margin
    lh = bl * 3  # default leading = 3× baseline

    if gutter % bl != 0:
        warn(f"gutter ({gutter}px) is not a multiple of baseline ({bl}px). Baseline lock may drift.")
    if margin % bl != 0:
        warn(f"margin ({margin}px) is not a multiple of baseline ({bl}px). Edge alignment may drift.")

    css = f"""/* Müller-Brockmann Grid Tokens — one source of truth */
:root {{
  --cols: {args.cols};
  --gutter: {gutter}px;
  --margin: {margin}px;
  --bl: {bl}px;
  --lh: {lh}px;
  --maxw: {args.maxw}px;
  --accent: {args.accent};
  --ink: {args.ink};
  --paper: {args.paper};
}}

/* Grid container */
.grid {{
  display: grid;
  grid-template-columns: var(--margin) repeat(var(--cols), 1fr) var(--margin);
  column-gap: var(--gutter);
  max-width: var(--maxw);
  margin: 0 auto;
  position: relative;
}}

/* Subgrid band — spans full width, re-exposes columns */
.band {{
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  column-gap: var(--gutter);
  align-items: start;
}}

@supports not (grid-template-columns: subgrid) {{
  .band {{
    grid-template-columns: repeat(var(--cols), 1fr);
  }}
}}

/* Overlay — lives INSIDE the same .grid container */
.guides {{
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: var(--margin) repeat(var(--cols), 1fr) var(--margin);
  column-gap: var(--gutter);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 9999;
}}

body.grid-on .guides {{ opacity: 1; }}

.guides .col {{
  background: rgba(228, 0, 43, 0.06);
  border-left: 1px dashed rgba(228, 0, 43, 0.25);
  border-right: 1px dashed rgba(228, 0, 43, 0.25);
  height: 100%;
  position: relative;
}}

.guides .col::after {{
  content: attr(data-col);
  position: absolute;
  top: 4px;
  left: 4px;
  font: 10px/1 "IBM Plex Mono", monospace;
  color: rgba(228, 0, 43, 0.6);
}}

/* Baseline overlay lines */
.guides .baseline {{
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(228, 0, 43, 0.08);
}}

.guides .baseline.major {{
  background: rgba(228, 0, 43, 0.18);
}}

/* Margin lines */
.guides .margin-line {{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(228, 0, 43, 0.35);
}}
.guides .margin-line.left {{ left: var(--margin); }}
.guides .margin-line.right {{ right: var(--margin); }}

/* Typography baseline lock */
body {{
  font-family: Inter, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--ink);
  background: var(--paper);
  line-height: var(--lh);
  margin: 0;
}}

.masthead {{
  font-size: 96px;
  line-height: 96px; /* px, not unitless — locks to grid */
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin: 0;
}}

.body-text {{
  font-size: 16px;
  line-height: var(--lh);
  margin: 0 0 var(--lh) 0;
}}

.numeral {{
  font-size: 180px;
  line-height: 180px;
  font-weight: 700;
  letter-spacing: -0.04em;
  margin: 0;
}}

/* Utility: snap margins to baseline */
.mb-1 {{ margin-bottom: var(--lh); }}
.mb-2 {{ margin-bottom: calc(var(--lh) * 2); }}
.mb-3 {{ margin-bottom: calc(var(--lh) * 3); }}
.mt-1 {{ margin-top: var(--lh); }}
.mt-2 {{ margin-top: calc(var(--lh) * 2); }}
"""
    return css


def generate_js() -> str:
    return """/* Toggle: G key or button */
document.addEventListener('keydown', function(e) {
  if (e.key === 'g' || e.key === 'G') {
    document.body.classList.toggle('grid-on');
  }
});

/* Optical alignment: shift box so INK lands on the column line */
function alignOptically() {
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  document.querySelectorAll('.masthead, .numeral, .shead h2, .h2b').forEach(function(el) {
    el.style.marginLeft = '0px';
    var cs = getComputedStyle(el);
    var ch = (el.textContent || '').trim()[0];
    if (!ch) return;
    if (cs.textTransform === 'uppercase') ch = ch.toUpperCase();
    ctx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    ctx.textAlign = 'left';
    var abl = ctx.measureText(ch).actualBoundingBoxLeft;
    if (isFinite(abl)) el.style.marginLeft = abl.toFixed(2) + 'px';
  });
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(alignOptically);
} else {
  window.addEventListener('load', alignOptically);
}
window.addEventListener('resize', alignOptically);
"""


def generate_html(args) -> str:
    css = generate_css(args)
    js = generate_js()
    cols = args.cols

    col_html = "\n".join(
        f'    <div class="col" data-col="{i+1}"></div>'
        for i in range(cols)
    )

    baseline_html = "\n".join(
        f'    <div class="baseline {"major" if i % 3 == 0 else ""}" style="top:{i*args.baseline}px"></div>'
        for i in range(1, 81)
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Müller-Brockmann Grid Scaffold</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet">
<style>
{css}
/* Demo layout */
.wrap {{ padding: var(--lh) 0; }}
.kicker {{
  font-family: "IBM Plex Mono", monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: calc(var(--bl) * 2);
}}
.media {{
  background: #ddd;
  height: calc(var(--lh) * 15); /* 360px = multiple of 24 */
  width: 100%;
}}
.caption {{
  font-family: "IBM Plex Mono", monospace;
  font-size: 11px;
  line-height: var(--lh);
  color: #666;
  margin-top: var(--bl);
}}
.toggle-btn {{
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10000;
  background: var(--ink);
  color: var(--paper);
  border: none;
  padding: 10px 18px;
  font-family: "IBM Plex Mono", monospace;
  font-size: 12px;
  cursor: pointer;
}}
</style>
</head>
<body>

<button class="toggle-btn" onclick="document.body.classList.toggle('grid-on')">Toggle Grid (G)</button>

<section class="wrap grid">
  <!-- Grid overlay: SAME content box -->
  <div class="guides" aria-hidden="true">
    <div class="margin-line left"></div>
{col_html}
    <div class="margin-line right"></div>
{baseline_html}
  </div>

  <!-- Band 1: Masthead -->
  <div class="band mb-2">
    <div style="grid-column: 2 / 8;">
      <p class="kicker">Editorial — Issue 01</p>
      <h1 class="masthead">Grid<br>Systems</h1>
    </div>
    <div style="grid-column: 9 / 13; align-self: end;" class="mb-1">
      <p class="body-text">A rigorous approach to editorial layout on the web. Every element snaps to a column line and a baseline.</p>
    </div>
  </div>

  <!-- Band 2: Media + Caption -->
  <div class="band mb-2">
    <div style="grid-column: 2 / 9;">
      <div class="media"></div>
      <p class="caption">Fig. 1 — Modular field grid, 12 columns, 8px baseline.</p>
    </div>
    <div style="grid-column: 10 / 13;">
      <p class="body-text">The grid is an aid, not a guarantee. It permits a number of possible uses and each designer can look for a solution appropriate to his personal style.</p>
      <p class="body-text">But one must learn how to use the grid; it is an art that requires practice.</p>
    </div>
  </div>

  <!-- Band 3: Big Numeral -->
  <div class="band mb-2">
    <div style="grid-column: 2 / 5;">
      <p class="numeral">12</p>
    </div>
    <div style="grid-column: 6 / 13; align-self: center;">
      <p class="body-text">Columns divide the type area into a field of modules. Text and images occupy whole modules. The baseline grid brings vertical rhythm.</p>
    </div>
  </div>
</section>

<script>
{js}
</script>
</body>
</html>"""


def main():
    parser = argparse.ArgumentParser(description="Müller-Brockmann grid scaffold generator")
    parser.add_argument("--scaffold", action="store_true", help="Emit a full HTML page")
    parser.add_argument("--cols", type=int, default=DEFAULTS["cols"])
    parser.add_argument("--baseline", type=int, default=DEFAULTS["baseline"])
    parser.add_argument("--gutter", type=int, default=DEFAULTS["gutter"])
    parser.add_argument("--margin", type=int, default=DEFAULTS["margin"])
    parser.add_argument("--maxw", type=int, default=DEFAULTS["maxw"])
    parser.add_argument("--accent", default=DEFAULTS["accent"])
    parser.add_argument("--ink", default=DEFAULTS["ink"])
    parser.add_argument("--paper", default=DEFAULTS["paper"])
    args = parser.parse_args()

    if args.scaffold:
        print(generate_html(args))
    else:
        print(generate_css(args))
        print("\n/* --- JS --- */\n")
        print(generate_js())


if __name__ == "__main__":
    main()
