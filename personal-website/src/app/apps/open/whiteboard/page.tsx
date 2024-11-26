// src/app/apps/open/whiteboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { io, Socket } from 'socket.io-client';
import Canvas from '@/components/apps/whiteboard/Canvas';

export default function WhiteboardPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string>('');
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const socketInstance = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'
    );

    socketInstance.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('userJoined', ({ activeUsers }) => {
      setActiveUsers(activeUsers);
    });

    socketInstance.on('userLeft', ({ activeUsers }) => {
      setActiveUsers(activeUsers);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const joinRoom = (roomId?: string) => {
    if (!socket) return;

    const newRoomId = roomId || nanoid(10);
    socket.emit('joinRoom', newRoomId, ({ success, activeUsers }: { success: boolean; activeUsers: string[] }) => {
      if (success) {
        setRoomId(newRoomId);
        setActiveUsers(activeUsers);
      }
    });
  };

  const leaveRoom = () => {
    if (!socket || !roomId) return;

    socket.emit('leaveRoom', roomId);
    setRoomId('');
    setActiveUsers([]);
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy room ID:', err);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-neutral-600">Connecting to server...</p>
      </div>
    );
  }

  if (!roomId) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-light text-neutral-800">
            Collaborative Whiteboard
          </h1>
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={() => joinRoom()}
              className="px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
            >
              Create New Room
            </button>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Enter Room ID"
                className="px-4 py-2 border border-neutral-300 rounded-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    joinRoom(e.currentTarget.value);
                  }
                }}
              />
              <button
                onClick={(e) => joinRoom(
                  (e.currentTarget.previousElementSibling as HTMLInputElement).value
                )}
                className="px-6 py-2 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 bg-white border-b border-neutral-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-light">Room: {roomId}</h1>
          <button
            onClick={copyRoomId}
            className="px-4 py-1 text-sm bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2"
          >
            {copySuccess ? (
              <>
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Room ID
              </>
            )}
          </button>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            {activeUsers.length} {activeUsers.length === 1 ? 'user' : 'users'} online
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={leaveRoom}
            className="px-4 py-2 text-sm bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Leave Room
          </button>
        </div>
      </div>

      {socket && <Canvas socket={socket} roomId={roomId} />}
    </div>
  );
}
