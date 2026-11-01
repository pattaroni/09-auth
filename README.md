# NoteHub

A notes app with authentication, built with **Next.js 15 (App Router)** and **TypeScript**.

**Live demo:** https://pattaroni-09-auth.vercel.app/

![NoteHub screenshot](./public/screenshot.png)

> Course project at GoIT (Fullstack Developer program). The backend API was provided by the course. I built the whole frontend part: pages, routing, auth flow, data fetching and UI.

## Features

- Sign up, log in, log out
- Private pages (`/notes`, `/profile`) are protected with Next.js middleware
- Session refresh: if the access token is expired but the refresh token is still valid, the middleware gets a new session and the user stays logged in
- Notes: create, view, delete
- Filter notes by tag (Work, Personal, Meeting, Shopping, Todo) in a sidebar
- Search with debounce and pagination
- Note preview in a modal (intercepting routes); on page reload the same URL opens as a full page
- Note draft is saved in localStorage, so the text is not lost after closing the form
- Profile page with username editing
- Loading, error and 404 states, SEO metadata for every page

## Tech stack

- **Next.js 15** (App Router, Route Handlers, Middleware)
- **React 19**, **TypeScript**
- **TanStack Query**: server data, SSR prefetch with `HydrationBoundary`, mutations with cache invalidation
- **Zustand**: auth state and note draft (with `persist`)
- **Axios**
- **CSS Modules**
- Deployed on **Vercel**

## How auth works

1. The browser never calls the external API directly. All requests go through Next.js Route Handlers in `app/api/*`, which work as a small proxy (BFF).
2. On login, the route handler gets `accessToken` and `refreshToken` from the API and saves them as cookies.
3. `middleware.ts` checks the cookies before private and auth pages:
   - no tokens → redirect to `/sign-in`
   - only refresh token → refresh the session, then continue
   - logged-in user opens `/sign-in` or `/sign-up` → redirect to `/`
4. On the client, `AuthProvider` checks the session on app load and puts the user into the Zustand store.

## Project structure

```
app/
  (auth routes)/          sign-in, sign-up
  (private routes)/       notes, profile (protected by middleware)
    notes/filter/
      @sidebar/           parallel route: tags sidebar
      [...slug]/          notes list filtered by tag
  @modal/(.)notes/[id]/   intercepting route: note preview in a modal
  api/                    Route Handlers (proxy to the backend API)
components/               UI components (NoteList, NoteForm, Modal, SearchBox...)
lib/
  api/                    clientApi, serverApi
  store/                  Zustand stores
middleware.ts             route protection and session refresh
```

## Getting started

```bash
git clone https://github.com/pattaroni/09-auth.git
cd 09-auth
npm install
```

Create `.env.local` in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Author

**Oleksii Kyryk**, Frontend Developer
[LinkedIn](https://www.linkedin.com/in/oleksii-kyryk) · [GitHub](https://github.com/pattaroni)
