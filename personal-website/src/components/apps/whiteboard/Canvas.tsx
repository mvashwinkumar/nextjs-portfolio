// src/components/apps/whiteboard/Canvas.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

interface CanvasProps {
  socket: Socket;
  roomId: string;
}

interface DrawPoint {
  x: number;
  y: number;
  color: string;
  lineWidth: number;
  type: 'start' | 'draw' | 'end';
}

export default function Canvas({ socket, roomId }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to parent size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Get context
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set initial styles
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;

    // Handle window resize
    const handleResize = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      context.putImageData(imageData, 0, 0);
    };

    window.addEventListener('resize', handleResize);

    // Handle incoming draw events
    socket.on('draw', (drawData: DrawPoint) => {
      if (!contextRef.current) return;

      const ctx = contextRef.current;
      ctx.strokeStyle = drawData.color;
      ctx.lineWidth = drawData.lineWidth;

      if (drawData.type === 'start') {
        ctx.beginPath();
        ctx.moveTo(drawData.x, drawData.y);
      } else if (drawData.type === 'draw') {
        ctx.lineTo(drawData.x, drawData.y);
        ctx.stroke();
      } else if (drawData.type === 'end') {
        ctx.closePath();
      }
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      socket.off('draw');
    };
  }, [socket, color, lineWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!contextRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);

    socket.emit('draw', roomId, {
      x,
      y,
      color,
      lineWidth,
      type: 'start'
    });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();

    socket.emit('draw', roomId, {
      x,
      y,
      color,
      lineWidth,
      type: 'draw'
    });
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;

    contextRef.current.closePath();
    setIsDrawing(false);

    socket.emit('draw', roomId, {
      x: 0,
      y: 0,
      color,
      lineWidth,
      type: 'end'
    });
  };

  const clearCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return;
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-4 p-4 bg-white border-b border-neutral-200">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8"
        />
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
          className="w-32"
        />
        <button
          onClick={clearCanvas}
          className="px-4 py-1 bg-neutral-100 rounded hover:bg-neutral-200 transition-colors"
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="flex-1 bg-white touch-none"
      />
    </div>
  );
}
