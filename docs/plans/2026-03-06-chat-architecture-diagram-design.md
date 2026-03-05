# Chat Architecture Scaling Diagram Design

## 1. Overview
This design document outlines the visual structure for an infographic illustrating the chat architecture scaling strategy for the LMS Sertifikasi project, as described in `content/projects/lms-sertifikasi/chat-architecture-scaling.md`.

## 2. Approach: End-to-End Chat Lifecycle (Option 3)
The diagram will trace the journey of a single chat message from the sender through the Elixir Phoenix backend, highlighting the dual-channel routing strategy and the database optimization for offline users.

## 3. Visual Style and Theme
- **Style:** Consistent with the existing infographics (`assessment-engine-infographic.png`, `certification-engine-infographic.png`, `media-gateway-infographic.png`).
- **Theme:** High-tech, dark mode aesthetic, isometric or flowchart style, using glowing accents to represent data flow (WebSockets).
- **Core Colors:** Representing the active/fast track (e.g., green/blue) vs. the batch/persistence track (e.g., orange/purple).

## 4. Diagram Structure

The layout will flow left-to-right or top-to-bottom.

### Phase 1: The Input (Left/Top)
- **Actor:** User (Sender) sending a message via React Client.
- **Action:** Message payload payload enters the system.
- **Node:** **Phoenix Server** (Central Hub).

### Phase 2: The Routing Split (Center)
The Phoenix Server receives the message and evaluates the room members. The flow splits into two distinct paths:

#### Path A: The Ephemeral Track (Online Users)
- **Condition:** Users currently looking at the chat room.
- **Mechanism:** Phoenix Channels (`chat:room:{id}`).
- **Visuals:** Fast, glowing WebSocket line. Bypasses the database entirely for delivery.
- **Label:** "High-bandwidth, zero-latency. Typing state & raw payloads."
- **Destination:** React Clients of online users (Active Room View).

#### Path B: The Persistent Track & Scaling Fix (Offline Users)
- **Condition:** Users not in the room (e.g., browsing a course).
- **The Problem Concept (Faded/Crossed out):** A faded visual showing 50 individual Ash Events & `INSERT` queries causing a bottleneck.
- **The Solution Path:**
    - **Action:** Bypass Ash Domain Events.
    - **Mechanism:** Ecto Batch Insert (`Repo.insert_all`).
    - **Visuals:** A funnel or processing block taking multiple user UUIDs and processing them as a single, large block.
    - **Database Node:** A single, clean line pointing to the Database (PostgreSQL).
    - **Label:** "Opting out of magic: 1 raw SQL INSERT instead of 50."
- **Notification Delivery:**
    - **Mechanism:** Phoenix Channels (`user:{id}`).
    - **Visuals:** Surgical, thin WebSocket lines routing from the Server to the clients.
    - **Destination:** React Clients of offline users (Updating the Unread Badge optimism).

### Phase 3: The Result (Right/Bottom)
- **Summary Box:** Text highlighting the outcome.
    - "50 Queries $\rightarrow$ 1 Ecto Batch Insert"
    - "N+1 Notification Trap Avoided"
    - "Database Connection Pool Healthy"

## 5. Next Steps
1. Transition to the `/writing-plans` skill to create the task plan for finalizing the diagram text/layout and using tools (like `generate_image`, Mermaid, or external tools if the user prefers) to generate the actual asset.
