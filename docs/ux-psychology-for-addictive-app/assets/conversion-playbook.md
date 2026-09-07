# Conversion & Pricing Playbook

Use this asset when optimizing pricing pages, upgrade prompts, paywalls, or checkout flows.

---

## Template A: Three-Tier Pricing Screen

### Layout (top to bottom)
1. **Anchor Tier** (left or top)
   - Highest price, most features
   - Purpose: Make middle tier feel reasonable
   - Visual treatment: Similar card style, slightly muted CTA color

2. **Target Tier** (center, visually elevated)
   - Your desired conversion tier
   - "Most Popular" badge (Social Proof)
   - Slightly larger card, primary CTA color, subtle shadow (Figure/Ground)
   - Price displayed with original struck through: ~~$49~~ $29/month (Anchoring)

3. **Decoy Tier** (right or bottom)
   - Price close to target but with clearly worse feature set
   - Purpose: Make target tier look like obvious best value
   - Visual treatment: Same as anchor, grayed-out CTA

### Copy Framework
- **Headline:** Outcome-based, not feature-based. "Unlock unlimited exports" not "Pro plan features."
- **Loss framing subhead:** "You're currently missing 3 premium features."
- **Social proof bar:** "Join 12,400 teams using Pro" placed inside the target card's Common Region.
- **CTA:** "Upgrade to Pro — Keep my features" (loss framing + ownership language)
- **Dismiss:** "I'll risk limited access" (loss-tinged, not neutral)

### Interaction Design
- **Fitts's Law:** Target CTA is 56 px tall, placed in thumb zone on mobile.
- **Steering Law:** No dropdowns or nested menus in the purchase tunnel.
- **Response time:** Price calculation and tax display in <0.1 s after selection.

---

## Template B: In-App Upgrade Prompt (Modal)

### Trigger Conditions
- User hits a usage limit (natural friction point, not artificial)
- User attempts a premium feature (intent is high)
- Never trigger during primary task flow (Flow State protection)

### Modal Structure
1. **Dark overlay** (Figure/Ground isolation)
2. **Visual:** Side-by-side comparison of current vs. premium state
   - Current: "You're on Free — 3 exports left this month"
   - Premium: "Pro — Unlimited exports + priority support"
3. **Loss framing body:** "If you don't upgrade, you'll lose access to [feature] in 2 days."
4. **Social proof:** "847 users upgraded this week" (specific, recent)
5. **CTA:** "Upgrade now — $9/month" (charm pricing, left-digit effect)
6. **Dismiss:** "Remind me when I run out" (soft exit, not rejection)

### Ethics Check
- [ ] The limit is real, not artificially lowered to force upgrade
- [ ] The user can still complete their core task without upgrading
- [ ] The dismiss button is equally visible and not hidden
- [ ] No fake urgency ("Offer ends in 3 hours" unless true)

---

## Template C: Checkout Flow Optimization

### Step 1: Cart Summary
- Show item image + name + price in a Common Region card
- Display "You saved $X" if discount applied (gain framing after anchor established)
- Auto-apply best available coupon (Smart Default) — do NOT show empty coupon field (primes exit)

### Step 2: Shipping / Delivery
- Pre-fill from device/location data
- Progress bar: 50% → 75% (Goal Gradient)
- One primary action per screen

### Step 3: Payment
- Trust signals at decision point: security badges, "Encrypted checkout" text
- Pyramid of Trust level 4: financial information requires visible security cues
- Smart defaults: saved payment methods surfaced first

### Step 4: Confirmation
- Immediate positive feedback (visceral delight)
- Clear next step: "Track your order" or "Start using Pro now"
- Peak-End Rule: the final interaction must be positive

---

## Pricing Psychology Quick Reference

| Technique | Implementation | Expected Impact |
|-----------|---------------|-----------------|
| Price anchoring | Show highest price first | +15–30% AOV |
| Decoy effect | Add inferior tier near target | +10–20% target conversion |
| Charm pricing | $49 vs $50 | +5–10% conversion |
| Bundle framing | "Save 40%" vs "Buy 3 for $X" | +15–25% AOV |
| Loss framing | "Lose access" vs "Gain features" | +20–35% conversion |
| Social proof | Specific user counts at decision point | +10–15% conversion |
| Scarcity (genuine) | "Only 3 left" / real countdown | +9–25% conversion |
