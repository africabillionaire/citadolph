# Retention & Habit Design Checklist

Use this asset when designing streaks, notifications, habit loops, re-engagement campaigns, or long-term engagement mechanics.

---

## Habit Loop Design Checklist

### Cue Design
- [ ] Identify the internal trigger (boredom, anxiety, completion of a real-world task, social obligation)
- [ ] Map the external trigger (notification, email, widget, time-based reminder) to the internal state
- [ ] Ensure the cue is contextually relevant, not broadcast spam
- [ ] Time external cues to the user's historical usage pattern, not a generic blast schedule

### Routine Design
- [ ] The action is the simplest possible behavior (one tap, one scroll, one swipe)
- [ ] Entry friction is minimized (no loading screens, no login prompts mid-routine)
- [ ] The routine can be completed in under 60 seconds
- [ ] The routine is visually consistent (Jakob's Law) so it requires zero relearning

### Reward Design (Variable)
- [ ] The reward is not 100% predictable (variable ratio scheduling)
- [ ] Reward types rotate: social validation, novel information, micro-achievement, aesthetic delight
- [ ] There is a "near miss" mechanic (almost won, try again) to sustain engagement without frustration
- [ ] Rewards are delivered within 0.1 s of the action (direct manipulation feel)

### Investment Design
- [ ] The user deposits data, content, preferences, or relationships
- [ ] Investment increases the product's personalized value over time
- [ ] Investment loads the next trigger (e.g., "Your report will be ready tomorrow")
- [ ] The investment is visible and countable (items saved, connections made, streak days)

---

## Streak Mechanics Checklist

### Visibility
- [ ] Streak count is displayed prominently on the home/dashboard screen
- [ ] Streak is represented visually (flame icon, calendar grid, progress ring) not just numerically
- [ ] Milestones are celebrated: 7, 30, 100 days with distinct visual rewards

### Anxiety Management
- [ ] Streak freeze / safety valve exists (reduces fear of one miss = permanent loss)
- [ ] Grace period is communicated clearly (e.g., "You have 2 freezes left this month")
- [ ] Recovery path after break is positive, not shaming: "Start a new streak" not "You failed"

### Social Amplification
- [ ] Optional sharing of streak milestones (autonomy — not forced)
- [ ] Leaderboards are segment-based or friend-based, not global (prevents bottom-performer demotivation)
- [ ] "Streak buddies" or team streaks for relatedness

---

## Flow State Guardrails

### Challenge-Skill Balance
- [ ] Difficulty adapts to user performance (too easy = boredom, too hard = anxiety)
- [ ] Novices get scaffolding; experts get shortcuts
- [ ] Clear skill progression path is visible

### Interruption Shield
- [ ] No pop-ups, upsells, or permission requests during deep-work states
- [ ] Notifications are batched and delivered at session end or natural stopping points
- [ ] Auto-save is aggressive and invisible (no "Saving..." modals)

### Immediate Feedback
- [ ] Every action produces a visible, audible, or haptic response within 0.1 s
- [ ] Progress toward goals is always visible (Zeigarnik Effect)
- [ ] Errors are recoverable without restarting the flow

---

## Re-engagement Trigger Checklist

### Notification Strategy
- [ ] Every notification delivers value in the payload, not just opens the app
- [ ] Copy is tied to user investment: "Your weekly report is ready" not "We miss you"
- [ ] Deep link directly to the relevant content, not the home screen
- [ ] Frequency respects the user's historical session cadence (don't notify daily if they use weekly)

### Email Strategy
- [ ] Subject lines are specific and outcome-based: "Your August insights are ready" not "Check out what's new"
- [ ] Content includes a personalized hook (something the user created or achieved)
- [ ] One clear CTA per email (Hick's Law)
- [ ] Unsubscribe is one click (trust preservation, dark-pattern avoidance)

### Win-Back Campaign
- [ ] First message: Value delivery ("Here's what you built last month")
- [ ] Second message: Social proof ("2,400 users like you started a new streak this week")
- [ ] Third message: Loss framing ("Your data will be archived in 7 days")
- [ ] Final message: Soft close with easy reactivation (one-tap resume)

---

## Gamification Audit

### Intrinsic Motivation Support
- [ ] Autonomy: Users can opt out of gamification elements without penalty
- [ ] Competence: Points reflect genuine skill/effort, not just time spent
- [ ] Relatedness: Social features connect users to each other, not just to the product

### Extrinsic Motivation Hygiene
- [ ] Points and badges are meaningful (not "participation trophies")
- [ ] Leaderboards do not demotivate non-top performers (use percentile or friend-group scope)
- [ ] Streaks have safety valves to prevent anxiety-driven churn
- [ ] Rewards do not replace the core value of the product

### Dark Pattern Screening
- [ ] No artificial scarcity on rewards
- [ ] No forced social sharing for progression
- [ ] No pay-to-win mechanics in non-game contexts
- [ ] Every gamified element has an honest exit ramp

---

## Retention Metrics to Track

| Metric | Target | Principle |
|--------|--------|-----------|
| Day 1 retention | >40% | Onboarding + Aha moment speed |
| Day 7 retention | >20% | Habit loop establishment |
| Day 30 retention | >10% | Streak + flow state design |
| Session frequency | 3+ / week | Variable reward scheduling |
| Session length | Goal-dependent | Flow state maintenance |
| Upgrade rate (freemium) | 2–5% | Endowment + loss framing |
| Churn after break | <15% | Streak recovery + soft re-engagement |
