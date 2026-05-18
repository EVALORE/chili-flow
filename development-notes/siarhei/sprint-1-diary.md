# Sprint 1

- **What was done:** Created the Header component for the ChiliFlow project. Set up the project styling foundation with Tailwind 4 and spartan-ng UI library, configured custom brand color tokens, and built a responsive 3-section header (logo + nav links, centered search bar, user button). Implemented a debounced live search with Reactive Forms emitting a typed output event to the parent component.

- **Problems:**

1. The hlmInput directive from spartan-ng applied its own background color, conflicting with the custom pill-shaped wrapper background and creating a visible color mismatch.

2. ESLint flagged the search output name with the @angular-eslint/no-output-native rule because search collides with a native DOM event name.

3. Needed cleanup for the valueChanges subscription without using OnDestroy boilerplate.

- **Solutions:**

1. Set the background on the wrapper <div> only and forced the input to !bg-transparent so the wrapper color shows through uniformly. Acknowledged !important as a temporary trade-off acceptable for a learning project.

2. Renamed the output to searchChange following Angular's valueChange convention to avoid the native event collision.

3. Used takeUntilDestroyed() from @angular/core/rxjs-interop in the constructor to automatically clean up the subscription when the component is destroyed — no manual lifecycle hooks required.

- **What I learned:** How to create project, generate components, Angular 17+ public/ folder convention for static assets (no more src/assets). Working with spartan-ng helm components and how their internal styling can conflict with custom Tailwind classes. The signal-based output() API replacing @Output() decorators. Reactive Forms FormControl with valueChanges, combined with RxJS operators debounceTime and distinctUntilChanged for debounced search input. takeUntilDestroyed() for automatic subscription cleanup. Deeper understanding of computed() (derived state) vs effect() (side effects) and when each is appropriate.

- **Plans:** Set up app.routes.ts with placeholder routes for Discover, Search, Library, and About Us so the navigation links resolve correctly. Replace the temporary isLogged signal with a real auth service.

- **Time spent:** Approximately 25 hours.
