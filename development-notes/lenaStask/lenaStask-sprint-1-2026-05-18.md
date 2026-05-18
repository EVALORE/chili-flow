# Sprint 1

- **What was done:** Created the Album page with nested components, added a request to the Jamendo API to fetch Album data, and created all necessary interfaces to describe the data models. Implemented a custom pipes directive to count and convert track durations into an `mm:ss` format. Began learning and integrating the Spartan UI library and Tailwind CSS to style the components.

- **Problems:**

1. Encountered an ESLint rule error stating that an existing native HTML element (`<tr>`) should not be used directly as a component selector, even though it is required to correctly inherit Spartan table styles and maintain proper browser rendering.

2. To ensure that only one track can play at a time.

3. Event drilling challenge with a deep component hierarchy (PlayButton inside TrackListItem inside TrackList). The click happens at the bottom, but the playingTrackId state needs to be updated at the very top.

- **Solutions:**

1. Updated the `eslint.config.js` file to explicitly allow attribute-based selectors on components.

2. To implement logic using playingTrackId

3. Use Angular's output(). The PlayButton emits a click event up to the TrackListItem, which intercepts it, attaches the track's ID, and immediately emits a custom event up to the TrackList to update the state playingTrackId.

- **What I learned:** How to create project, generate components, pipes, models using Angular CLI. Basic data binding: interpolation, property binding, event binding. Creating and using custom pipes and pipes chain. Designed component communication strategies utilizing modern reactive Signal input() primitives for down-stream properties and output() emitters for upstream event handling. Explored the Angular component lifecycle, using the ngOnInit hook to initiate API data fetching routines on initialization.

- **Plans:** Continue working on the project. Start the next task.

- **Time spent:** Approximately 20 hours.
