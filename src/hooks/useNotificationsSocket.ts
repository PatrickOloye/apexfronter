'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/AuthStore';
import { BACKEND_URL } from '@/libs/server-actions/constants';

const SOCKET_URL = BACKEND_URL.replace(/\/$/, '');

interface NotificationSocketState {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
}

export function useNotificationsSocket() {
  const currentUserId = useAuthStore((state) => state.currentUser?.id);
  const socketRef = useRef<Socket | null>(null);
  const hasConnectedRef = useRef(false);
  const [state, setState] = useState<NotificationSocketState>({
    socket: null,
    isConnected: false,
    error: null,
  });

  const disconnect = useCallback(() => {
    const socket = socketRef.current;
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }
    socketRef.current = null;
    hasConnectedRef.current = false;
    setState({ socket: null, isConnected: false, error: null });
  }, []);

  const connect = useCallback(() => {
    if (!currentUserId) return;

    if (socketRef.current && !socketRef.current.disconnected) {
      if (!socketRef.current.connected) socketRef.current.connect();
      return;
    }

    const socket = io(`${SOCKET_URL}/notifications`, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      hasConnectedRef.current = true;
      setState({ socket, isConnected: true, error: null });
    });

    socket.on('disconnect', (reason) => {
      setState((prev) => ({ ...prev, isConnected: false, error: reason }));
    });

    socket.on('connect_error', (error) => {
      setState((prev) => ({ ...prev, isConnected: false, error: error.message }));
    });

    socket.on('error', (err: any) => {
      if (err?.code === 'INVALID_TOKEN' || err?.message === 'Invalid token') {
        socket.disconnect();
        setState((prev) => ({ ...prev, error: 'Authentication failed' }));
      }
    });

    socket.connect();
  }, [currentUserId]);

  const on = useCallback((event: string, handler: (...args: any[]) => void) => {
    const socket = socketRef.current;
    socket?.off(event, handler);
    socket?.on(event, handler);
    return () => socket?.off(event, handler);
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && hasConnectedRef.current) {
        connect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [connect]);

  return { ...state, on };
}
