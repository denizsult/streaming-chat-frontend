# Streaming Chat Frontend

## Overview
This frontend is a ChatGPT-style streaming UI designed to consume a resumable SSE backend.

## Purpose
It demonstrates how a UI should behave when streamed data arrives incrementally and unreliably.

## Architecture Philosophy
Streaming state is client-owned.
Zustand is used for state management with localStorage persistence.

## Feature-Based Structure
All chat-related logic lives under features/chat for clarity and modularity.

## Streaming Lifecycle
1. User submits message
2. Backend session is created
3. SSE connection opens
4. Chunks stream incrementally
5. Completion event finalizes the session

## Reconnection Handling
On refresh, the frontend reconnects automatically using the last received chunk index.
Duplicate chunks are filtered defensively.

## Trade-offs
- Single active stream per tab
- SSE over WebSockets
- Persistent messages for refresh safety

## What This Demonstrates
- Robust SSE consumption
- Resumable streaming UI
- Explicit client-side state ownership