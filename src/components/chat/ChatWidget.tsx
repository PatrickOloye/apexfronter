'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useChatSocket } from '@/hooks/useChatSocket';
import { toast } from 'sonner';
import { ChatMessage } from '@/types/chat';
import styles from './ChatWidget.module.css';
import { useAuthStore } from '@/store/AuthStore';

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
}

export function ChatWidget({ position = 'bottom-right' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name?: string; email?: string }>({});
  const [showInfoForm, setShowInfoForm] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user } = useAuthStore();

  const {
    isConnected,
    isConnecting,
    error,
    chatId,
    sessionId,
    joinChat,
    sendUserMessage,
    sendTyping,
    on,
    connect,
  } = useChatSocket({ autoConnect: false });

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connect when widget opens
  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      connect();
    }
  }, [isOpen, isConnected, isConnecting, connect]);

  // Check if user has already provided info
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedInfo = sessionStorage.getItem('chat-user-info');
      if (savedInfo) {
        try {
          const parsed = JSON.parse(savedInfo);
          setUserInfo(parsed);
          setShowInfoForm(!parsed?.email);
        } catch {
          // ignore
        }
      }
      if (user?.email) {
        setUserInfo(prev => ({
          ...prev,
          email: user.email,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        }));
        setShowInfoForm(false);
      }
    }
  }, [user?.email, user?.firstName, user?.lastName]);

  // Restore draft message
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const draft = sessionStorage.getItem('chat-draft');
    if (draft) {
      setInputValue(draft);
    }
  }, []);

  // Subscribe to socket events
  useEffect(() => {
    if (!isConnected) return;

    const unsubMessage = on('chat:message', (message: ChatMessage) => {
      setMessages(prev => {
        // If message has idempotency key, check if we have an optimistic version
        if (message.idempotencyKey) {
          const optimisticIndex = prev.findIndex(m => m.id === message.idempotencyKey);
          if (optimisticIndex !== -1) {
            // Replace optimistic message with real one
            const newMessages = [...prev];
            newMessages[optimisticIndex] = message;
            return newMessages.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
          }
        }
        
        // Avoid duplicates by checking ID
        if (prev.some(m => m.id === message.id)) {
          return prev;
        }
        return [...prev, message].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
      });
    });

    const unsubBatch = on('chat:messages:batch', (messagesBatch: ChatMessage[]) => {
      setMessages(prev => {
        const merged = [...prev];
        for (const msg of messagesBatch) {
          if (!merged.some(m => m.id === msg.id)) {
            merged.push(msg);
          }
        }
        return merged.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
      });
    });

    const unsubClosed = on('chat:closed', () => {
      setIsClosed(true);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('chat-session-id');
      }
    });

    const unsubTyping = on('chat:typing', (payload: { chatId: string; senderType: string; isTyping: boolean }) => {
      if (!chatId || payload.chatId !== chatId) return;
      if (payload.senderType !== 'ADMIN') return;

      setIsAdminTyping(!!payload.isTyping);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (payload.isTyping) {
        typingTimeoutRef.current = setTimeout(() => setIsAdminTyping(false), 3000);
      }
    });

    return () => {
      unsubMessage();
      unsubBatch();
      unsubClosed();
      unsubTyping();
    };
  }, [isConnected, on, chatId]);

  // Join chat when connected and not showing form (sync state)


  const handleJoinChat = useCallback(async () => {
    setIsLoading(true);
    setIsClosed(false);
    try {
      const response = await joinChat({
        userEmail: userInfo.email,
        userName: userInfo.name,
      });
      
      if (response.messages) {
        setMessages(response.messages);
      }
      if (response.error) {
        console.error('Join error:', response.error);
        toast.error(response.error || "Failed to join chat");
      }
    } finally {
      setIsLoading(false);
    }
  }, [joinChat, userInfo.email, userInfo.name]);

  // Join chat when connected and not showing form (sync state)
  useEffect(() => {
    if (isConnected && !showInfoForm) {
      handleJoinChat();
    }
  }, [isConnected, showInfoForm, handleJoinChat]);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (userInfo.email || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInfoError('Please provide a valid email address.');
      return;
    }
    setInfoError(null);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chat-user-info', JSON.stringify(userInfo));
    }
    
    setShowInfoForm(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isClosed || !isConnected) return;

    const content = inputValue.trim();
    const idempotencyKey = crypto.randomUUID();

    // Optimistic update
    const optimisticMessage: ChatMessage = {
      id: idempotencyKey,
      chatId: chatId || '',
      senderType: 'USER',
      content,
      sequence: messages.length + 1,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMessage]);
    setInputValue('');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chat-draft', '');
    }

    const response = await sendUserMessage(content, idempotencyKey);
    sendTyping(false);
    
    if (response.error) {
      // Auto-recover if session not found (e.g. deleted by admin)
      if (typeof response.error === 'string' && response.error.toLowerCase().includes('not found')) {
          console.log('Session not found, creating new session...');
          if (typeof window !== 'undefined') {
             sessionStorage.removeItem('chat-session-id');
          }
          
          // Attempt to rejoin/create new chat
          const joinRes = await joinChat({
             userEmail: userInfo.email,
             userName: userInfo.name,
          });

          if (!joinRes.error) {
              // Retry sending the message
              const retryRes = await sendUserMessage(content, idempotencyKey);
              if (!retryRes.error) {
                  return; // Successfully recovered and sent
              }
          }
      }

      // Remove optimistic message on error if recovery failed
      setMessages(prev => prev.filter(m => m.id !== idempotencyKey));
      setInputValue(content);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('chat-draft', content);
      }
      console.error('Send error:', response.error);
      toast.error("Failed to send message");
    }
  };

  const handleTypingChange = (value: string) => {
    setInputValue(value);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chat-draft', value);
    }

    if (!isConnected || isClosed) return;

    sendTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => sendTyping(false), 1200);
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleStartNewChat = () => {
    setIsClosed(false);
    setMessages([]);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('chat-session-id');
      sessionStorage.removeItem('chat-draft');
    }
    // If we have user info (logged in), we might want to auto-join or show form.
    // Showing form is safer to let them confirm topic e.g. if we add topic later.
    // For now, simple reset to form.
    setShowInfoForm(true);
  };

  return (
    <div className={`${styles.widget} ${styles[position]}`}>
      {/* ... (keeping wrapper) */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* ... (keeping header) */}
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.headerDot} />
              <span>Support Chat</span>
            </div>
            <button 
              onClick={toggleWidget} 
              className={styles.closeBtn}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className={styles.content}>
            {showInfoForm ? (
              <form onSubmit={handleInfoSubmit} className={styles.infoForm}>
                <p className={styles.infoText}>
                  Hi! Please enter your email to start chat support.
                </p>
                <input
                  type="text"
                  placeholder="Your name"
                  value={userInfo.name || ''}
                  onChange={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  className={styles.input}
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={userInfo.email || ''}
                  onChange={e => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  className={styles.input}
                  required
                />
                {infoError && <div className={styles.error}>{infoError}</div>}
                <button type="submit" className={styles.startBtn}>
                  Start Chat
                </button>
              </form>
            ) : (
              <>
                <div className={styles.messages}>
                  {messages.length === 0 && !isLoading && (
                    <div className={styles.welcome}>
                      <p>👋 Welcome! How can we help you today?</p>
                    </div>
                  )}
                  {isClosed && (
                    <div className={styles.closedNotice}>
                      <p>This session has ended.</p>
                    </div>
                  )}
                  
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.message} ${
                        msg.senderType === 'USER' ? styles.userMessage : styles.adminMessage
                      }`}
                    >
                      <div className={styles.messageBubble}>
                        {msg.content}
                      </div>
                      <span className={styles.messageTime}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className={styles.loading}>
                      <span className={styles.loadingDot} />
                      <span className={styles.loadingDot} />
                      <span className={styles.loadingDot} />
                    </div>
                  )}

                  {isAdminTyping && !isClosed && (
                    <div className={styles.typingIndicator}>
                      <div className={styles.typingDots}>
                        <span />
                        <span />
                        <span />
                      </div>
                      <span className={styles.typingText}>Support is typing…</span>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {isClosed && (
                  <div className={styles.closedBanner}>
                    <p>Your conversation has ended.</p>
                    <button 
                        onClick={handleStartNewChat}
                        className={styles.newChatBtn}
                    >
                        Start New Chat
                    </button>
                  </div>
                )}


                {/* Connection Status */}
                {!isConnected && !isConnecting && (
                  <div className={styles.disconnected}>
                    Disconnected. <button onClick={connect}>Reconnect</button>
                  </div>
                )}

                {/* Input */}
                {!isClosed && (
                  <form onSubmit={handleSendMessage} className={styles.inputForm}>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type a message..."
                      value={inputValue}
                      onChange={e => handleTypingChange(e.target.value)}
                      disabled={!isConnected || isClosed}
                      className={styles.messageInput}
                      maxLength={2000}
                      autoComplete="off"
                    />
                    <button 
                      type="submit" 
                      disabled={!inputValue.trim() || !isConnected || isClosed}
                      className={styles.sendBtn}
                      aria-label="Send message"
                    >
                      →
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleWidget}
        className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnOpen : ''}`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}
