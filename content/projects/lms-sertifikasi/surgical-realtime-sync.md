---
title: "Surgical Real-time Synchronization"
description: "Eliminating polling with Elixir-to-Frontend WebSocket backchannels for surgical TanStack Query invalidation."
date: 2026-01-25
category: "Infrastructure"
---

**The Problem: The "Stale Data" Wall**  
TanStack Query is a phenomenal tool for handling asynchronous state, but by default, it is passive. It relies on a static `staleTime` or window focus events to refetch data. In a modern learning ecosystem, this creates friction: if a user finishes a quiz on their phone, their laptop browser will still show the module as incomplete until the cache expires or the page is refreshed. The traditional solution is polling, which hammers the server and wastes bandwidth.

**The Architecture**  
![Surgical Real-time Synchronization](/projects/lms-sertifikasi/websocket-sync-infographic.png)

To solve this, we repurposed our existing **Phoenix Channels** (WebSockets) into a dedicated "Backchannel" for cache invalidation, creating a proactive bridge between our Elixir backend and React frontend.

1. **Backend Notifiers (The Brain)**: We built an **Ash Notifier (`QueryInvalidationBroadcaster`)** that hooks into the lifecycle of our resources. Whenever a significant mutation occurs (e.g., a Module is updated), the backend calculates exactly which frontend views will be affected.
2. **Key Mapping Logic**: The notifier translates the database event into a precise **TanStack Query Key** (e.g., `["certifications", cert_id, "modules"]`) and broadcasts it over the `global:lobby` WebSocket channel.
3. **Surgical Invalidation (Frontend)**: On the client, a custom `useInvalidationListener` hook listens for these signals. Instead of triggering a full page reload, it executes `queryClient.invalidateQueries(key)`. This surgical strike forces TanStack Query to stealthily refetch only the specific data slice that went stale.
4. **Optimistic Direct Cache Mutations**: For extremely latency-sensitive actions like ticking up a video progress bar, we implemented a specialized `ProgressBroadcaster`. Instead of invalidating and refetching, it broadcasts the exact payload needed for `queryClient.setQueryData`, updating the UI instantly in O(1) time without hitting the network again.

**The Result: Instant Multi-Device Continuity**  
By making the backend the proactive source of truth for cache freshness, we completely eliminated REST polling. Users get an instant, magically synchronized experience across all their devices, while the backend enjoys vastly reduced baseline load.
