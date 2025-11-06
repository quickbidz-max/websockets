# Quick Setup Guide

## Installation & Running

### 1. Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

Backend will run on: **http://localhost:3001**

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: **http://localhost:3000**

### 3. Usage

1. Open browser to `http://localhost:3000`
2. Enter a username
3. Start chatting!

## Complete File Structure

```
websockets/
├── README.md
├── SETUP.md
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── src/
│       ├── main.ts                          # App entry, CORS config
│       ├── app.module.ts                    # Root module
│       └── chat/
│           ├── chat.module.ts               # Chat module
│           ├── chat.service.ts              # User tracking service
│           ├── chat.controller.ts           # HTTP controller (optional)
│           └── chat/
│               └── chat.gateway.ts          # WebSocket gateway
│
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── postcss.config.mjs
    ├── app/
    │   ├── layout.tsx                       # Root layout
    │   ├── page.tsx                         # Main page (join/chat logic)
    │   └── globals.css                      # Global styles
    ├── components/
    │   ├── JoinScreen.tsx                   # Username entry screen
    │   └── ChatScreen.tsx                   # Chat interface
    └── hooks/
        └── useSocket.ts                     # Socket.IO connection hook
```

## Key Files

### Backend
- **`backend/src/main.ts`**: Server configuration, CORS setup, port 3001
- **`backend/src/chat/chat/chat.gateway.ts`**: WebSocket gateway at `/chat` namespace
- **`backend/src/chat/chat.service.ts`**: In-memory user tracking

### Frontend
- **`frontend/app/page.tsx`**: Main page with join/chat state management
- **`frontend/components/JoinScreen.tsx`**: Username entry form
- **`frontend/components/ChatScreen.tsx`**: Chat UI with messages, typing indicators
- **`frontend/hooks/useSocket.ts`**: Socket.IO connection management

## Features Implemented

✅ Join with username
✅ Global chat room
✅ Live messages
✅ Online user count
✅ Typing indicators
✅ Join/leave notifications
✅ Clean UI with Tailwind CSS
✅ Real-time WebSocket communication

## Troubleshooting

- **Connection issues**: Make sure backend is running on port 3001
- **CORS errors**: Verify backend CORS is configured for `http://localhost:3000`
- **Socket not connecting**: Check browser console for connection errors

