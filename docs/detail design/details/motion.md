# Motion Details

Load when working on transitions, hover states, micro-animations, or layout shifts.

---

## Rules

### motion-1 — Respect prefers-reduced-motion
Every animation must have a `@media (prefers-reduced-motion: reduce)` fallback that sets `transition: none` and `animation: none`. Motion is not optional polish; accessibility is non-negotiable.

### motion-2 — Easing is information
- `ease-out` for elements entering the viewport (decelerate to rest).
- `ease-in` for elements leaving (accelerate away).
- `ease-in-out` for elements moving between two visible states.
- `linear` only for continuous loops (spinners, marquees) or color fades.

### motion-3 — Duration by distance
Small elements (buttons, toggles): `150–200ms`. Medium elements (cards, panels): `250–350ms`. Large elements (modals, page transitions): `400–500ms`. Full-screen: `500–700ms`. Never use `1s+` for UI feedback.

### motion-4 — Transform-only for 60fps
Animate only `transform` and `opacity`. Avoid animating `width`, `height`, `top`, `left`, `margin`, or `padding` — they trigger layout recalculation and paint. Use `scale()` instead of width changes; use `translate()` instead of position changes.

### motion-5 — Stagger with purpose
When multiple elements animate in sequence, stagger by `20–50ms` per item. Faster than `20ms` feels simultaneous; slower than `80ms` feels broken. The stagger should follow reading order (top-left to bottom-right in LTR).

### motion-6 — Hover states are instantaneous feedback
Hover transitions should be `150–200ms`. The user needs immediate confirmation their cursor is on the target. Delayed hover feedback feels broken, not subtle.

### motion-7 — Active states are faster than hover
`:active` / pressed states should transition faster than hover (`80–120ms`). The physical metaphor is compression — it happens quicker than the approach.

### motion-8 — Exit animations must be shorter than entrances
An element leaving should animate faster than it entered. The user has already decided to dismiss it; prolonging the exit is friction, not delight. Exit ≈ 60–75% of entrance duration.

### motion-9 — Interruptible animations
Every animation must be reversible mid-flight. If a user hovers off while a hover transition is still playing, it should smoothly reverse, not snap. Use `transition` (not `animation`) for state changes to guarantee this.

### motion-10 — No motion for high-frequency actions
Buttons clicked 100+ times per day (send, save, upvote) should have no entrance/exit animation. A micro-feedback (brief color flash, `50ms` scale `0.98`) is acceptable. Repeated full animations become fatigue.

### motion-11 — Layout shift prevention
When content loads asynchronously, reserve exact space with skeleton placeholders matching the final content's dimensions. A skeleton that collapses or resizes after load is worse than a spinner.

### motion-12 — Spring physics for gestures
Use spring-based interpolation (not linear or ease curves) for drag gestures, pull-to-refresh, and swipe actions. The spring should settle within `300–400ms` with minimal overshoot (`< 10%`).

### motion-13 — Focus transitions
Focus rings should fade in (`150ms`) but snap out (`0ms`). A fading-out focus ring feels like lag, not polish.

### motion-14 — Loading state continuity
When a button transitions to a loading state, keep the button's width and height identical. Replace text with a spinner of the same visual weight. Preventing layout shift is more important than the spinner animation itself.

### motion-15 — Parallax restraint
If using parallax, keep the speed ratio between layers at `0.1–0.3`. Dramatic parallax (`> 0.5`) induces motion sickness in susceptible users and feels gimmicky.
