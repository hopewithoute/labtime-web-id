---
title: "Chat at certification scale"
description: "How I split real-time chat into room and user channels, then replaced per-user Ash events with batched Ecto writes to keep unread notifications fast under load."
date: 2026-03-05
tags: ["chat", "phoenix-channels", "ecto", "realtime"]
category: "Infrastructure"
---

> **50 → 1** database queries per message &middot; **Instant** room delivery &middot; **Targeted** unread fan-out without polling

### Chat is easy right up until fan-out shows up
Real-time chat looks straightforward when everyone is online in the same room.

React 19 renders the thread, Phoenix Channels push messages immediately, Presence handles typing state, and the whole thing feels local. That's the easy part.

The hard part starts when one message has to reach people who aren't in the room anymore.

In LMS Sertifikasi, chat isn't a nice extra. It sits inside a certification platform where learners, instructors, and admins move across exams, course players, and review pages. If someone sends a message into a room with 50 offline members, the sender still expects instant delivery, and everyone else still expects their unread badge to update right away.

That's where architecture matters.

### The two-channel split
![Chat Architecture: Dual-Channel Sync](/projects/lms-sertifikasi/chat-architecture-infographic.png)

I split chat traffic into two separate lanes.

1. **Room channel (`chat:room:{id}`)**
   This carries the noisy, high-frequency events: message payloads, typing indicators through `Presence`, and read receipts. It only reaches users who are actively inside the room.

2. **User channel (`user:{id}`)**
   This carries personal state changes that the rest of the app needs to react to, especially unread counts and notification updates when someone is outside the room.

That separation keeps active chat rooms fast and keeps the wider React shell synchronized without forcing every connected client to subscribe to every message body.

It also lines up with how the rest of the platform works. The frontend already uses TanStack Query and targeted invalidation patterns in other domains, so chat follows the same rule: broadcast only what each client actually needs.

### The scaling problem wasn't the message
Online delivery is cheap. Broadcast once to the room and you're done.

Offline delivery is where the cost explodes, because unread state has to be durable.

The backend is built heavily around Ash Framework, so the obvious implementation was also the most natural one: loop through each offline member and call `Ash.create()` for a notification record.

That implementation was correct. It just wasn't cheap.

A single room message with 50 offline members turned into 50 inserts, 50 resource events, and 50 PubSub broadcasts. The message payload stayed small, but the write amplification around it got expensive fast.

### What I ruled out
The first option was `bulk_create` inside Ash.

That cleaned up the API surface, but it didn't remove the underlying cost. Per-record events were still part of the path, which meant the hot spot stayed hot.

I also considered pushing unread notification creation into Oban. That would smooth the spike, but it would also delay the badge update. For certification workflows, delayed unread state is a product problem, not just an engineering tradeoff. If a learner gets a time-sensitive instruction, "eventual unread consistency" isn't good enough.

So the requirement became simple: keep the immediate UX, collapse the write path.

### The hot path drops below the framework
For this flow, I stopped asking the framework to do work it didn't need to do.

Instead of creating notifications one by one through Ash, I build the rows in memory, normalize the IDs up front, and write the full batch with `Repo.insert_all`.

```elixir
notifications = build_notification_maps(offline_members, message)

{inserted_count, _} =
  LmsSertifikasi.Repo.insert_all("notifications", notifications)

Enum.each(notifications, fn n ->
  Endpoint.broadcast("user:#{n.user_id}", "new_notification", n)
end)
```

Now persistence happens in one write, and delivery still stays targeted. Online users get the room broadcast. Offline users get a focused event on their personal channel so the unread UI updates in place.

The same idea applies in reverse when a room gets marked as read. Clear the durable unread state in bulk, then notify only the clients that care.

### Why this trade made sense
I like staying inside framework conventions for most of the system.

This path didn't deserve that abstraction tax.

Chat notifications sit directly on the user experience. They are high-frequency, latency-sensitive, and easy to amplify accidentally. Once I looked at the shape of the workload, the right answer was obvious: keep Ash for the broader domain model, and let raw Ecto handle the narrow path where every extra event hurts.

That's not a failure of the architecture. That's the architecture doing its job.

### The result
The offline notification write path drops from 50 queries to 1.

Room delivery stays instant. Unread badges still move right away. The database pool stays calmer as room size grows, and the frontend doesn't need to fall back to polling or coarse refreshes.

That was the real goal from the start: real-time chat that still feels instant when the room isn't small anymore.