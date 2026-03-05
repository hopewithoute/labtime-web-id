# Real-time Synchronization Sub-Article Design

## Narrative Angle
**Surgical Real-time Synchronization: Eliminating Polling with Elixir-to-Frontend Backchannels**

### The Core Message
TanStack Query is excellent for caching, but its reliance on static `staleTime` can lead to stale UI in a multi-device learning platform. We solved this by using our existing WebSocket connections (Phoenix Channels) as a "Backchannel" to push surgical cache invalidation signals from the Elixir backend directly to the TanStack Query client, eliminating the need for polling while guaranteeing real-time continuity.

## Outline

1. **The Problem: The "Stale Data" Wall**
   - Explain how passive caching (`staleTime`) fails in multi-device scenarios.
   - Example: A user completes a module on their phone, but their laptop browser still shows it as incomplete because the cache hasn't expired.
   - Traditional solutions (polling) waste bandwidth and server resources.

2. **The Architecture (Infographic)**
   - Show the flow from Database Event -> Ash Notifier -> Phoenix Channel -> TanStack Query Invalidation.

3. **Backend Notifiers (The Brain)**
   - Introduce `QueryInvalidationBroadcaster` (an Ash Notifier).
   - Explain how it watches for `create`, `update`, or `destroy` actions and intelligently maps them to frontend query keys (e.g., `["certifications", cert_id, "modules"]`).

4. **Surgical Invalidation (The Frontend)**
   - Introduce `useInvalidationListener` listening on the `global:lobby` channel.
   - When a signal arrives, it triggers `queryClient.invalidateQueries({ queryKey: key })`, forcing a targeted refetch only for the stale data, rather than a full page reload.

5. **Optimistic Real-time Updates (The Bonus)**
   - For highly sensitive data like learning progress, mention `useCourseRealtime` and `ProgressBroadcaster`, which use `queryClient.setQueryData` to mutate the cache directly without even needing a refetch, achieving O(1) instant sync.

6. **The Result**
   - A highly resilient, real-time UX that scales gracefully. Polling is eliminated, and backend load is drastically reduced.

## Assets Needed
- `websocket-sync-infographic.png` (Generated via AI, Nano Banana theme).
