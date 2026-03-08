---
title: "Real-time progress sync without polling"
description: "How I used Phoenix Channels and TanStack Query to keep learner progress and shared views synchronized across devices without turning the frontend into the source of truth."
date: 2026-03-11
tags: ["phoenix-channels", "tanstack-query", "realtime", "cache-invalidation"]
category: "Infrastructure"
---

### Polling was the wrong fit for this product
In a certification platform, stale state isn't just a cosmetic problem.

If a learner completes a module on their phone, their laptop shouldn't keep showing the old state until a timer expires. If an admin changes course structure, the relevant screens should reflect it quickly. Polling can patch over that, but it does it by spending background requests all day whether anything changed or not.

I wanted a model where the backend tells the client exactly when something becomes stale.

### The synchronization model
![Surgical Real-time Synchronization](/projects/lms-sertifikasi/websocket-sync-infographic.png)

The platform already used Phoenix Channels for real-time features, so I reused that transport for cache synchronization.

When a meaningful backend mutation happens, an Ash notifier maps that change to the affected TanStack Query keys and broadcasts a small invalidation event to connected clients. The frontend listens for those events and invalidates only the matching slices of cached data.

That means the client refetches the right thing at the right moment, without full-page refreshes and without turning every screen into a polling loop.

### Where I used invalidation and where I didn't
Most state changes work well with targeted invalidation.

A module changes, an enrollment status shifts, a chat-related view needs fresher data. In those cases, `queryClient.invalidateQueries` is the right tool because it keeps the backend as the source of truth while still updating the UI quickly.

Some event streams are different. Video progress is high-frequency enough that repeated refetches would be wasteful. For those paths, I used direct cache updates and local O(1) state changes so the interface stays responsive while the backend continues handling the durable learning state.

That split matters. Not every real-time event deserves the same treatment.

### Why this architecture held up
The main decision here wasn't "use WebSockets." It was deciding that freshness should be driven by backend events instead of client timers.

That gave me a reusable pattern across the LMS. Progress views, completion state, and shared admin surfaces all follow the same rule: the backend decides what changed, and the frontend updates only the views affected by that change.

It also reduced background traffic in a way polling never could. The system spends work when something actually happens.

### The result
Learners get faster cross-device continuity, and the frontend stays in sync without coarse refreshes.

More importantly, the system keeps business truth in the backend while still feeling immediate in the browser. That's the balance I wanted.