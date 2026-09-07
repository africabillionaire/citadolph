# Copywriting Details

Load when working on microcopy, prompts, help text, errors, or labels.

---

## Rules

### copywriting-1 — Error messages own the fault
Never blame the user. "Something went wrong" or "We couldn't save your changes" is better than "You entered invalid data." The system failed; the user did not.

### copywriting-2 — Buttons describe the outcome
Use "Save changes" not "Submit." Use "Send message" not "OK." The button text should tell the user what will happen when they click it. Verbs alone ("Submit", "OK", "Done") are vague.

### copywriting-3 — Empty state copy is human
"No notifications yet" is better than "0 items found." Add a next step: "When someone mentions you, you'll see it here." Empty states are teaching moments, not dead ends.

### copywriting-4 — Confirmation dialogs name the action
The destructive action button in a confirmation dialog must repeat the verb: "Delete project" not "Yes." This prevents misclicks and makes the user read the dialog.

### copywriting-5 — Placeholder text is not a label
Never use placeholder text as the only label. Placeholders disappear on input and are often low-contrast. Use a visible, persistent label above or beside the input. Placeholder text should show an example, not a label.

### copywriting-6 — Loading states are specific
"Saving…" is better than "Loading…" "Sending your message…" is better than "Please wait." Tell the user what the system is doing, not that it is busy.

### copywriting-7 — Success states are brief
"Saved" is enough. "Your changes have been successfully saved to the database" is noise. If the action is routine, a micro-toast with a checkmark and the verb is sufficient.

### copywriting-8 — Tooltips explain, not repeat
A tooltip should add information, not restate the visible label. "Click to save" on a button labeled "Save" is useless. "Cmd+S to save" is useful.

### copywriting-9 — Form labels are sentence case
Use "Email address" not "Email Address." Sentence case is faster to read and less formal. Exceptions: proper nouns, brand terms, and UI element names ("GitHub", "App Store").

### copywriting-10 — Numbers in context
"3 days left" is better than "Expires in 72 hours" for human comprehension. Use the unit that matches the user's mental model. For precision, add the exact value in parentheses: "3 days left (expires Aug 14, 2026)."

### copywriting-11 — Avoid jargon in user-facing text
"Authentication failed" → "We couldn't sign you in. Please check your password and try again." Every error message should be understandable by a non-technical user.

### copywriting-12 — Progressive disclosure in help text
Show the most common answer first. Hide advanced explanations behind a "Learn more" link. Do not dump a paragraph of documentation into a tooltip.

### copywriting-13 — Pronouns for the system
Use "we" when the system is acting on the user's behalf ("We saved your draft"). Use "you" when addressing the user directly ("You can change this later"). Never use "I" — the system is not a person.

### copywriting-14 — Time formatting
Use relative time for recent events ("2 minutes ago", "yesterday") and absolute time for distant ones ("Aug 14, 2026"). Show both on hover if space allows.

### copywriting-15 — Undo over confirmation
Prefer an undo action to a confirmation dialog. "Message sent. Undo" is less friction than "Are you sure you want to send?" Only use confirmation for destructive, irreversible actions.
