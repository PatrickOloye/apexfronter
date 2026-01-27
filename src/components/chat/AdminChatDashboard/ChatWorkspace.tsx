'use client';

import React, { useRef, useEffect } from 'react';
import { ChatBubble } from '../ChatBubble';
import { ChatInput } from '../ChatInput';
import styles from './ChatWorkspace.module.css';

interface Message {
  id: string;
  senderType: 'USER' | 'ADMIN' | 'SYSTEM';
  content: string;
  createdAt: string;
  isOptimistic?: boolean;
}

interface ChatWorkspaceProps {
  chatId: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  isClosed?: boolean;
  lockedByMe?: boolean;
  isLocked?: boolean; // New prop for general locked state
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}

export function ChatWorkspace({
  chatId,
  messages,
  onSendMessage,
  disabled = false,
  isClosed = false,
  lockedByMe = false,
  isLocked = false,
  onLoadMore,
  hasMore,
  loadingMore,
}: ChatWorkspaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Infinite scroll for loading more messages
  const handleScroll = () => {
    if (!containerRef.current || !onLoadMore || !hasMore || loadingMore) return;
    
    if (containerRef.current.scrollTop === 0) {
      onLoadMore();
    }
  };

  return (
    <div className={styles.workspace}>
      {/* Messages container */}
      <div 
        ref={containerRef}
        className={styles.messages}
        onScroll={handleScroll}
      >
        {/* Load more indicator */}
        {loadingMore && (
          <div className={styles.loadingMore}>Loading more messages...</div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            id={msg.id}
            senderType={msg.senderType}
            content={msg.content}
            createdAt={msg.createdAt}
            isOptimistic={msg.isOptimistic}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className={styles.inputArea}>
        {isClosed ? (
          <div className={styles.closedNotice}>
            This chat has been closed
          </div>
        ) : isLocked && !lockedByMe ? (
           <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-slate-500 text-sm font-medium flex items-center justify-center gap-2">
            <span role="img" aria-label="lock">🔒</span>
            Viewing in Read-Only mode (Locked by another Admin)
          </div>
        ) : !lockedByMe ? (
          <div className={styles.lockNotice}>
            Click on a chat to lock and respond
          </div>
        ) : (
          <ChatInput
            onSend={onSendMessage}
            disabled={disabled || isClosed || !lockedByMe}
            placeholder="Type your response..."
            draftKey={`admin-${chatId}`}
          />
        )}
      </div>
    </div>
  );
}
