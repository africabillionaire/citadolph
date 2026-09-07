# Interactivity Details

Load when working on inputs, controls, scrolling, paste, shortcuts, or state flows.

---

## Rules

### interactivity-1 — Inputs validate on blur, not on keystroke
Validating email format on every keystroke is aggressive and frustrating. Validate on `blur` (when the user leaves the field) or `submit`. Show inline validation only after the user has had a chance to finish typing.

### interactivity-2 — Paste should just work
Forms must accept pasted data gracefully. Phone number fields should strip non-digits on paste. Date fields should parse multiple formats (`MM/DD/YYYY`, `YYYY-MM-DD`). Credit card fields should auto-format spaces on paste. Never reject valid pasted data because of formatting.

### interactivity-3 — Keyboard shortcuts are discoverable
Show keyboard shortcuts in tooltips (`Cmd+S`) and in a dedicated shortcuts panel (`?` key). Do not rely on power users memorizing undocumented shortcuts. Avoid overriding browser defaults (`Cmd+T`, `Cmd+W`) unless the context makes it unambiguous.

### interactivity-4 — Undo is expected
Every destructive action (delete, move, bulk edit) must have an undo path. If undo is technically impossible, use a confirmation dialog that names the action (copywriting-4). Toast notifications with an "Undo" link are the preferred pattern.

### interactivity-5 — Autocomplete attributes
Use correct `autocomplete` values on every input (`email`, `tel`, `given-name`, `family-name`, `new-password`, `current-password`, `one-time-code`). This enables browser autofill, password managers, and one-time code paste from SMS.

### interactivity-6 — Scroll restoration
When navigating back, restore the previous scroll position. When opening a modal, lock body scroll (`overflow: hidden` on `<body>`) and restore it on close. When closing a modal, return focus to the trigger element.

### interactivity-7 — Debounce and throttle
- **Debounce** search inputs (`300ms`) — fire the query only after the user stops typing.
- **Throttle** scroll and resize handlers (`16ms` = 1 frame) — do not run layout reads on every pixel of scroll.
- **Debounce** save-to-server drafts (`1–2s`) — batch rapid edits into a single network request.

### interactivity-8 — Select all in focused inputs
`Cmd+A` / `Ctrl+A` inside an input should select only that input's text, not the entire page. Ensure inputs trap this shortcut. In multi-select lists, `Cmd+A` should select all items in the list.

### interactivity-9 — Drag handles are visible
Draggable items must have a visible drag handle (grip icon, drag bars) or change cursor to `grab` on hover. Do not rely on users discovering draggability by accident.

### interactivity-10 — File drop zones
Drag-and-drop upload zones must have a visible drop target state (`border-color` change, background tint) when a file is dragged over the window. Accept dropped files anywhere in the zone, not just on a small icon.

### interactivity-11 — Loading state on buttons
A button that triggers an async action must show a loading state: spinner replaces icon or text, button width stays constant, and the button is `disabled` to prevent double-submission. Never leave a button looking idle while a network request is in flight.

### interactivity-12 — Infinite scroll with footer access
Infinite scroll must provide a "Load more" button as a fallback, or a reachable footer with a "Back to top" path. Users who need footer links (privacy, terms, contact) must be able to reach them.

### interactivity-13 — Right-click context menus
If you override the browser context menu, provide all the actions the user expects: copy, paste, inspect. A custom context menu that removes standard actions is hostile. Add your custom actions alongside the standard ones, or use a secondary click zone.

### interactivity-14 — Form dirty state warning
If a user has unsaved changes and attempts to navigate away, show a browser-native `beforeunload` confirmation. Do not auto-save without the user's knowledge unless that is the explicit product contract.

### interactivity-15 — Input masking without cursor hijacking
Phone, date, and currency masks should update the value without jumping the cursor to the end on every keystroke. The cursor must stay where the user expects it. Test masking by typing in the middle of the string.
