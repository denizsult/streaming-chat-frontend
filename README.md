# Streaming Chat Frontend

## Live Deployment
🚀 **Production URL:** https://streaming-chat-frontend.vercel.app/  
Deployed on [Vercel](https://vercel.com)

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

**Port Configuration:**
- The frontend runs on `http://localhost:3000` by default
- To use a different port, use: `PORT=<your-port> npm run dev`
- Make sure `NEXT_PUBLIC_API_BASE_URL` points to your backend URL

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

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