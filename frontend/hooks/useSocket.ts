'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    const socketInstance = io(url, {
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    setSocket(socketInstance);
    socketRef.current = socketInstance;

    return () => {
      socketInstance.close();
      setSocket(null);
      setIsConnected(false);
    };
  }, [url]);

  return { socket, isConnected };
};

