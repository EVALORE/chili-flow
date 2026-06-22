# Sprint 3

- **What was done:** I implemented the complete CRUD lifecycle for the playlist component. I integrated the frontend interface with the backend services, using modern form schemas to handle data creation and updates safely.
  Implemented a router guard to block unauthorized users from accessing the private library view.

- **Problems:**

1. Page does not refresh after creating or editing a playlist.

2. Risk of memory leaks from open HTTP/Observable subscriptions.

3. Git merge conflicts and deployment errors during a Pull Request. After pushing my feature branch and opening a Pull Request, the deployment pipeline failed. This happened because the parent dev branch had its history rewritten, causing my branch to diverge.

- **Solutions:**

1. I fixed this by utilizing the .reload() method on my rxResource data signal.

2. I resolved this by adding the takeUntilDestroyed(this.destroyRef) operator to the Observable pipe. This ensures that the moment the component or dialog is closed and destroyed, Angular automatically unsubscribes from the stream, cleaning up memory and protecting the application from background leaks.

3. I resolved this by fetching the latest updates from the remote server (git fetch origin) and surgically pulling the correct configuration files directly from the updated development branch using git checkout origin/dev -- package.json. This resolved the code conflicts, synced my dependencies with the team's current setup, and allowed the PR deployment pipeline to build successfully.

- **What I learned:** I use the new rxResource signal to handle fetching data from the server. I now know how to manage loading states using .isLoading(), display error messages with .error(), and refresh data on demand using the .reload() method.

I also learned how to write different types of route guards to protect application pages, and I now have a solid understanding of how a URL moves through the routing event pipeline from start to finish.

Deepened my understanding of how framework performance works under the hood. I studied the internal Change Detection mechanism, Reactive Graph.

- **Plans:** My next primary objective is to engineer the application's central music player capability. I will be implementing signalStore from @ngrx/signals to establish a clean, predictable global state architecture for the audio playback lifecycle.

- **Time spent:** Approximately 20 hours.
