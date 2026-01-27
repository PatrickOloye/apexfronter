'use client';

import React from 'react';
import styles from './ChatHeader.module.css';

interface ChatHeaderProps {
  chatId: string;
  sessionId: string;
  userEmail?: string;
  userName?: string;
  status: 'OPEN' | 'LOCKED' | 'CLOSED';
  isLocked: boolean;
  lockedByMe: boolean;
  adminName?: string;
  createdAt: string;
  onClose?: () => void;
  onRelease?: () => void;
}

export function ChatHeader({
  chatId,
  sessionId,
  userEmail,
  userName,
  status,
  isLocked,
  lockedByMe,
  adminName,
  createdAt,
  onClose,
  onRelease,
}: ChatHeaderProps) {
  const displayName = userName || userEmail || sessionId.substring(0, 8);
  const isClosed = status === 'CLOSED';

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          {displayName.charAt(0).toUpperCase()}
        </div>
        
        <div className={styles.info}>
          <div className={styles.name}>{displayName}</div>
          <div className={styles.meta}>
            {userEmail && <span className={styles.email}>{userEmail}</span>}
            <span className={styles.time}>Started {formatDate(createdAt)}</span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        {/* Status badge */}
        <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>
          {status === 'LOCKED' && isLocked && !lockedByMe
            ? `Handled by ${adminName || 'Admin'}`
            : status}
        </span>

        {/* Action buttons - only show if I have the lock */}
        {lockedByMe && !isClosed && (
          <div className={styles.actions}>
            <button
              className={styles.releaseBtn}
              onClick={onRelease}
              title="Release chat lock"
            >
              Release
            </button>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              title="Close this chat"
            >
              Close Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
