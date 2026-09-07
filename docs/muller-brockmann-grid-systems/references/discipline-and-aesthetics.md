# Discipline & Aesthetics

Load this file when the user asks for Swiss/International Typographic Style history, design principles, palette rules, or typography discipline.

---

## PART 1 — THE DISCIPLINE

Josef Müller-Brockmann (1914–1996), Zurich; *Grid Systems in Graphic Design* (1981) is the corpus. The grid is treated as an ethic, not decoration.

### Objective Order
The grid brings "constructive thought," legibility, and "objective and functional" design. Restraint is the point; the system, not the ego, organizes the page.

### Modular Grid
Divide the type area into a field of **modules** — columns AND rows — separated by consistent **gutters**, inside defined **margins**. Text and images occupy whole modules.

Müller-Brockmann specimens common field counts: 8 / 20 / 32 fields.

For the web, a **12-column grid + 8px baseline** is a robust general default. Use a **6×6 or 4×8 modular field grid** when you want visible rows too.

### Baseline Grid
Vertical rhythm is sacred: **leading = a whole multiple of the baseline unit**, and every element snaps to it. This is what makes facing columns and images line up across the page.

### Typography
- A **grotesque sans**: Akzidenz-Grotesk / Helvetica; on the web Inter, Helvetica Now, Archivo.
- **Flush-left, ragged-right.**
- Few sizes, large jumps in **scale** for hierarchy; objective, not expressive.
- Big **numerals/data set large** is a signature move.

### Palette
- Pure white paper, near-black ink.
- **One accent — red is canonical** (`#e4002b`).
- Avoid the warm-cream "Claude look."
- **Never blue/purple gradients** (hard house rule).

### White Space + Asymmetry
Generous margins; asymmetric compositions held in tension by the grid.

---

## PART 4 — CRAFT DEFAULTS

### Typefaces
- **Display + body:** Inter, Helvetica Now, or Archivo (real grotesque webfonts).
- **Mono:** Space Mono or IBM Plex Mono for folios, captions, grid annotations — reinforces the technical register.
- **Non-Latin:** Noto Sans JP / Noto Sans SC etc.

### Hierarchy
Through **scale + weight + white space**, not color. Treat key data as large numerals. Kicker labels in mono caps. Per-spread folios.

### Photography
Real photography. Ground real subjects in real photos.

### Rasterization Trap
If you ever rasterize art (cairosvg / headless screenshots / image-gen reference):
- A `Helvetica`/`Arial` CSS stack silently falls back to **Noto Sans** (reads like Calibri).
- Render in **Liberation Sans** or an embedded Helvetica/Arimo TTF before trusting it.
- Same trap as the optical-measurement caveat: wrong font in → wrong result out.

### Spread Model
Full-width sections, each its own per-spread `.grid` + `.guides`, consistent margins/folios.
