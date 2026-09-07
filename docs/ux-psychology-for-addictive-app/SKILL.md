---
name: ux-psychology-for-addictive-apps
description: >-
  Apply research-backed UX psychology to design onboarding, retention flows,
  upgrade prompts, gamification, and pricing screens. Covers Gestalt perception,
  interaction laws (Fitts, Hick, Steering), cognitive biases, behavioral
  economics (loss aversion, anchoring, scarcity), habit loops, flow state,
  and ethical persuasive design. Trigger when the user needs engagement,
  conversion, or retention UX strategy, interface critique, or behavioral
  design review.
---

# UX Psychology for Addictive Apps

## 1. Trigger Map — When to Activate What

| User Request | Activate Workflow | Load Reference |
|-------------|-------------------|--------------|
| "Design onboarding" / "First-run flow" | A: Onboarding Architecture | `assets/onboarding-playbook.md` |
| "Optimize pricing" / "Upgrade screen" / "Paywall" | B: Conversion & Pricing | `assets/conversion-playbook.md` |
| "Increase retention" / "Habit loop" / "Come back" | C: Retention & Habits | `assets/retention-checklist.md` |
| "Review this UI" / "Critique this screen" / "Why low conversion?" | D: Heuristic Audit | `references/biases-index.md` |
| "Explain [principle]" / "Deep dive on [bias]" | — | `references/principles-encyclopedia.md` |
| "How does Fitts/Hick/Steering apply?" | — | `references/interaction-laws.md` |

**Default stance:** Persuasion serves the user. Manipulation is a dark pattern. Run every recommendation through the Ethics Non-Negotiables (Section 5) before delivering it.

---

## 2. Workflow A: Onboarding Architecture

**Goal:** Get the user to the "Aha" moment in < 5 minutes with maximum completion rate.

### Step 1 — Pre-Signup Value Delivery (Reciprocity)
- WHEN the user lands, deliver a concrete, non-teaser output before any gate.
- Let them customize, build, or preview something personal (IKEA Effect).
- Only present the signup screen as "Save your work," never "Create account to continue."

### Step 2 — Artificial Head Start (Goal Gradient)
- WHEN showing a progress indicator, start it at 20–30%.
- Count profile selection, language choice, or first click as completed steps.
- Frame copy as "You're almost there" not "Step 2 of 7."

### Step 3 — Chunk & Default (Cognitive Load + Smart Defaults)
- WHEN presenting forms, pre-fill every field with the statistically most common value.
- Break >4 fields into grouped sections (chunking); use Common Region (cards/borders) to seal each group.
- Never present a completely blank form.

### Step 4 — Choice Reduction (Hick's Law)
- WHEN asking for preferences, limit active choices to 3–5 per screen.
- Use progressive disclosure: reveal advanced options only on tap/click.
- Highlight a recommended option to reduce decision effort.

### Step 5 — Momentum Preservation (Continuation + Zeigarnik)
- WHEN the user pauses or leaves, save state aggressively and surface "Pick up where you left off" on return.
- Use incomplete progress bars ("Your profile is 70% complete") to trigger the Zeigarnik Effect.

---

## 3. Workflow B: Conversion & Pricing Optimization

**Goal:** Maximize upgrade/purchase action without dark patterns.

### Step 1 — Anchor Control (Contrast Effect + Anchoring)
- WHEN displaying pricing, always show the most expensive tier first.
- Place a decoy tier adjacent to your target tier to make the target feel like the rational middle ground.
- Show original prices struck through next to discounted prices.

### Step 2 — Loss Framing (Loss Aversion + Status Quo Bias)
- WHEN writing CTA copy, frame as what the user will lose by inaction: "You will lose access to X" not "Upgrade to get X."
- For dismiss buttons, use honest but loss-tinged labels: "I'll risk it" or "Remind me later" — never "Maybe later" if the loss is real.
- Show what they currently have and explicitly map what disappears if they don't act.

