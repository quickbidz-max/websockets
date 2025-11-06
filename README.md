# Real-Time Chat Application

A complete real-time chat application built with Next.js (App Router) for the frontend and NestJS for the backend, using Socket.IO for WebSocket communication.

## Features

### Frontend
- ✅ Join with a username
- ✅ Global chat room
- ✅ Live messages
- ✅ Online user count
- ✅ "User is typing..." indicator
- ✅ Clean UI with join screen + chat screen
- ✅ Tailwind CSS styling

### Backend
- ✅ WebSocket Gateway at `/chat`
- ✅ Broadcast messages
- ✅ Broadcast join/leave events
- ✅ Broadcast typing events
- ✅ Track online user count
- ✅ In-memory user tracking
- ✅ CORS enabled for `http://localhost:3000`

## Project Structure

```
websockets/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── chat/
│   │   │   ├── chat/
│   │   │   │   └── chat.gateway.ts    # WebSocket gateway
│   │   │   ├── chat.module.ts
│   │   │   ├── chat.service.ts        # User tracking service
│   │   │   └── chat.controller.ts
│   │   ├── app.module.ts
│   │   └── main.ts                    # App entry point
│   └── package.json
│
└── frontend/                # Next.js frontend
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx                   # Main page
    │   └── globals.css
    ├── components/
    │   ├── JoinScreen.tsx             # Join screen component
    │   └── ChatScreen.tsx             # Chat screen component
    ├── hooks/
    │   └── useSocket.ts               # Socket.IO hook
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Start both the backend and frontend servers (in separate terminals)
2. Open your browser and navigate to `http://localhost:3000`
3. Enter a username on the join screen
4. Start chatting in the global chat room!

## How It Works

### Backend (NestJS)

- **ChatGateway** (`chat.gateway.ts`): Handles all WebSocket connections and events
  - `join`: User joins the chat
  - `message`: Broadcasts messages to all users
  - `typing`: Broadcasts typing indicators
  - Connection/disconnection handling

- **ChatService** (`chat.service.ts`): Manages user tracking
  - Stores connected users in memory
  - Tracks online user count
  - Handles user addition/removal

### Frontend (Next.js)

- **JoinScreen**: Initial screen where users enter their username
- **ChatScreen**: Main chat interface with:
  - Message display
  - Message input
  - Online user count
  - Typing indicators
  - Leave button

- **useSocket Hook**: Manages Socket.IO connection and state

## Technologies Used

### Backend
- NestJS
- TypeScript
- Socket.IO (`@nestjs/platform-socket.io`)
- WebSockets (`@nestjs/websockets`)

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Socket.IO Client

## Development

### Backend Commands
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run lint` - Run linter

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter

## Notes

- The backend runs on port **3001** by default
- The frontend runs on port **3000** by default
- User tracking is in-memory (users are lost on server restart)
- CORS is configured for `http://localhost:3000` only

## License

UNLICENSED

