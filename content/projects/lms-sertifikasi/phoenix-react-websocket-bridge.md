---
title: "Building a stable Phoenix WebSocket layer"
description: "How I handled connection auth, lifecycle, and subscription reuse so Phoenix WebSocket features stayed stable under heavy navigation."
date: 2026-03-18
tags: ["phoenix-channels", "react", "websockets", "authentication"]
category: "Infrastructure"
---

### Real-time features need a transport layer that behaves
Chat, notifications, and progress sync all depend on the same thing: the WebSocket layer has to be predictable.

In a decoupled React application, that is not automatic. HTTP session state does not map cleanly onto the socket handshake, and a naive client implementation creates another set of problems. Route changes, repeated mounts, and overlapping consumers can leave behind duplicate joins, dead subscriptions, and unnecessary reconnect churn.

I treated that as an architecture problem, not just a hook problem.

### The authentication boundary
![Phoenix React WebSocket Bridge](/projects/lms-sertifikasi/websocket-integration-infographic.png)

I did not want long-lived credentials traveling through the WebSocket handshake.

So the client first requests a short-lived connection credential from the application backend before connecting to the socket transport. That creates a cleaner boundary between the user's authenticated web session and the real-time connection itself.

It also made reconnect behavior easier to reason about. If a reconnect failed because the credential expired, the client could fetch a fresh one and retry without forcing a full-page auth flow.

### One connection, many consumers
The application uses a shared connection layer so the socket transport lives above normal route churn.

That matters in a product with many real-time surfaces. Moving between dashboards, course players, assessments, and admin views should not create a new handshake every time the component tree changes. A single persistent connection gives the frontend a stable transport and keeps avoidable connection overhead off the backend.

### Reusing subscriptions
The next problem shows up inside the connection itself.

Multiple components often need the same user-scoped stream at once. A navigation shell, a notifications panel, and a page-level view can all want the same updates. If each one joins independently, both client and server do duplicate work for no real benefit.

So I added reference-counted subscription reuse. The first consumer creates the subscription. Later consumers reuse it. The transport only leaves once the final consumer unmounts.

### The result
That made the real-time layer cheaper and less fragile, especially when the same user state appeared in several places at once.

The frontend behaves better under route churn, reconnects are easier to recover from, and the backend sees less duplicate connection work. Ideally, users never notice this layer at all.
