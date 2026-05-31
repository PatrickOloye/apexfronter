'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/AuthStore';
import { BACKEND_URL } from '@/libs/server-actions/constants';

const SOCKET_URL = BACKEND_URL.replace(/\/$/, '');

interface UseChatSocketOptions {
  autoConnect?: boolean;
  namespace?: string;
}

interface ChatSocketState {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  sessionId: string | null;
  chatId: string | null;
}

type ChatSocketRole = 'admin' | 'user';

const createMessageKey = () => crypto.randomUUID();

export function useChatSocket(options: UseChatSocketOptions = {}) {
  const { autoConnect = true, namespace = '/chat' } = options;
  const userRole = useAuthStore((state) => state.currentUser?.role);
  const isAdmin = userRole === 'ADMIN' || userRole === 'SYSTEM_ADMIN';
  const socketType: ChatSocketRole = isAdmin ? 'admin' : 'user';

  const socketRef = useRef<Socket | null>(null);
  const stateRef = useRef<ChatSocketState>({
    socket: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    sessionId: null,
    chatId: null,
  });
  const currentTypeRef = useRef<ChatSocketRole | null>(null);
  const hasConnectedRef = useRef(false);
  const hasJoinedRef = useRef(false);
  const joinedKeyRef = useRef<string | null>(null);
  const joinPromiseRef = useRef<Promise<any> | null>(null);

  const [state, setState] = useState<ChatSocketState>(stateRef.current);

  const updateState = useCallback((next: Partial<ChatSocketState>) => {
    stateRef.current = { ...stateRef.current, ...next };
    setState(stateRef.current);
  }, []);

  const getSessionId = useCallback(() => {
    if (typeof window === 'undefined') return null;

    let sessionId = sessionStorage.getItem('chat-session-id');
    if (!sessionId) {
      sessionId = createMessageKey();
      sessionStorage.setItem('chat-session-id', sessionId);
    }
    return sessionId;
  }, []);

  const disconnect = useCallback(() => {
    const socket = socketRef.current;

    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    socketRef.current = null;
    currentTypeRef.current = null;
    hasConnectedRef.current = false;
    hasJoinedRef.current = false;
    joinedKeyRef.current = null;
    joinPromiseRef.current = null;
    updateState({
      socket: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      chatId: null,
    });
  }, [updateState]);

  const connect = useCallback(() => {
    const sessionId = getSessionId();

    if (
      socketRef.current &&
      currentTypeRef.current === socketType &&
      !socketRef.current.disconnected
    ) {
      if (!socketRef.current.connected) {
        socketRef.current.connect();
      }
      updateState({
        socket: socketRef.current,
        isConnected: socketRef.current.connected,
        isConnecting: !socketRef.current.connected,
        error: null,
        sessionId,
      });
      return;
    }

    if (socketRef.current && currentTypeRef.current !== socketType) {
      disconnect();
    }

    const socket = io(`${SOCKET_URL}${namespace}`, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
      auth: { sessionId },
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;
    currentTypeRef.current = socketType;
    updateState({
      socket,
      isConnecting: true,
      error: null,
      sessionId,
    });

    socket.on('connect', () => {
      hasConnectedRef.current = true;
      updateState({
        socket,
        isConnected: true,
        isConnecting: false,
        error: null,
      });
    });

    socket.on('disconnect', (reason) => {
      hasJoinedRef.current = false;
      joinedKeyRef.current = null;
      joinPromiseRef.current = null;
      updateState({
        isConnected: false,
        isConnecting: false,
        error: reason === 'io server disconnect' ? 'Server disconnected' : null,
      });
    });

    socket.on('connect_error', (error) => {
      updateState({
        isConnected: false,
        isConnecting: false,
        error: error.message,
      });
    });

    socket.on('session:init', ({ sessionId: newSessionId }) => {
      if (!newSessionId) return;
      sessionStorage.setItem('chat-session-id', newSessionId);
      updateState({ sessionId: newSessionId });
    });

    socket.on('error', ({ code, message }) => {
      updateState({ error: message || 'Chat connection error' });
      if (code === 'INVALID_TOKEN' || code === 'UNAUTHORIZED') {
        socket.disconnect();
      }
    });

    socket.connect();
  }, [disconnect, getSessionId, namespace, socketType, updateState]);

  const joinChat = useCallback(
    async (
      options?: {
        userEmail?: string;
        userName?: string;
        metadata?: Record<string, any>;
      },
    ) => {
      const socket = socketRef.current;
      if (!socket?.connected) {
        return { error: 'Not connected' };
      }

      const sessionId = getSessionId();
      const joinKey = JSON.stringify({
        sessionId,
        userEmail: options?.userEmail || '',
        userName: options?.userName || '',
      });

      if (
        hasJoinedRef.current &&
        joinedKeyRef.current === joinKey &&
        stateRef.current.chatId
      ) {
        return {
          success: true,
          chatId: stateRef.current.chatId,
          sessionId: stateRef.current.sessionId,
          messages: undefined,
        };
      }

      if (joinPromiseRef.current) return joinPromiseRef.current;

      joinPromiseRef.current = new Promise((resolve) => {
        socket.emit('user:join', { sessionId, ...options }, (response: any) => {
          joinPromiseRef.current = null;
          if (response?.success) {
            hasJoinedRef.current = true;
            joinedKeyRef.current = joinKey;
            updateState({ chatId: response.chatId });
          }
          resolve(response);
        });
      });

      return joinPromiseRef.current;
    },
    [getSessionId, updateState],
  );

  const sendUserMessage = useCallback(
    async (content: string, idempotencyKey = createMessageKey()) => {
      return new Promise<{
        success?: boolean;
        messageId?: string;
        error?: string;
        code?: string;
      }>((resolve) => {
        const socket = socketRef.current;
        if (!socket?.connected) {
          resolve({ error: 'Not connected' });
          return;
        }

        socket.emit(
          'user:message',
          { chatId: stateRef.current.chatId, content, idempotencyKey },
          resolve,
        );
      });
    },
    [],
  );

  const openChat = useCallback(
    async (chatId: string) => {
      return new Promise<{
        success?: boolean;
        session?: any;
        error?: string;
        lockedBy?: string;
      }>((resolve) => {
        const socket = socketRef.current;
        if (!socket?.connected) {
          resolve({ error: 'Not connected' });
          return;
        }

        socket.emit('admin:openChat', { chatId }, (response: any) => {
          if (response?.success) {
            updateState({ chatId });
          }
          resolve(response);
        });
      });
    },
    [updateState],
  );

  const sendAdminMessage = useCallback(
    async (content: string, idempotencyKey = createMessageKey()) => {
      return new Promise<{
        success?: boolean;
        messageId?: string;
        error?: string;
        code?: string;
      }>((resolve) => {
        const socket = socketRef.current;
        if (!socket?.connected) {
          resolve({ error: 'Not connected' });
          return;
        }

        socket.emit(
          'admin:message',
          { chatId: stateRef.current.chatId, content, idempotencyKey },
          resolve,
        );
      });
    },
    [],
  );

  const sendTyping = useCallback(
    (typing: boolean, chatIdOverride?: string) => {
      const socket = socketRef.current;
      if (!socket?.connected) return;

      const chatId = chatIdOverride || stateRef.current.chatId;
      if (!chatId) return;

      socket.emit(isAdmin ? 'admin:typing' : 'user:typing', {
        chatId,
        isTyping: typing,
      });
    },
    [isAdmin],
  );

  const closeChat = useCallback(
    async (chatId?: string) => {
      return new Promise<{ success?: boolean; error?: string }>((resolve) => {
        const socket = socketRef.current;
        if (!socket?.connected) {
          resolve({ error: 'Not connected' });
          return;
        }

        socket.emit(
          'admin:closeChat',
          { chatId: chatId || stateRef.current.chatId },
          (response: any) => {
            if (response?.success) {
              updateState({ chatId: null });
            }
            resolve(response);
          },
        );
      });
    },
    [updateState],
  );

  const releaseChat = useCallback(
    async (chatId?: string) => {
      return new Promise<{ success?: boolean; error?: string }>((resolve) => {
        const socket = socketRef.current;
        if (!socket?.connected) {
          resolve({ error: 'Not connected' });
          return;
        }

        socket.emit(
          'admin:releaseChat',
          { chatId: chatId || stateRef.current.chatId },
          (response: any) => {
            if (response?.success) {
              updateState({ chatId: null });
            }
            resolve(response);
          },
        );
      });
    },
    [updateState],
  );

  const on = useCallback((event: string, handler: (...args: any[]) => void) => {
    const socket = socketRef.current;
    socket?.off(event, handler);
    socket?.on(event, handler);
    return () => socket?.off(event, handler);
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  useEffect(() => {
    if (!state.isConnected || !state.chatId || !isAdmin) return;

    const interval = setInterval(() => {
      socketRef.current?.emit('admin:heartbeat');
    }, 600000);

    return () => clearInterval(interval);
  }, [isAdmin, state.chatId, state.isConnected]);

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

  return {
    ...state,
    connect,
    disconnect,
    joinChat,
    sendUserMessage,
    openChat,
    sendAdminMessage,
    sendTyping,
    closeChat,
    releaseChat,
    on,
  };
}
