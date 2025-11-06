'use client';

import { useState, FormEvent } from 'react';

interface JoinScreenProps {
  onJoin: (username: string) => void;
}

export default function JoinScreen({ onJoin }: JoinScreenProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username.trim());
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Welcome to Chat
          </h1>
          <p className="text-gray-600">Enter your username to start chatting</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
}

