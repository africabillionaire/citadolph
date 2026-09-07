# Design Details

Load when working on layout, surfaces, visual polish, browser chrome, or media.

---

## Rules

### design-1 — Border radius consistency
Use a restricted radius scale (e.g., `4px` for inputs, `8px` for cards, `9999px` for pills). Never mix arbitrary values. A button with `6px` and a card with `7px` looks accidental, not intentional.

### design-2 — Shadow as elevation, not decoration
Shadows communicate z-depth. Use `0 1px 3px` for resting cards, `0 4px 12px` for hover/focus elevation, `0 8px 24px` for modals. Always use `rgba(0,0,0,0.08–0.15)` — pure black shadows look dirty on colored backgrounds.

### design-3 — Color transitions on state change
When a button or surface changes state (hover, active, disabled), transition the background color and border color over `150ms`. An instant color jump feels broken; a slow fade feels unresponsive.

### design-4 — Disabled state clarity
Disabled elements should look *unavailable*, not *invisible*. Reduce opacity to `0.4–0.5`, keep the same border/shape, and add `cursor: not-allowed`. Never remove the border or background entirely — the element must still be recognizable.

### design-5 — Image aspect ratio enforcement
Always define aspect ratio containers (`aspect-ratio: 16/9` or padding-bottom hack) for images and videos. Preventing CLS is a design detail, not just a performance metric. Use `object-fit: cover` with `object-position: center` as the safe default.

### design-6 — Scrollbar styling
On custom scrollable regions, style the scrollbar to match the surface (`::-webkit-scrollbar` + `scrollbar-color` for Firefox). A default OS scrollbar on a dark-themed panel looks like a bug. Keep the thumb at least `8px` wide for touch accessibility.

### design-7 — Empty states are designed, not default
Every empty list, search result, or dashboard needs a designed empty state: an illustration or icon, a human sentence explaining why it's empty, and a primary action to fill it. Never show a blank white rectangle or "No data."

### design-8 — Loading skeletons match final shape
Skeleton placeholders must mirror the final content's layout: same number of lines, same approximate widths, same image aspect ratios. A generic pulsing rectangle that doesn't match the eventual layout causes a jarring shift when content arrives.

### design-9 — Separator hierarchy
Use `1px` borders for primary separation (sections). Use `8–16px` of whitespace for secondary separation (related items). Never use both a border and equivalent whitespace between the same elements — choose one.

### design-10 — Touch target minimum
All interactive elements must be at least `44×44px` (Apple HIG) or `48×48dp` (Material). If the visual element is smaller, expand the invisible hit area with padding or a pseudo-element.

### design-11 — Dark mode color shift
In dark mode, reduce saturation by `10–20%` and increase lightness of pure blacks to `#111` or `#1a1a1a`. Pure `#000` on OLED causes smearing; fully saturated colors vibrate against dark backgrounds.

### design-12 — Border vs. shadow for elevation
Use borders for separation between equal surfaces. Use shadows for elevation (one surface above another). Never use both a border and a shadow on the same element to express the same thing.

### design-13 — Responsive spacing scale
Halve your spacing scale on mobile (`32px` → `16px`, `64px` → `32px`). Desktop whitespace feels generous; the same whitespace on mobile feels wasteful. Maintain the *ratio*, not the absolute value.

### design-14 — Favicon and touch icons
Provide a `favicon.ico`, `apple-touch-icon.png` (`180×180`), and `manifest.json` icons. The favicon should be readable at `16×16`. Use a solid background for the touch icon — transparent PNGs render as black on iOS home screens.

### design-15 — Browser chrome awareness
Account for notches, home indicators, and safe areas with `env(safe-area-inset-*)`. On iOS, `100vh` includes the bottom home bar; use `100dvh` or `min-height: 100vh` with bottom padding.
