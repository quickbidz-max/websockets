"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Socket } from "socket.io-client";

interface Message {
  username: string;
  message: string;
  timestamp: string;
}

interface ChatScreenProps {
  socket: Socket;
  username: string;
  onLeave: () => void;
}

export default function ChatScreen({
  socket,
  username,
  onLeave,
}: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [onlineCount, setOnlineCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    socket.emit("join", { username });

    socket.on("joined", (data: { username: string; onlineCount: number }) => {
      setOnlineCount(data.onlineCount);
      setMessages((prev) => [
        ...prev,
        {
          username: "System",
          message: `You joined the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    });

    socket.on(
      "userJoined",
      (data: { username: string; onlineCount: number }) => {
        setOnlineCount(data.onlineCount);
        setMessages((prev) => [
          ...prev,
          {
            username: "System",
            message: `${data.username} joined the chat`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    );

    socket.on("userLeft", (data: { username: string; onlineCount: number }) => {
      setOnlineCount(data.onlineCount);
      setMessages((prev) => [
        ...prev,
        {
          username: "System",
          message: `${data.username} left the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    });

    socket.on("message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("typing", (data: { username: string; isTyping: boolean }) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        if (data.isTyping) {
          newSet.add(data.username);
        } else {
          newSet.delete(data.username);
        }
        return newSet;
      });
    });

    return () => {
      socket.off("joined");
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("message");
      socket.off("typing");
    };
  }, [socket, username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit("message", { message: message.trim() });
      setMessage("");
      handleStopTyping();
    }
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { isTyping: true });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 1000);
  };

  const handleStopTyping = () => {
    if (isTyping) {
      setIsTyping(false);
      socket.emit("typing", { isTyping: false });
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Chat Room</h1>
            <p className="text-sm text-gray-600">
              {onlineCount} {onlineCount === 1 ? "user" : "users"} online
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Logged in as: {username}
            </span>
            <button
              onClick={onLeave}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Leave
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.username === username
                  ? "justify-end"
                  : msg.username === "System"
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
                  msg.username === username
                    ? "bg-indigo-600 text-white"
                    : msg.username === "System"
                    ? "bg-gray-200 text-gray-700 text-sm"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                {msg.username !== "System" && msg.username !== username && (
                  <div className="text-xs font-semibold mb-1 text-gray-600">
                    {msg.username}
                  </div>
                )}
                <div className="break-words">{msg.message}</div>
                <div
                  className={`text-xs mt-1 ${
                    msg.username === username
                      ? "text-indigo-200"
                      : "text-gray-500"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {typingUsers.size > 0 && (
        <div className="px-6 py-2 text-sm text-gray-500 italic">
          {Array.from(typingUsers).join(", ")}{" "}
          {typingUsers.size === 1 ? "is" : "are"} typing...
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="bg-white border-t border-gray-200 px-6 py-4"
      >
        <div className="flex gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onBlur={handleStopTyping}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 ml-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
