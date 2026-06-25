# Sprint 3

## **What was done:**

Implemented authorization flow for the frontend application based on the `feature/add-authorization` branch. Added routed login and register pages, separated the main application layout from the authentication layout, and protected private routes with an auth guard.

Created auth services for login and registration API calls, session persistence, and centralized auth state. Added an HTTP interceptor to attach bearer tokens to protected backend requests. Added safe return URL handling after successful authentication. Added reusable backend endpoint helpers and updated route tests, auth store tests, session tests, password validator tests, and return URL tests.

Also added and configured Spartan UI components needed for the auth forms, including fields, alerts, spinner, and separator components. Refactored auth-related file names and locations to follow semantic Angular naming rules.

## **Problems:**

Authentication pages needed to work separately from the main application layout, because login and register should not show the normal app header.

Auth state needed to survive page refreshes, but localStorage data can be missing, malformed, or incomplete.

After login or registration, the user needed to return to the original protected page without allowing unsafe external redirects.

The app needed a clean way to attach the access token only to backend API requests and not to authentication requests.

## **Solutions:**

Created `AppLayout` for the main app routes and `AuthLayout` for `/auth/login` and `/auth/register`.

Created `AuthStore` with `@ngrx/signals` to manage user, status, error state, login, register, and logout logic. Used computed signals for authenticated, pending, and success states.

Created `AuthSession` to persist the access token and user in localStorage. Added validation for restored user data and automatic cleanup when stored session data is invalid.

Created return URL utility functions to allow only internal app paths and block unsafe redirects. Login and register pages use this helper before redirecting after successful auth.

Created `authInterceptor` to add `Authorization: Bearer <token>` only for backend API requests, while skipping auth endpoints.

## **What I learned:**

Learned how to organize a complete frontend authorization flow in Angular using standalone routes, layouts, functional guards, functional interceptors, and signal-based state management.

Learned how to use `signalStore`, `rxMethod`, `exhaustMap`, and `tapResponse` to handle async login and registration requests with loading and error states.

Improved understanding of safe session persistence, validating unknown localStorage data, and preventing unsafe return URL redirects.

## **Plans:**

Continue improving the authenticated user experience. Add logout controls in the header, show user-specific navigation state, redirect unauthenticated users to the login page with a return URL, and continue connecting protected playlist operations to the backend authorization flow.

## **Time spent:**

Approximately 20 hours.
