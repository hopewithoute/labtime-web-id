---
title: "Building a stable Phoenix WebSocket layer"
description: "How I handled authentication, connection lifecycle, and channel reuse between React 19 and Phoenix so real-time features stayed secure and efficient under heavy navigation."
date: 2026-03-14
tags: ["phoenix-channels", "react", "websockets", "authentication"]
category: "Infrastructure"
---

### Real-time features need a dependable transport layer
Chat, notifications, and progress sync all depend on the same thing: the WebSocket layer has to behave predictably.

In a decoupled React SPA, that isn't automatic. HTTP session state doesn't map cleanly onto the socket handshake, and a naive implementation creates a second problem on the client side. Route changes, repeated mounts, and overlapping consumers can leave behind duplicate joins, dead subscriptions, and unnecessary reconnect churn.

I treated that as an architecture problem, not a hook problem.

### The authentication boundary
![Phoenix React WebSocket Bridge](/projects/lms-sertifikasi/websocket-integration-infographic.png)

I didn't want long-lived credentials traveling through the WebSocket handshake.

So the client requests a short-lived signed token from the backend through an Ash RPC before connecting to Phoenix. That token becomes the boundary between the user's authenticated HTTP session and the socket connection itself.

This also made reconnect behavior easier to reason about. If a reconnect fails because the token expires, the client can request a fresh one and retry without forcing a full-page auth dance.

### One connection, many consumers
The app uses a shared `<WebSocketProvider>` so the socket connection lives above normal route churn.

That matters in a product with many real-time surfaces. Navigation between dashboards, course players, exams, and admin views shouldn't create a new handshake every time a component tree changes. A single persistent connection gives the frontend a stable transport and keeps avoidable connection overhead off the backend.

### Reusing channel subscriptions
The other problem shows up inside the connection itself.

Multiple components often need the same channel at once. A navbar, a notifications panel, and a page-level component can all want the same `user:{id}` stream. If each one joins independently, the client and server both do duplicate work for no product benefit.

So I added reference counting around channel joins. The first consumer creates the subscription. Later consumers reuse it. The channel only leaves once the final consumer unmounts.

That kept the real-time layer cheaper and easier to operate, especially when the same user state was visible in several parts of the UI at once.

### The result
This gave the platform a more stable foundation for chat, notifications, unread state, and progress synchronization.

The frontend behaves better under route churn, reconnects are easier to recover from, and the backend sees fewer duplicate joins and less unnecessary channel overhead. That's the kind of plumbing users never notice when it works, which is exactly the point.