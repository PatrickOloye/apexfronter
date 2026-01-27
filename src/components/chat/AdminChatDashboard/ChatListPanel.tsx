'use client';

import React from 'react';
import styles from './ChatListPanel.module.css';

interface ChatListItem {
  id: string;
  sessionId: string;
  userEmail?: string;
  userName?: string;
  status: 'OPEN' | 'LOCKED' | 'CLOSED';
  lastMessageAt: string;
  createdAt: string;
  unreadCount?: number;
  isLocked?: boolean;
  lockedByMe?: boolean;
}

interface ChatListPanelProps {
  chats: ChatListItem[];
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
  filter: 'all' | 'open' | 'locked' | 'closed';
  onFilterChange: (filter: 'all' | 'open' | 'locked' | 'closed') => void;
  loading?: boolean;
  onDelete?: (chatId: string) => void;
  canDelete?: boolean;
}

export function ChatListPanel({
  chats,
  selectedChatId,
  onSelectChat,
  filter,
  onFilterChange,
  loading,
  onDelete,
  canDelete = false,
}: ChatListPanelProps) {
  const formatTime = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className={styles.panel}>
      {/* Filter tabs */}
      <div className={styles.filters}>
        {(['all', 'open', 'locked', 'closed'] as const).map((key) => (
            <button
            key={key}
            className={`${styles.filterBtn} ${filter === key ? styles.active : ''}`}
            onClick={() => onFilterChange(key)}
            >
            {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
        ))}
      </div>

      {/* Chat list */}
      <div className={styles.list}>
        {loading ? (
          <div className={styles.loading}>Loading chats...</div>
        ) : chats.length === 0 ? (
          <div className={styles.empty}>No chats found</div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`${styles.chatItem} ${selectedChatId === chat.id ? styles.selected : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className={styles.chatAvatar}>
                {(chat.userName || chat.userEmail || chat.sessionId).charAt(0).toUpperCase()}
              </div>

              <div className={styles.chatInfo}>
                <div className={styles.chatName}>
                  {chat.userName || chat.userEmail || chat.sessionId.substring(0, 8)}
                </div>
                <div className={styles.chatPreview}>
                  {chat.status === 'CLOSED' ? 'Chat closed' : 'Click to view'}
                </div>
              </div>

              {(chat.unreadCount || 0) > 0 && (
                <div className="flex-shrink-0 mx-2">
                   <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                     <span className="text-[10px] font-bold text-white leading-none">
                       {chat.unreadCount && chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                     </span>
                   </div>
                </div>
              )}

              <div className={styles.chatMeta}>
                <div className={styles.chatTime}>{formatTime(chat.lastMessageAt)}</div>
                <div className="flex items-center gap-1">
                   <div className={`${styles.chatStatus} ${styles[chat.status.toLowerCase()]}`}>
                    {chat.isLocked && !chat.lockedByMe && '🔒'}
                    {chat.lockedByMe && '👤'}
                  </div>
                  {canDelete && onDelete && (
                    <button
                      className="p-1 hover:bg-red-100 text-slate-400 hover:text-red-600 rounded transition-colors ml-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(chat.id);
                      }}
                      title="Delete Chat"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
