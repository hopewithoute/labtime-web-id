# Phoenix Channel Integration Sub-Article Design

## Narrative Angle
**Building a Resilient Elixir-React WebSocket Bridge**

### The Core Message
Integrating Phoenix Channels into a single-page React 19 application isn't just about calling `new Socket()`. It requires overcoming the Web Security dilemma (Token Exchange over HTTPOnly cookies), preventing memory leaks during client-side navigation (Context Provider & Reference Counting), and building bulletproof reconnection strategies. 

## Outline

1. **The Problem: Security & State Lifecycle**
   - WebSockets can't transparently pass secure HTTPOnly cookies across domains out-of-the-box in the same way REST APIs do (especially in separated BFF architectures).
   - In a complex SPA, components mount and unmount rapidly. Naive WebSocket integration leads to zombie connections, duplicated channels, and frontend memory leaks.

2. **The Architecture (Infographic)**
   - Display a 3-step flow:
     - 1. BFF/Auth -> Generates Short-lived `ws_token` using `Phoenix.Token`.
     - 2. React `WebSocketProvider` -> Constructs `PhoenixSocket` utilizing the token as a query parameter.
     - 3. Elixir Backend -> `LmsSertifikasiWeb.UserSocket` -> Decodes token and mounts the socket.

3. **Secure Token Exchange**
   - We avoid passing long-lived JWTs. Instead, the frontend fetches a short-lived (7-day, matching session) `ws_token` that is cryptographically signed (`Phoenix.Token.sign`).
   - The React app passes this via `?token=...`. If the connection drops and the token is stale, the `onConnectionError` callback fetches a fresh token silently and triggers a reconnect without user intervention.

4. **React Lifecycle & The Singleton Provider**
   - Wrap the entire application in a `<WebSocketContext>`.
   - We use `useRef` to hold the single `PhoenixSocket` instance. This guarantees that route transitions never spawn duplicate physical TCP connections holding onto the server.

5. **Reference Counting: The "Smart" Multiplexer**
   - The coolest part of the React wrapper: *Reference Counting*.
   - If User Profile and Navbar both want to join the `user:123` channel, the `PhoenixSocket.joinChannel()` increments a counter instead of making two Phoenix Channel joins.
   - When User Profile unmounts, it decrements the counter. The underlying Phoenix Channel is only `leave()`-ed when the counter hits zero. This drastically reduces CPU load on the Elixir server.

## Assets Needed
- `websocket-integration-infographic.png` (using standard Nano Banana UI style).
