'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/AuthStore';

import { BACKEND_URL } from '@/libs/server-actions/constants';

const SOCKET_URL = BACKEND_URL;

interface NotificationSocketState {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
}

export function useNotificationsSocket() {
  const { token, user } = useAuthStore();
  const socketRef = useRef<Socket | null>(null);
  const [state, setState] = useState<NotificationSocketState>({
    socket: null,
    isConnected: false,
    error: null,
  });

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return;
    if (!token || !user) return;

    const socket = io(`${SOCKET_URL}/notifications`, {
      transports: ['websocket', 'polling'],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setState({ socket, isConnected: true, error: null });
    });

    socket.on('disconnect', (reason) => {
      setState((prev) => ({ ...prev, isConnected: false, error: reason }));
    });

    socket.on('connect_error', (error) => {
      setState((prev) => ({ ...prev, error: error.message }));
    });

    socket.on('error', (err: any) => {
      if (err?.code === 'INVALID_TOKEN' || err?.message === 'Invalid token') {
        socket.disconnect();
        setState(prev => ({ ...prev, error: 'Authentication failed' }));
      }
    });
  }, [token, user]);

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setState({ socket: null, isConnected: false, error: null });
  }, []);

  const on = useCallback((event: string, handler: (...args: any[]) => void) => {
    socketRef.current?.on(event, handler);
    return () => socketRef.current?.off(event, handler);
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { ...state, on };
}
