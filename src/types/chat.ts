export interface ChatMessage {
    id: string;
    chatId: string;
    senderType: 'USER' | 'ADMIN' | 'SYSTEM';
    senderId?: string;
    content: string;
    sequence: number;
    createdAt: string;
    idempotencyKey?: string;
}

export interface ChatSession {
    id: string;
    sessionId: string;
    userId?: string;
    status: 'OPEN' | 'LOCKED' | 'CLOSED';
    userEmail?: string;
    userName?: string;
    lastMessageAt: string;
    closedAt?: string;
    createdAt: string;
    messages: ChatMessage[];
    lock?: ChatLock;
    unreadCount?: number;
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

export interface ChatLock {
    id: string;
    chatId: string;
    adminId: string;
    lockedAt: string;
    expiresAt: string;
}

export interface ChatListResponse {
    chats: ChatSession[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ChatStats {
    open: number;
    locked: number;
    closed: number;
    total: number;
}

export interface SocketMessage {
    id: string;
    chatId: string;
    senderType: 'USER' | 'ADMIN' | 'SYSTEM';
    senderId?: string;
    content: string;
    sequence: number;
    createdAt: string;
    idempotencyKey?: string;
}

export interface JoinResponse {
    success?: boolean;
    error?: string;
    chatId?: string;
    sessionId?: string;
    messages?: ChatMessage[];
    status?: string;
}

export interface MessageResponse {
    success?: boolean;
    error?: string;
    messageId?: string;
}

export interface OpenChatResponse {
    success?: boolean;
    error?: string;
    chatId?: string;
    session?: ChatSession;
    lockedBy?: string;
}
