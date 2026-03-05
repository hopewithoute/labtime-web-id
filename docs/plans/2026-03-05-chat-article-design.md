---
title: "Article Design: Chat Feature Architecture"
date: 2026-03-05
status: "approved"
project: "LMS Sertifikasi"
---

# Article Design: The Life of a Chat Message (and How We Scaled It)

## Overview
This article explores the backend architecture and real-time frontend integration of the LMS Sertifikasi chat feature. It takes the reader on a journey from a familiar user action (sending a message) deep into the database optimization required to make it scale for offline users.

## Audience
Full-stack and backend engineers interested in real-time systems, Phoenix Channels, React integration, and ORM optimization (Ecto/Ash Framework).

## Outline

### 1. Introduction & The Chat UX (The Setup)
*   **The Goal:** Building a WhatsApp-like, snappy chat experience deeply integrated into an LMS.
*   **The Tech Stack:** React 19, TanStack Router, Elixir, Phoenix Channels.
*   **The Surface:** Exploring the immediate UX. When a user presses "Send", they see typing indicators (via Phoenix `Presence`), file type validation (images, PDFs), and immediate optimistic UI updates.

### 2. The Dual-Channel Strategy (The Architecture)
*   **The Problem:** We can't broadcast everything globally, nor can we only broadcast to the current room if we want global unread badges to work.
*   **Channel 1: `chat:room:{id}` (The Ephemeral Track):** Handles high-frequency, room-specific data. Raw message payloads, typing state updates, and read receipts. Only affects users actively viewing the room.
*   **Channel 2: `user:{id}` (The Persistent Track):** The inbox sync strategy. Explaining how we broadcast `inbox_updated` events mapped directly to the user's global notification badge, ensuring UI consistency without REST polling.

### 3. The Scaling Crisis (Breaking the ORM)
*   **The Scenario:** What happens when 1 user sends a message to a room with 50 *offline* members? They all need unread notifications.
*   **The Naive Approach (The Trap):** Using standard Ash Framework domain events. Looping through 50 members and invoking `Ash.create()` generates 50 individual `INSERT` statements and 50 corresponding domain events. This creates an N+1 write problem that chokes the database connection pool.

### 4. Deep Ecto Optimization (The Solution)
*   **Opting Out of Magic:** The architectural decision to bypass Ash Framework's high-level semantics specifically for this highly-trafficked, critical path.
*   **Raw Batching (`Repo.insert_all`):** Showcasing the Elixir code. Dumping UUIDs to binaries, stripping broadcast metadata, and executing a single `Ecto.Repo.insert_all` statement for all 50 offline members.
*   **The Symmetrical Delete:** Applying the exact same optimization (`Repo.delete_all`) when marking a room as read to clear out the ephemeral chat notifications.
*   **The Payoff:** Reducing 50 queries to 1. Ensuring the chat system remains blisteringly fast and connection pools stay healthy, regardless of room size.

## Next Steps
Proceed to the `writing-plans` workflow to generate the implementation plan for writing the actual article markdown file based on this design.
