# Onboarding Playbook

Use this asset when designing or redesigning a first-run, signup, or onboarding flow.

---

## Template A: Value-First Onboarding (Reciprocity + IKEA Effect)

### Phase 1: Immediate Value (0:00–0:30)
- **Screen 1:** Show the core output immediately. If it's a design tool, show a template gallery. If it's analytics, show a demo dashboard with sample data.
- **Action:** Let the user interact — click, customize, or generate something.
- **Psychology:** Reciprocity — they received value before being asked for anything.

### Phase 2: Micro-Investment (0:30–2:00)
- **Screen 2:** Ask ONE preference question with a visual, rewarding interaction (e.g., pick a color theme, select an avatar, choose a goal).
- **Screen 3:** Show a personalized preview based on that choice.
- **Psychology:** IKEA Effect — they already built something. Endowment Effect — it feels like theirs.

### Phase 3: The Gate (2:00–2:30)
- **Screen 4:** "Save your work" — not "Create an account."
- Show a thumbnail/preview of what they built.
- Offer social login + email. Pre-fill email if available from device.
- **Psychology:** Loss Aversion — walking away means losing what they made.

### Phase 4: Acceleration (2:30–5:00)
- **Screen 5:** Progress bar starts at 30% (account creation = 30%, profile pic = 40%, first action = 60%).
- **Screen 6:** Smart defaults on all remaining fields. No blank forms.
- **Screen 7:** Deliver the "Aha" moment — the core value proposition realized.
- **Psychology:** Goal Gradient + Smart Defaults + Zeigarnik.

---

## Template B: Progressive Permission Onboarding

For apps requiring multiple permissions (notifications, location, contacts):

1. **Delay all permission requests** until the user has experienced value.
2. **Contextual triggers:** Ask for camera access only when the user taps "Take a photo." Ask for notifications only after they have created something worth being notified about.
3. **Priming copy:** Before the system dialog, show an in-app screen explaining the benefit: "Get notified when your report is ready" > "Allow notifications?"
4. **Fallback path:** If denied, provide a soft setting reminder later, never a hard block.

---

## Template C: Blank-State to Aha Moment

| Step | UI Pattern | Psychology Principle | Time Budget |
|------|-----------|---------------------|-------------|
| 1 | Welcome with animated product preview (not text) | Priming + Visceral emotional design | 10 s |
| 2 | One-tap goal selection (3–5 options) | Hick's Law + Goal Gradient start | 20 s |
| 3 | Auto-generated personalized dashboard/sample | Reciprocity + IKEA Effect | 30 s |
| 4 | "Save your work" gate with preview thumbnail | Loss Aversion + Endowment | 20 s |
| 5 | Progress bar at 30%, 2–3 smart-default fields | Goal Gradient + Smart Defaults | 60 s |
| 6 | First meaningful action with instant feedback | Flow State + Immediate reward | 90 s |
| 7 | Celebration micro-animation + next-step teaser | Peak-End Rule + Zeigarnik | 10 s |

**Total target:** Under 5 minutes to Aha moment.

---

## Anti-Patterns to Avoid

- ❌ **Gate-first:** Signup wall before any value.
- ❌ **Zero progress:** Progress bar starting at 0%.
- ❌ **Blank forms:** No pre-filled defaults.
- ❌ **Permission bombing:** All system dialogs on first launch.
- ❌ **Feature tours:** 5-screen slideshows that users skip.
- ❌ **Choice overload:** More than 5 options per decision screen.