### Step 3 — Social Proof at Decision Point
- WHEN the user is on a pricing or checkout screen, inject social proof inside the same Common Region as the CTA (not in a distant banner).
- Use specificity: "Join 2.3 million users" or "87% of Pro users upgrade within 30 days."
- Place testimonials from users demographically similar to the target.

### Step 4 — Scarcity with Integrity
- WHEN using scarcity, only use genuine constraints: real inventory counts, actual deadlines, true limited seats.
- Display "Only X left" or a countdown timer tied to a real database value.
- Fake scarcity destroys trust permanently; detectable fake urgency is a dark pattern.

### Step 5 — Interaction Cost Minimization (Fitts's Law)
- WHEN designing the purchase flow, make the primary CTA large (min 44×44 px mobile, 48×48 dp Apple HIG) and place it in the thumb zone.
- Keep the checkout tunnel short and wide (Steering Law); avoid deep hierarchical menus mid-flow.
- Reduce clicks to purchase: auto-fill, smart defaults, one-tap buy where possible.

---

## 4. Workflow C: Retention & Habit Design

**Goal:** Build automatic return behavior through ethical habit loops.

### Step 1 — Map the Habit Loop (Cue → Routine → Reward)
- WHEN designing retention, identify the user's internal cue (boredom, anxiety, completion of a real-world task).
- Design the routine to be the simplest possible action (open → scroll → tap).
- Deliver a variable reward: not the same content every time, but a mix of social validation, novel information, and micro-achievement.

### Step 2 — Streak Mechanics (Loss Aversion + Commitment)
- WHEN implementing streaks, make them visually prominent and celebrate milestones (7, 30, 100 days).
- Offer a "streak freeze" safety valve to reduce anxiety and prevent permanent abandonment after one miss.
- Frame breaks as losses: "You're about to lose your 12-day streak."

### Step 3 — Flow State Guardrails
- WHEN the user is in a creation or consumption flow, remove interruptions: no pop-ups, no mid-task upsells.
- Match challenge to skill adaptively; too easy = boredom, too hard = anxiety.
- Provide immediate feedback for every action (0.1 s threshold for direct manipulation feel).
- Auto-save everything; data loss is a flow-killer and a negativity-bias trap.

### Step 4 — Variable Reward Scheduling
- WHEN building feeds or dashboards, randomize high-value content placement so the user cannot predict exactly where the next reward sits.
- Use intermittent reinforcement for achievements: occasional bonus XP, surprise badges, or unexpected praise.
- Avoid fixed schedules that users learn to ignore.

### Step 5 — Re-engagement Triggers
- WHEN sending notifications, tie them to user investment: "Your report is ready" (reciprocity) not "We miss you" (guilt).
- Time external cues to the user's historical usage pattern, not broadcast blasts.
- Every notification must deliver value in the payload, not just open the app.

---

## 5. Workflow D: Heuristic Interface Audit

**Goal:** Rapidly diagnose why a screen is underperforming.

### Phase 1 — Perceptual Scan (Gestalt)
- CHECK: Does proximity group related elements and separate unrelated ones?
- CHECK: Does similarity make interactive elements predictable? Is the primary CTA the only element breaking similarity (Von Restorff)?
- CHECK: Does Common Region prevent misattribution (e.g., ratings next to wrong products)?
- CHECK: Does Figure/Ground clearly separate the modal/decision area from background noise?

### Phase 2 — Cognitive Scan
- CHECK: Is cognitive load minimized? Count novel elements per screen; target ≤4±1 (Cowan, 2000).
- CHECK: Are there banner-ad-like regions where critical CTAs might be suffering banner blindness?
- CHECK: Are changes after user actions visible within the focal area, or will change blindness hide them?
- CHECK: Is information scent strong? Are link labels descriptive and specific?

### Phase 3 — Behavioral Scan
- CHECK: Are choices >5 per decision point without grouping? If yes, apply Hick's Law reduction.
- CHECK: Are tap targets <44 px? If yes, apply Fitts's Law expansion.
- CHECK: Is there a real exit ramp on every gate, or is this a Roach Motel?
- CHECK: Does the screen pass the Ethics Non-Negotiables below?

