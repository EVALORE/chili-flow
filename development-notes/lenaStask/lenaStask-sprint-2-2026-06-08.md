# Sprint 2

- **What was done:** I implemented the core Library Page layout, organizing the architecture into modular components like the playlists list and individual playlist-items using Angular Signals for state management. I built the playlist creation and editing workflows using Spartan UI for accessible dialogs and integrated Signal Forms with custom schemas for clean data validation.

- **Problems:**

1. The app had no dedicated Library entry point.

2. Creating and editing playlists needed reusable form logic.

3. Form state became hard to keep in sync when switching between create and edit modes.

- **Solutions:**

1. I added the Library feature page and wired the library route, then introduced a playlists table UI with loading/error/empty states to make the view ready.

2. I built a shared playlist dialog component, and connected separate create/edit dialogs around it using signal-based forms and validation.

3. I refactored to linkedSignal so form state is derived from mode + selected playlist, which removed manual reset/effect complexity and made dialog state updates more predictable.

- **What I learned:** I learned how to work with modern, reactive Signal Forms, learning how to pass writeable signals to the form() configuration wrapper and bind validation constraints directly to strong data schemas (schema()). I gained a solid understanding of structural signal boundaries, specifically learning that a computed() signal is strictly read-only and cannot be fed into form engines that require a mutable WritableSignal to capture typing events. Used linkedSignal primitive instead.

- **Plans:** Implement a playlist deletion workflow, utilizing a Spartan UI confirmation dialog to prevent accidental destructive actions.
  Develop a detailed view component to display playlist data and its nested track list.

- **Time spent:** Approximately 20 hours.
