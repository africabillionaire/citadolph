#!/usr/bin/env node
/**
 * verify_grid.js — Puppeteer harness for Müller-Brockmann grid verification.
 *
 * Usage:
 *   CHROME=/usr/bin/chromium PUP=/path/to/puppeteer-core  *     node verify_grid.js <file-or-url> --widths=1440,1180,900
 *
 * Checks at each width:
 *   1. Column adherence — every .band > * snaps to column start/end (~0px).
 *   2. Overlay match — .guides .col rects equal computed column rects (~0px).
 *   3. Baseline — text tops modulo baseline ≈ 0 (tolerance ≈ half baseline).
 *   4. Optical ink — display element ink-left equals its own column line.
 */

const fs = require("fs");
const path = require("path");

const PUP_PATH = process.env.PUP || "puppeteer-core";
const CHROME_BIN = process.env.CHROME || process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Usage: node verify_grid.js <file-or-url> --widths=1440,1180,900");
    process.exit(1);
  }

  let target = args[0];
  const widthsArg = args.find(a => a.startsWith("--widths="));
  const widths = widthsArg
    ? widthsArg.replace("--widths=", "").split(",").map(Number)
    : [1440, 1180, 900];

  if (!target.startsWith("http") && fs.existsSync(target)) {
    target = "file://" + path.resolve(target);
  }

  let puppeteer;
  try {
    puppeteer = require(PUP_PATH);
  } catch (e) {
    console.error("Failed to load puppeteer-core from:", PUP_PATH);
    console.error("Set PUP env var to the puppeteer-core module path.");
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: CHROME_BIN,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dbus",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
    ],
  });

  let allPass = true;

  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto(target, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => document.fonts.ready, { timeout: 10000 });

    const result = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const cols = parseInt(root.getPropertyValue("--cols").trim(), 10) || 12;
      const gutter = parseFloat(root.getPropertyValue("--gutter").trim()) || 24;
      const margin = parseFloat(root.getPropertyValue("--margin").trim()) || 48;
      const bl = parseFloat(root.getPropertyValue("--bl").trim()) || 8;
      const lh = parseFloat(root.getPropertyValue("--lh").trim()) || 24;
      const maxw = parseFloat(root.getPropertyValue("--maxw").trim()) || 1280;

      const wrap = document.querySelector(".grid, .wrap");
      if (!wrap) return { error: "No .grid or .wrap found" };
      const wrapRect = wrap.getBoundingClientRect();

      // --- Build column geometry ---
      const contentWidth = Math.min(wrapRect.width - margin * 2, maxw - margin * 2);
      const colWidth = (contentWidth - gutter * (cols - 1)) / cols;

      const colStarts = [];
      const colEnds = [];
      for (let i = 0; i < cols; i++) {
        const start = margin + i * (colWidth + gutter);
        colStarts.push(start);
        colEnds.push(start + colWidth);
      }
      // Add the far right edge as a valid end
      colEnds.push(margin + cols * (colWidth + gutter) - gutter);

      function nearestLine(val, lines) {
        let best = lines[0];
        let bestDist = Math.abs(val - lines[0]);
        for (const l of lines) {
          const d = Math.abs(val - l);
          if (d < bestDist) { best = l; bestDist = d; }
        }
        return { line: best, dist: bestDist };
      }

      // --- 1. Column adherence ---
      let colMaxErr = 0;
      const bands = document.querySelectorAll(".band");
      for (const band of bands) {
        for (const child of band.children) {
          // Skip optically-aligned display elements
          if (child.matches(".masthead, .numeral, .shead h2, .h2b")) continue;
          const r = child.getBoundingClientRect();
          const leftRel = r.left - wrapRect.left;
          const rightRel = r.right - wrapRect.left;
          const leftMatch = nearestLine(leftRel, colStarts);
          const rightMatch = nearestLine(rightRel, colEnds);
          colMaxErr = Math.max(colMaxErr, leftMatch.dist, rightMatch.dist);
        }
      }

      // --- 2. Overlay match ---
      let overlayMaxErr = 0;
      const guideCols = document.querySelectorAll(".guides .col");
      for (let i = 0; i < guideCols.length; i++) {
        const g = guideCols[i];
        const gr = g.getBoundingClientRect();
        const expectedStart = wrapRect.left + colStarts[i];
        const expectedEnd = wrapRect.left + colEnds[i];
        overlayMaxErr = Math.max(
          overlayMaxErr,
          Math.abs(gr.left - expectedStart),
          Math.abs(gr.right - expectedEnd)
        );
      }

      // --- 3. Baseline ---
      let baselineMaxErr = 0;
      const textEls = document.querySelectorAll(".band p, .band h1, .band h2, .band .caption");
      for (const el of textEls) {
        const r = el.getBoundingClientRect();
        const topRel = r.top - wrapRect.top;
        const mod = topRel % bl;
        const err = Math.min(mod, bl - mod);
        baselineMaxErr = Math.max(baselineMaxErr, err);
      }

      // --- 4. Optical ink ---
      let inkMaxErr = 0;
      const cvs = document.createElement("canvas");
      const ctx = cvs.getContext("2d");
      const displayEls = document.querySelectorAll(".masthead, .numeral, .shead h2, .h2b");
      for (const el of displayEls) {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const ch = (el.textContent || "").trim()[0];
        if (!ch) continue;
        let char = ch;
        if (cs.textTransform === "uppercase") char = char.toUpperCase();
        ctx.font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
        ctx.textAlign = "left";
        const metrics = ctx.measureText(char);
        const abl = metrics.actualBoundingBoxLeft || 0;
        const inkLeft = (r.left - wrapRect.left) - abl;
        const targetLine = nearestLine(inkLeft, colStarts).line;
        inkMaxErr = Math.max(inkMaxErr, Math.abs(inkLeft - targetLine));
      }

      return {
        width: wrapRect.width,
        cols,
        gutter,
        margin,
        bl,
        lh,
        colMaxErr: Math.round(colMaxErr * 100) / 100,
        overlayMaxErr: Math.round(overlayMaxErr * 100) / 100,
        baselineMaxErr: Math.round(baselineMaxErr * 100) / 100,
        inkMaxErr: Math.round(inkMaxErr * 100) / 100,
      };
    });

    await page.close();

    if (result.error) {
      console.log(`width=${width}  ERROR: ${result.error}`);
      allPass = false;
      continue;
    }

    const colPass = result.colMaxErr <= 1;
    const overlayPass = result.overlayMaxErr <= 1;
    const baselinePass = result.baselineMaxErr <= result.bl / 2 + 0.5;
    const inkPass = result.inkMaxErr <= 1;
    const pass = colPass && overlayPass && baselinePass && inkPass;
    if (!pass) allPass = false;

    const status = pass ? "PASS" : "FAIL";
    console.log(
      `width=${width}  ` +
      `col=${result.colMaxErr}px  ` +
      `overlay=${result.overlayMaxErr}px  ` +
      `baseline≤${result.baselineMaxErr.toFixed(1)}px  ` +
      `ink=${result.inkMaxErr}px  ` +
      `→ ${status}`
    );
  }

  await browser.close();

  console.log(allPass ? "\nGRID VERIFY: PASS" : "\nGRID VERIFY: FAIL");
  process.exit(allPass ? 0 : 1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
