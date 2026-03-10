---
title: "Keeping real-time progress in sync without polling"
description: "How I used backend-driven invalidation and targeted cache updates to keep learner progress in sync across devices without turning the frontend into the source of truth."
date: 2026-03-17
tags: ["phoenix-channels", "tanstack-query", "realtime", "cache-invalidation"]
category: "Infrastructure"
---

### Polling was the wrong fit for this product
In a certification platform, stale state is not just cosmetic.

If a learner completes a module on their phone, their laptop should not keep showing the old state until a timer expires. If an admin changes course structure, the relevant screens should reflect it quickly. Polling can paper over that, but it does it by spending background requests all day whether anything changed or not.

I wanted a model where the backend tells the client exactly when something becomes stale.

### The synchronization model
![Surgical Real-time Synchronization](/projects/lms-sertifikasi/websocket-sync-infographic.png)

The platform already had a real-time transport for interactive features, so I reused that transport for cache synchronization.

When a meaningful backend mutation happens, the server maps that change to the affected client data slices and broadcasts a small invalidation event to connected clients. The frontend listens for those events and refreshes only the matching views.

That means the client refetches the right thing at the right time, without full-page refreshes and without turning every screen into a polling loop.

### Where I invalidated and where I did not
Most state changes work well with targeted invalidation.

A module changes, an enrollment status shifts, a chat-related view needs fresher data. In those cases, the right move is to invalidate the narrow slice that depends on the changed server state.

Some event streams are different. Video progress is high-frequency enough that repeated refetches would be wasteful. For those paths, I used direct client-side cache updates for responsiveness while the backend still handled the durable learning state.

That split mattered. Not every real-time event deserved the same treatment.

### Why this pattern held up
The main decision was not just "use WebSockets." It was deciding that freshness should be driven by backend events instead of client timers.

That gave the LMS a reusable rule. Progress views, completion state, and shared admin surfaces all follow the same idea: the backend decides what changed, and the frontend updates only the views affected by that change.

It also cut background traffic in a way polling never really can. The system spends work when something actually happens.

### The result
Learners got better cross-device continuity, and the frontend stayed in sync without coarse refreshes.

Just as important, business truth stayed in the backend while the browser still felt immediate.
