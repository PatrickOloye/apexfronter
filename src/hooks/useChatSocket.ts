'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/AuthStore';

import { BACKEND_URL } from '@/libs/server-actions/constants';

const SOCKET_URL = BACKEND_URL;

let sharedAdminSocket: Socket | null = null;
let sharedAdminSocketUsers = 0;

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

export function useChatSocket(options: UseChatSocketOptions = {}) {
    const { autoConnect = true, namespace = '/chat' } = options;
    const { token, user } = useAuthStore();

    const socketRef = useRef<Socket | null>(null);
    const currentTypeRef = useRef<'admin' | 'user' | null>(null);
    const [state, setState] = useState<ChatSocketState>({
        socket: null,
        isConnected: false,
        isConnecting: false,
        error: null,
        sessionId: null,
        chatId: null,
    });

    // Get or create session ID for anonymous users
    const getSessionId = useCallback(() => {
        if (typeof window === 'undefined') return null;

        let sessionId = sessionStorage.getItem('chat-session-id');
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            sessionStorage.setItem('chat-session-id', sessionId);
        }
        return sessionId;
    }, []);

    const connect = useCallback(() => {
        const isAdmin = user?.role === 'ADMIN' || user?.role === 'SYSTEM_ADMIN';
        const newType = isAdmin ? 'admin' : 'user';
        const sessionId = getSessionId();

        // If we have a connected socket of the correct type, reuse it
        if (socketRef.current?.connected && currentTypeRef.current === newType) {
            setState(prev => ({
                ...prev,
                socket: socketRef.current,
                isConnected: true,
                isConnecting: false,
                error: null,
            }));
            return;
        }

        // Disconnect old socket if type changed or not connected
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            if (currentTypeRef.current === 'admin' && sharedAdminSocket) {
                sharedAdminSocket = null;
                sharedAdminSocketUsers = Math.max(sharedAdminSocketUsers - 1, 0);
            }
        }

        setState(prev => ({ ...prev, isConnecting: true, error: null }));

        let socket: Socket;
        if (isAdmin) {
            if (sharedAdminSocket && sharedAdminSocket.connected) {
                socket = sharedAdminSocket;
                currentTypeRef.current = 'admin';
                setState(prev => ({
                    ...prev,
                    socket,
                    isConnected: true,
                    isConnecting: false,
                    error: null,
                }));
                return;
            } else {
                socket = io(`${SOCKET_URL}${namespace}`, {
                    transports: ['websocket', 'polling'],
                    auth: { token },
                    reconnection: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 1000,
                });
                sharedAdminSocket = socket;
            }
        } else {
            socket = io(`${SOCKET_URL}${namespace}`, {
                transports: ['websocket', 'polling'],
                auth: { sessionId },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });
        }

        currentTypeRef.current = newType;
        socketRef.current = socket;

        socket.on('connect', () => {
            setState(prev => ({
                ...prev,
                socket,
                isConnected: true,
                isConnecting: false,
                error: null,
            }));
        });

        socket.on('disconnect', (reason) => {
            setState(prev => ({
                ...prev,
                isConnected: false,
                error: reason === 'io server disconnect' ? 'Server disconnected' : null,
            }));
        });

        socket.on('connect_error', (error) => {
            setState(prev => ({
                ...prev,
                isConnecting: false,
                error: error.message,
            }));
        });

        socket.on('session:init', ({ sessionId: newSessionId }) => {
            if (newSessionId) {
                sessionStorage.setItem('chat-session-id', newSessionId);
                setState(prev => ({ ...prev, sessionId: newSessionId }));
            }
        });

        socket.on('auth:success', ({ adminId }) => {
            console.log('Admin authenticated:', adminId);
        });

        socket.on('error', ({ code, message }) => {
            setState(prev => ({ ...prev, error: message }));
            if (code === 'INVALID_TOKEN') {
                socket.disconnect();
            }
        });

        setState(prev => ({ ...prev, socket, sessionId }));
    }, [token, user, namespace, getSessionId]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            const isAdmin = user?.role === 'ADMIN' || user?.role === 'SYSTEM_ADMIN';
            if (isAdmin) {
                sharedAdminSocketUsers = Math.max(sharedAdminSocketUsers - 1, 0);
                if (sharedAdminSocketUsers === 0) {
                    sharedAdminSocket?.disconnect();
                    sharedAdminSocket = null;
                }
            } else {
                socketRef.current.disconnect();
            }
            socketRef.current = null;
            currentTypeRef.current = null;
            setState(prev => ({
                ...prev,
                socket: null,
                isConnected: false,
                chatId: null,
            }));
        }
    }, [user?.role]);

    // User: Join or create a chat
    const joinChat = useCallback(async (
        options?: { userEmail?: string; userName?: string; metadata?: Record<string, any> }
    ) => {
        return new Promise<{ chatId?: string; messages?: any[]; error?: string }>((resolve) => {
            if (!socketRef.current?.connected) {
                resolve({ error: 'Not connected' });
                return;
            }

            const sessionId = getSessionId();
            socketRef.current.emit('user:join', { sessionId, ...options }, (response: any) => {
                if (response.success) {
                    setState(prev => ({ ...prev, chatId: response.chatId }));
                }
                resolve(response);
            });
        });
    }, [getSessionId]);

    // User: Send a message
    const sendUserMessage = useCallback(async (content: string, idempotencyKey?: string) => {
        return new Promise<{ success?: boolean; messageId?: string; error?: string }>((resolve) => {
            if (!socketRef.current?.connected) {
                resolve({ error: 'Not connected' });
                return;
            }

            const chatId = state.chatId;
            socketRef.current.emit('user:message', { chatId, content, idempotencyKey }, resolve);
        });
    }, [state.chatId]);

    // Admin: Open/lock a chat
    const openChat = useCallback(async (chatId: string) => {
        return new Promise<{ success?: boolean; session?: any; error?: string; lockedBy?: string }>((resolve) => {
            if (!socketRef.current?.connected) {
                resolve({ error: 'Not connected' });
                return;
            }

            socketRef.current.emit('admin:openChat', { chatId }, (response: any) => {
                if (response.success) {
                    setState(prev => ({ ...prev, chatId }));
                }
                resolve(response);
            });
        });
    }, []);

    // Admin: Send a message
    const sendAdminMessage = useCallback(async (content: string, idempotencyKey?: string) => {
        return new Promise<{ success?: boolean; messageId?: string; error?: string }>((resolve) => {
            if (!socketRef.current?.connected) {
                resolve({ error: 'Not connected' });
                return;
            }

            const chatId = state.chatId;
            socketRef.current.emit('admin:message', { chatId, content, idempotencyKey }, resolve);
        });
    }, [state.chatId]);

    // User/Admin: Send typing indicator
    const sendTyping = useCallback((isTyping: boolean, chatIdOverride?: string) => {
        if (!socketRef.current?.connected) return;

        const chatId = chatIdOverride || state.chatId;
        if (!chatId) return;

        const isAdmin = user?.role === 'ADMIN' || user?.role === 'SYSTEM_ADMIN';
        const event = isAdmin ? 'admin:typing' : 'user:typing';
        socketRef.current.emit(event, { chatId, isTyping });
    }, [state.chatId, user?.role]);

    // Admin: Close a chat
    const closeChat = useCallback(async (chatId?: string) => {
        return new Promise<{ success?: boolean; error?: string }>((resolve) => {
            if (!socketRef.current?.connected) {
                resolve({ error: 'Not connected' });
                return;
            }

            socketRef.current.emit('admin:closeChat', { chatId: chatId || state.chatId }, (response: any) => {
                if (response.success) {
                    setState(prev => ({ ...prev, chatId: null }));
                }
                resolve(response);
            });
        });
    }, [state.chatId]);

    // Admin: Release lock without closing
    const releaseChat = useCallback(async (chatId?: string) => {
        return new Promise<{ success?: boolean; error?: string }>((resolve) => {
            if (!socketRef.current?.connected) {
                resolve({ error: 'Not connected' });
                return;
            }

            socketRef.current.emit('admin:releaseChat', { chatId: chatId || state.chatId }, (response: any) => {
                if (response.success) {
                    setState(prev => ({ ...prev, chatId: null }));
                }
                resolve(response);
            });
        });
    }, [state.chatId]);

    // Subscribe to events
    const on = useCallback((event: string, handler: (...args: any[]) => void) => {
        socketRef.current?.on(event, handler);
        return () => socketRef.current?.off(event, handler);
    }, []);

    // Auto-connect on mount
    useEffect(() => {
        const isAdmin = user?.role === 'ADMIN' || user?.role === 'SYSTEM_ADMIN';
        if (isAdmin) {
            sharedAdminSocketUsers += 1;
        }

        if (autoConnect) {
            connect();
        }

        return () => {
            disconnect();
        };
    }, [autoConnect, connect, disconnect, user?.role]);

    // Heartbeat for admin locks
    useEffect(() => {
        if (!state.isConnected || !state.chatId) return;

        const isAdmin = user?.role === 'ADMIN' || user?.role === 'SYSTEM_ADMIN';
        if (!isAdmin) return;

        const interval = setInterval(() => {
            socketRef.current?.emit('admin:heartbeat');
        }, 15000);

        return () => clearInterval(interval);
    }, [state.isConnected, state.chatId, user?.role]);

    // Reconnect on visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && !socketRef.current?.connected) {
                connect();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
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
