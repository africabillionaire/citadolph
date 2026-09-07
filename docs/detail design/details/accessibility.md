# Accessibility Details

Load when working on focus rings, keyboard access, screen readers, or touch targets.

---

## Rules

### accessibility-1 — Visible focus rings always
Every interactive element must have a visible focus indicator. The default browser outline is acceptable if not overridden. If customizing, use `outline: 2px solid` with `outline-offset: 2px` in a high-contrast color. Never remove focus styles without replacing them.

### accessibility-2 — Focus order follows DOM order
Tab order must match visual order. If you use `tabindex` > 0, you have already failed. Use `tabindex="0"` for custom interactive elements and `tabindex="-1"` for programmatic focus targets only.

### accessibility-3 — Keyboard operability
Every action reachable by mouse must be reachable by keyboard. Test with Tab, Enter, Space, Escape, and Arrow keys. Complex widgets (menus, tabs, grids) must follow WAI-ARIA authoring practices for keyboard behavior.

### accessibility-4 — Screen reader labels
Icon-only buttons must have `aria-label`. Decorative images must have `alt=""` (empty string, not missing). Informative images need descriptive `alt`. Never use `aria-label` and visible text that say different things.

### accessibility-5 — Color is not the only signal
Error states, required fields, and status changes must use an additional cue beyond color: an icon, text, border style, or pattern. A red border alone fails WCAG 1.4.1.

### accessibility-6 — Touch target spacing
Adjacent touch targets must have at least `8px` of spacing between them. A `44×44px` button touching another `44×44px` button is still error-prone. Use padding or margin to create safe zones.

### accessibility-7 — Motion respect
Honor `prefers-reduced-motion` for all animations, autoplaying carousels, and parallax. Provide a static equivalent: a single hero image instead of a video, a static illustration instead of an animated one.

### accessibility-8 — Form error association
Error messages must be programmatically associated with their inputs using `aria-describedby` or `aria-errormessage`. The error text must be announced by screen readers when it appears.

### accessibility-9 — Skip links
Provide a "Skip to main content" link as the first focusable element. It should be visually hidden until focused (`position: absolute; left: -9999px` or `clip`), then visible at the top-left on focus.

### accessibility-10 — Heading hierarchy
Use exactly one `h1` per page. Do not skip heading levels (`h1` → `h3` is forbidden). Headings must describe the content that follows, not be used for sizing.

### accessibility-11 — Live regions for dynamic content
Use `aria-live="polite"` for status updates ("Saved", "3 new messages") and `aria-live="assertive"` only for critical errors that require immediate attention. Do not overuse assertive — it interrupts the user.

### accessibility-12 — Contrast ratios
Text must meet WCAG AA: `4.5:1` for normal text, `3:1` for large text (`18px+` or `14px+ bold`). UI components and graphical objects must meet `3:1` against adjacent colors. Test with actual tools, not eyeballs.

### accessibility-13 — Language declaration
The `<html>` element must have a `lang` attribute matching the primary page language. If a paragraph switches language, wrap it in an element with the correct `lang` attribute.

### accessibility-14 — Focus trapping in modals
When a modal opens, focus must move to the modal and be trapped within it until closed. Focus must return to the triggering element on close. The `Escape` key should close the modal.

### accessibility-15 — Accessible names for landmarks
Use semantic HTML (`<main>`, `<nav>`, `<aside>`) where possible. If using `role="region"`, provide an accessible name with `aria-label` or `aria-labelledby`.
