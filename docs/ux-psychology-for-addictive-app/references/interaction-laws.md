# Interaction Laws & Mechanics

Load this file when the user needs mathematical models, formulas, or detailed implementation statistics for Fitts's Law, Hick's Law, the Steering Law, response time thresholds, or interaction cost analysis.

---

## 2.1 Fitts's Law — Target Acquisition Time

**Principle:** The time to acquire a target is a function of target size and distance.

**Formula:**
```
MT = a + b × log₂(2D/W)
```
- MT = Movement Time
- a, b = device constants
- D = Distance to target center
- W = Width along axis of motion

**Implementation:**
- Primary CTAs: minimum 44×44 px mobile, 48×48 dp Apple HIG.
- Place important actions in easy-to-reach zones (thumb zone on mobile).
- Buttons to complete actions should be close beside the active element.
- On desktop, corners and edges act as infinite-width targets.
- Avoid placing critical targets near moving elements.

**Statistics:**
- Movement time increases ~200–300 ms for every doubling of distance-to-target ratio.
- Users are 2–3× more likely to misclick targets <20×20 px on desktop.
- Mobile touch targets below 44×44 px result in significantly higher error rates.
- Optimizing tap targets can increase mobile conversion by 10–20%.

---

## 2.2 The Steering Law (Accot-Zhai) — Tunnel Navigation

**Principle:** Models movement time through constrained paths (menus, sliders, scroll bars).

**Formula:**
```
T = a + b × (A/W)
```
- T = Overall movement time
- A = Length of tunnel (path length)
- W = Width of tunnel

**Implementation:**
- Add generous padding above/below menu items to increase effective tunnel width.
- Avoid deep hierarchical menus (3+ levels) — horizontal tunnel to submenus becomes very difficult.
- Mega menus eliminate the tunnel problem entirely.
- For sliders, supplement with numeric input for precision tasks.
- Allow clicking anywhere on a slider to jump to a position.

**Statistics:**
- Hierarchical menu navigation is 2–3× slower than flat navigation.
- Users overshoot submenu boundaries ~15–25% of the time in 3-level menus.
- Adding 8 px padding above/below menu items reduces tunnel-exit errors by ~40%.

---

## 2.3 Hick's Law — Decision Speed

**Principle:** More elements = longer decision time.

**Formula:**
```
T = a + b × log₂(n)
```
- T = Decision time
- n = Number of choices

**Implementation:**
- Limit choices to 3–5 per screen.
- Use progressive disclosure.
- Highlight a recommended option.
- Group related choices (chunking reduces perceived complexity).
- Remove options that do not serve the user.
- Navigation menus: keep top-level items to 5–7 maximum.

**When it breaks down:**
- Highly familiar/routine choices (experts bypass deliberation)
- Categorically different choices
- Emotionally driven decisions

**Statistics:**
- Reducing choices from 10 to 4 can increase conversion by 20–30%.
- E-commerce sites with 20+ options per category see 10–15% lower conversion than those with 8–12 well-curated options.
- Users abandon decision tasks after ~6–8 options without clear guidance.

---

## 2.4 The Power Law of Learning

**Principle:** Task time decreases with repetitions following a power law curve.

**Implementation:**
- Follow established conventions — users have practiced them elsewhere.
- Any design innovation incurs a learning cost.
- Users reach peak performance after 4–11 repetitions depending on complexity.
- Interfaces violating conventions see 20–50% slower task completion initially.

---

## 2.5 Jakob's Law

**Principle:** Users spend most of their time on other sites. They prefer your site to work the same way.

**Implementation:**
- Be consistent with well-established standards.
- Innovation incurs a cost.
- Moving a company logo from left to center makes it 6× harder to return to the homepage.

**When to innovate:**
- Will the new design perform better than the old?
- Is there a user advantage worth the transition cost?
- Will users practice enough to realize long-term benefits?
- Can you speed up learning through exposure or contextual tips?
- Innovation is easier for strong brands (Google, Apple) or interfaces used several times daily.

---

## 2.6 Response Time Limits (Robert Miller, 1968)

| Limit | Threshold | What Happens |
|-------|-----------|--------------|
| **0.1 s** | Instantaneous feel | Feels like the user made it happen directly |
| **1.0 s** | Flow uninterrupted | Feels like the system is reacting to the user |
| **10.0 s** | Attention limit | Maximum time people stay in the interaction flow |

**Implementation:**
- Under 0.1 s: Direct manipulation — no special feedback needed.
- 0.1–1.0 s: Page transitions — show busy indicator if approaching 1 s.
- 1–10 s: Show progress indicators (percent-done if determinate, spinner if not).
- Over 10 s: Use percent-done progress bars with cancellation option.
- Always show feedback for operations >0.1 s.

**Statistics:**
- 47% of users expect pages to load in under 2 seconds.
- 40% abandon sites that take >3 seconds to load.
- Every 1-second delay reduces conversions by 7% (Akamai).
- Google's 0.5-second search delay reduced traffic by 20%.

---

## 2.7 Interaction Cost

**Principle:** The sum of all mental and physical efforts to reach a goal.

**Formula:**
```
Expected Utility = Expected Benefits – Expected Interaction Costs
```

**What counts as cost:**
- Reading, scrolling, visual search, comprehension
- Clicks, typing, page loads
- Attention switches, memory load
- Waiting time

**Implementation:**
- Minimize reading through scannable content (bullets, short paragraphs, descriptive headings).
- Make targets large and easy to tap (Fitts's Law).
- Reduce page loads through in-page updates.
- Auto-fill, auto-suggest, smart defaults.
- Clear information architecture.
- Progressive disclosure.

**Statistics:**
- Auto-complete in search reduces interaction cost by 30–50%.
- If perceived interaction cost exceeds perceived benefit, users leave regardless of content quality.