### Phase 4 — Emotional Scan
- CHECK: Is there a designed peak moment and a positive end moment (Peak-End Rule)?
- CHECK: Do error messages own the fault ("Something went wrong") rather than blame the user?
- CHECK: Does the visual design create a positive Halo Effect in the first 50 ms?

---

## 6. Principle Quick-Reference Toolkit

Apply these as tactical interventions during the workflows above.

| Principle | Tactical Command | Compound Pairing |
|-----------|------------------|-------------------|
| **Proximity** | Group related items with 8–12 px internal spacing; separate groups with 24–32 px. | + Hick's Law: clusters read as single choices. |
| **Similarity** | Unify interactive elements visually; reserve one color for the primary CTA only. | + Von Restorff: the lone red button captures attention. |
| **Common Region** | When in doubt, add a card/border. It overrides proximity and similarity. | + Social Proof: proof inside the card feels tied to the action. |
| **Closure** | Use "…" and partial carousels to invite mental completion. | + IKEA Effect: mental completion creates ownership. |
| **Continuation** | Align steps horizontally or vertically so the eye follows a path to the CTA. | + Goal Gradient: the path itself feels like progress. |
| **Fitts's Law** | Make primary actions large and close to the user's start point (thumb zone). | — |
| **Hick's Law** | Cap choices at 3–5 per screen; use chunking and progressive disclosure. | + Proximity: clusters reduce perceived choice count. |
| **Steering Law** | Keep menu tunnels short and wide; prefer mega menus over deep hierarchies. | — |
| **Goal Gradient** | Never start progress at 0%; frame remaining steps as "almost done." | + Continuation: visual paths amplify momentum. |
| **Reciprocity** | Give full, non-teaser value before asking for signup/payment. | + Endowment Effect: free tool usage creates ownership. |
| **Loss Aversion** | Frame inaction as loss; pain of losing is ~2× stronger than pleasure of gaining. | + Status Quo Bias: people protect what they already have. |
| **Anchoring** | Show the highest price first; all subsequent prices feel smaller. | + Decoy Effect: add an inferior tier to make the target obvious. |
| **Social Proof** | Place specific crowd evidence at the decision point inside the action's container. | + Common Region: groups proof with the CTA. |
| **Scarcity** | Use only real scarcity; display genuine inventory or time limits. | + Loss Aversion: limited availability triggers fear of missing out. |
| **Zeigarnik** | Show incomplete tasks with progress bars; enable one-click resume. | — |
| **Flow State** | Remove interruptions; balance challenge to skill; provide instant feedback. | — |
| **Peak-End Rule** | Design one standout moment and ensure the final interaction is positive. | + Negativity Bias: one bad ending outweighs many good moments. |

---

## 7. Ethics Non-Negotiables

Before delivering any recommendation, verify:

1. **Serve the user.** Does this pattern help the user achieve their goal, or only the business metric?
2. **Transparency.** Would you be comfortable if the user knew exactly what psychological mechanism was being used?
3. **Honesty.** No fake scarcity, no fake social proof, no hidden costs, no roach-motel subscriptions.
4. **Exit ramps.** Every gate must have a real, equally visible exit. Confirmshaming is prohibited.
5. **Long-term value.** Does this create sustained engagement or short-term extraction that leads to resentment?

If a pattern fails any check, reject it and propose an ethical alternative.

---

## 8. File & Asset Map

| File | When to Load |
|------|-------------|
| `references/principles-encyclopedia.md` | User asks for deep explanations, case studies, academic citations, or historical context on any principle. |
| `references/interaction-laws.md` | User needs mathematical models, formulas, or detailed implementation stats for Fitts, Hick, Steering, or Miller's Law. |
| `references/biases-index.md` | User requests a catalog of cognitive biases, heuristic details, or research statistics. |
| `assets/onboarding-playbook.md` | User is building or redesigning a first-run / signup / onboarding flow. |
| `assets/conversion-playbook.md` | User is optimizing pricing pages, upgrade prompts, paywalls, or checkout flows. |
| `assets/retention-checklist.md` | User is designing streaks, notifications, habit loops, or re-engagement campaigns. |
