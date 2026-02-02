'use client';

import React, { useState } from 'react';
import styles from './ChatListPanel.module.css';
import { Search, MessageSquare, Trash2 } from 'lucide-react';

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
  messages?: { content: string; senderType: string }[];
  user?: {
    accountNumber?: string;
  };
}

interface ChatListPanelProps {
  chats: ChatListItem[];
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
  filter: 'all' | 'open' | 'locked' | 'closed' | 'unread' | 'me';
  onFilterChange: (filter: 'all' | 'open' | 'locked' | 'closed' | 'unread' | 'me') => void;
  loading?: boolean;
  onDelete?: (chatId: string) => void;
  canDelete?: boolean;
  role?: 'ADMIN' | 'SYSTEM_ADMIN';
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
  role = 'ADMIN',
}: ChatListPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

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
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  const getLastMessage = (chat: ChatListItem) => {
    if (chat.messages && chat.messages.length > 0) {
      const lastMsg = chat.messages[chat.messages.length - 1];
      return lastMsg.content.slice(0, 60) + (lastMsg.content.length > 60 ? '...' : '');
    }
    return chat.status === 'CLOSED' ? 'Chat ended' : 'No messages yet';
  };

  const getStatusBadge = (chat: ChatListItem) => {
    if (chat.status === 'CLOSED') {
      return <span className={styles.badgeResolved}>Resolved</span>;
    }
    if (chat.unreadCount && chat.unreadCount > 0) {
      return <span className={styles.badgeNew}>NEW</span>;
    }
    if (chat.lockedByMe) {
      return <span className={styles.badgeYou}>You</span>;
    }
    if (chat.isLocked && !chat.lockedByMe) {
      return <span className={styles.badgeLocked}>Locked</span>;
    }
    return <span className={styles.badgePending}>Open</span>;
  };

  // Filter by search query
  const filteredChats = chats.filter(chat => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      chat.userName?.toLowerCase().includes(q) ||
      chat.userEmail?.toLowerCase().includes(q) ||
      chat.sessionId.toLowerCase().includes(q) ||
      chat.user?.accountNumber?.toLowerCase().includes(q)
    );
  });

  // Define available filters based on role
  const filterOptions: { key: 'all' | 'open' | 'locked' | 'closed' | 'unread' | 'me'; label: string }[] = 
    role === 'SYSTEM_ADMIN' 
      ? [
          { key: 'all', label: 'All' },
          { key: 'me', label: 'Me' },
          { key: 'unread', label: 'Unread' },
          { key: 'open', label: 'Open' },
          { key: 'locked', label: 'Locked' },
          { key: 'closed', label: 'Closed' },
        ]
      : [
          { key: 'all', label: 'All' },
          { key: 'me', label: 'Me' },
          { key: 'unread', label: 'Unread' },
          { key: 'open', label: 'Open' },
          { key: 'locked', label: 'My Chats' },
        ];

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <MessageSquare size={20} className={styles.headerIcon} />
          <h2>Messages</h2>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className={styles.filterPills}>
        {filterOptions.map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.filterPill} ${filter === key ? styles.active : ''}`}
            onClick={() => onFilterChange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className={styles.list}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <span>Loading chats...</span>
          </div>
        ) : filteredChats.length === 0 ? (
          <div className={styles.empty}>
            <MessageSquare size={32} className={styles.emptyIcon} />
            <span>No conversations found</span>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`${styles.chatItem} ${selectedChatId === chat.id ? styles.selected : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              {/* Avatar with online indicator */}
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  {(chat.userName || chat.userEmail || chat.sessionId).charAt(0).toUpperCase()}
                </div>
                {chat.status === 'OPEN' && <div className={styles.onlineIndicator} />}
              </div>

              {/* Chat Info */}
              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <span className={styles.chatName}>
                    {chat.userName || chat.userEmail || `Session ${chat.sessionId.slice(0, 8)}`}
                  </span>
                  <span className={styles.chatTime}>{formatTime(chat.lastMessageAt)}</span>
                </div>
                <div className={styles.chatPreview}>
                  {getLastMessage(chat)}
                </div>
                <div className={styles.chatMeta}>
                  {getStatusBadge(chat)}
                  
                  {/* Unread Count */}
                  {chat.unreadCount && chat.unreadCount > 0 && (
                    <div className={styles.unreadBadge}>
                      {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                    </div>
                  )}
                </div>
              </div>

              {/* Delete Button (SYSTEM_ADMIN only) */}
              {canDelete && onDelete && (
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(chat.id);
                  }}
                  title="Delete Chat"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
