'use client';

import React from 'react';
import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
  id: string;
  senderType: 'USER' | 'ADMIN' | 'SYSTEM';
  content: string;
  createdAt: string;
  isOptimistic?: boolean;
  onRetry?: () => void;
}

export function ChatBubble({
  id,
  senderType,
  content,
  createdAt,
  isOptimistic,
  onRetry,
}: ChatBubbleProps) {
  const isUser = senderType === 'USER';
  const isSystem = senderType === 'SYSTEM';
  const isAdmin = senderType === 'ADMIN';

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`${styles.bubble} ${
        isUser ? styles.user : isAdmin ? styles.admin : styles.system
      } ${isOptimistic ? styles.optimistic : ''}`}
      data-message-id={id}
    >
      {isSystem && (
        <div className={styles.systemIcon}>🤖</div>
      )}
      
      <div className={styles.content}>
        <div className={styles.text}>{content}</div>
        
        <div className={styles.meta}>
          <span className={styles.time}>{formatTime(createdAt)}</span>
          {isOptimistic && (
            <span className={styles.pending}>
              Sending...
            </span>
          )}
        </div>
      </div>

      {isOptimistic && onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          ↻ Retry
        </button>
      )}
    </div>
  );
}
