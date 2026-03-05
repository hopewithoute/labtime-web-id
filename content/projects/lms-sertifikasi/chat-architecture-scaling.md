---
title: "The Life of a Chat Message: Scaling Real-Time Notifications"
description: "How we optimized Elixir Phoenix Channels and bypassed Ash Framework events to handle mass offline chat notifications."
date: 2026-03-05
category: "Infrastructure"
---

**The Goal: Snappy UX, Scalable Backend**
When building the chat feature for LMS Sertifikasi, the goal was simple: make it feel as instantaneous as WhatsApp. On the surface, this meant utilizing React 19 and Phoenix Channels for typing indicators and zero-latency message delivery. But beneath the surface, ensuring that offline users received instant, un-choked notifications required breaking out of our standard ORM patterns.

**The Dual-Channel Strategy**
To balance performance and global UI consistency, we split WebSocket traffic into two distinct tracks:

1. **The Ephemeral Track (`chat:room:{id}`):** This high-bandwidth channel handles the raw message payloads, volatile typing state (`Presence`), and read receipts. Importantly, it *only* broadcasts to users actively looking at the room. This prevents a user reading an article from receiving a firehose of chat data they don't currently need.
2. **The Persistent Track (`user:{id}`):** If the user is elsewhere in the platform, how do they know they have unread messages? Enter the personal channel. Instead of polling REST endpoints, the backend broadcasts surgical `inbox_updated` events directly to the user's specific channel. The frontend React shell listens to this event and optimistically updates the unread badge in the header, maintaining absolute state consistency without a single HTTP request.

**The Scaling Crisis: The N+1 Notification Trap**
The dual-channel system works perfectly for online users. But what happens when one user sends a message to a room with 50 *offline* members? Every single one of those 50 users needs an unread notification inserted into the database.

Our standard backend architecture relies heavily on the **Ash Framework**. In a naive implementation, notifying offline users means looping through the 50 members and invoking `Ash.create()` for each. 

Because Ash utilizes robust domain events to broadcast changes, this naive loop generates 50 individual database `INSERT` statements, plus 50 corresponding domain events, plus 50 PubSub broadcasts. For a single chat message, we've instantly choked the database connection pool. This is the "N+1 Notification Trap."
