# Design: Boot Sequence SSR Fix

**Date:** 2026-03-08

## The Problem
The current "boot sequence" terminal animation relies on `sessionStorage.getItem('booted')` to ensure it only runs once per browser session.
Because `sessionStorage` is a client-side API, the Nuxt server has no knowledge of the user's boot state during Server-Side Rendering (SSR).
This creates a hydration mismatch:
1. The server renders the page *without* the boot sequence (or with it, but out of sync).
2. The client receives the regular page.
3. Once Vue hydrates on the client, it reads `sessionStorage` and suddenly flashes the black boot screen overlay over the already-rendered content.

## Explored Approaches

1. **Session Cookie (Recommended):** Use `useCookie('booted')` instead of `sessionStorage`. Cookies are sent to the server on every request. During SSR, Nuxt can read this cookie. If it's missing, the server knows to render the boot sequence overlay. If it's present, the server skips it. This completely eliminates the layout shift and flash.
2. **Eager CSS Injection:** Inject a blocking `<script>` in the `<head>` to read `sessionStorage` and attach a CSS class like `.is-booting` to the `<html>` tag before the page renders, then use CSS to hide the layout. This is anti-pattern for SSR frameworks and can delay the First Contentful Paint.

## Selected Design: Session Cookie
We will migrate the state from `sessionStorage` to a standard session cookie (no `maxAge` or `expires` attribute, so it clears when the browser is closed).

### Architecture Changes
- **State Management:** In `app/layouts/default.vue`, replace `sessionStorage.getItem('booted')` with `const bootedCookie = useCookie('booted', { maxAge: undefined })`. Init `showBootSequence` based on `!bootedCookie.value`.
- **E2E Testing:** Tests currently wait for `sessionStorage.getItem('booted') === 'true'`. This must be updated to either wait for `document.cookie.includes('booted=true')` or wait until the `<div v-if="showBootSequence">` element is detached from the DOM. We will update the tests to wait for the cookie or DOM state.

## Trade-offs
- **Pros:** Perfect SSR alignment. No hydration mismatch. No flash of un-booted content. Native to Nuxt's SSR patterns.
- **Cons:** Adds a very small amount of data (~15 bytes) to the headers of every HTTP request to the server while the session is active. This is negligible.
