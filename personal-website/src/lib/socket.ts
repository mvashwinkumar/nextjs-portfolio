// src/lib/socket.ts
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

interface DrawPoint {
  x: number;
  y: number;
  color: string;
  lineWidth: number;
  type: 'start' | 'draw' | 'end';
}

interface RoomData {
  activeUsers: Set<string>;
  createdAt: Date;
}

// In-memory store for rooms
const rooms = new Map<string, RoomData>();

export function initSocket(httpServer: HttpServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : process.env.NEXT_PUBLIC_BASE_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    // Join room handler
    socket.on('joinRoom', (roomId: string, callback) => {
      // Create room if it doesn't exist
      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          activeUsers: new Set(),
          createdAt: new Date()
        });
      }

      socket.join(roomId);
      const roomData = rooms.get(roomId)!;
      roomData.activeUsers.add(socket.id);

      // Notify room about new user
      io.to(roomId).emit('userJoined', {
        userId: socket.id,
        activeUsers: Array.from(roomData.activeUsers)
      });

      callback({
        success: true,
        activeUsers: Array.from(roomData.activeUsers)
      });
    });

    // Drawing handler
    socket.on('draw', (roomId: string, drawData: DrawPoint) => {
      // Broadcast to all users in room except sender
      socket.to(roomId).emit('draw', drawData);
    });

    // Leave room handler
    socket.on('leaveRoom', (roomId: string) => {
      handleLeaveRoom(socket, roomId);
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      // Find and leave all rooms
      const roomIds = Array.from(rooms.keys());
      roomIds.forEach((roomId) => {
        const roomData = rooms.get(roomId);
        if (roomData?.activeUsers.has(socket.id)) {
          handleLeaveRoom(socket, roomId);
        }
      });
    });
  });

  // Cleanup inactive rooms periodically
  setInterval(() => {
    const now = new Date();
    const roomIds = Array.from(rooms.keys());
    roomIds.forEach((roomId) => {
      const roomData = rooms.get(roomId);
      if (roomData?.activeUsers.size === 0) {
        const hoursSinceCreation = 
          (now.getTime() - roomData.createdAt.getTime()) / (1000 * 60 * 60);
        if (hoursSinceCreation > 24) {
          rooms.delete(roomId);
        }
      }
    });
  }, 1000 * 60 * 60); // Check every hour

  return io;
}

function handleLeaveRoom(socket: Socket, roomId: string) {
  const roomData = rooms.get(roomId);
  if (roomData) {
    roomData.activeUsers.delete(socket.id);
    socket.leave(roomId);
    
    // Notify remaining users
    socket.to(roomId).emit('userLeft', {
      userId: socket.id,
      activeUsers: Array.from(roomData.activeUsers)
    });
    
    // Clean up empty rooms older than 24 hours
    if (roomData.activeUsers.size === 0) {
      const hoursSinceCreation = 
        (new Date().getTime() - roomData.createdAt.getTime()) / (1000 * 60 * 60);
      if (hoursSinceCreation > 24) {
        rooms.delete(roomId);
      }
    }
  }
}
