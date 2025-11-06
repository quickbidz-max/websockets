'use client';

import { useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import JoinScreen from '../components/JoinScreen';
import ChatScreen from '../components/ChatScreen';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const socketUrl = username ? 'http://localhost:3001/chat' : null;
  const { socket, isConnected } = useSocket(socketUrl || '');

  const handleJoin = (name: string) => {
    setUsername(name);
  };

  const handleLeave = () => {
    if (socket) {
      socket.disconnect();
    }
    setUsername(null);
  };

  if (!username) {
    return <JoinScreen onJoin={handleJoin} />;
  }

  if (!socket || !isConnected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-lg text-gray-600">Connecting to server...</div>
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return <ChatScreen socket={socket} username={username} onLeave={handleLeave} />;
}
