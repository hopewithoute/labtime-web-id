---
title: "Scaling chat for certification workflows"
description: "How I split chat into room delivery and user-scoped unread updates so notifications stayed fast under load without falling back to polling."
date: 2026-03-17
tags: ["chat", "phoenix-channels", "ecto", "realtime"]
category: "Infrastructure"
---

> **Lower write amplification** &middot; **Instant room delivery** &middot; **Targeted unread updates without polling**

### Chat feels simple until unread state gets involved
Real-time chat looks easy when everyone is active in the same room.

Messages show up instantly, typing feels local, and the whole thing seems straightforward. The pain starts when one message also needs to affect people who are not currently there.

In a certification product, chat is woven into the workflow. Learners, instructors, and admins move between assessments, course views, and review screens. If someone posts in a room with many inactive members, they still expect instant delivery. Everyone else still expects their unread state to change right away.

That is where the write path starts to matter more than the message itself.

### The two-lane model
![Chat Architecture: Dual-Channel Sync](/projects/lms-sertifikasi/chat-architecture-infographic.png)

I split chat traffic into two lanes.

One lane handles noisy room activity: message delivery, typing state, and in-room read behavior. The other handles user-scoped state the rest of the app cares about, especially unread counts and notification updates.

That split kept active rooms fast without forcing every connected client to subscribe to every message body.

### The real scaling problem was unread fan-out
Online delivery was cheap. Broadcast to the room and move on.

Unread state was different because it had to be durable. The first implementation followed the normal domain path: create an unread record for each affected recipient through the usual abstractions. It was correct, but it also did too much per-recipient work on a hot path that could spike hard.

### What I changed
The goal became simple: keep the immediate UX, shrink the write path.

Instead of treating unread fan-out as a series of unrelated writes, I built the affected records in memory, persisted them in a single batched operation, and then emitted targeted user-scoped events so each client could update its unread UI in place.

That bought me the part that actually mattered. Active users still saw instant room activity. Inactive users still got precise unread updates. The database did less repetitive work to make that happen.

### Why I stepped outside the usual abstraction
I generally prefer staying inside framework conventions.

This was one of the places where that would have been expensive for no good reason. Chat notifications sit right on the user experience. They are frequent, latency-sensitive, and easy to amplify accidentally. Once I looked at the workload shape, the answer was pretty clear: keep the broader domain model expressive, but make the unread hot path narrower and cheaper.

### The result
Unread notification fan-out got cheaper without going stale.

Room delivery still felt instant. Unread badges still moved right away. As room size grew, the database stayed calmer and the frontend never had to fall back to polling or coarse refreshes.
