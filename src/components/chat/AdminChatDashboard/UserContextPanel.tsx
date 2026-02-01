'use client';

import React from 'react';
import styles from './UserContextPanel.module.css';
import { 
  User, 
  Mail, 
  MapPin, 
  Wallet, 
  CreditCard, 
  RefreshCw, 
  Ban,
  Calendar,
  Hash,
  ExternalLink,
  X
} from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  createdAt: string;
}

interface UserDetails {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  accountNumber?: string;
  balance?: number;
  createdAt?: string;
  city?: string;
  state?: string;
  transactions?: Transaction[];
}

interface ChatInfo {
  id: string;
  userName?: string;
  userEmail?: string;
  userId?: string;
  createdAt: string;
}

interface UserContextPanelProps {
  user: UserDetails | null;
  chat: ChatInfo;
  loading?: boolean;
  onClose?: () => void;
  onViewProfile?: (userId: string) => void;
  onRefund?: (userId: string) => void;
  onTransfer?: (userId: string) => void;
  onFreeze?: (userId: string) => void;
  role?: 'ADMIN' | 'SYSTEM_ADMIN';
}

export function UserContextPanel({
  user,
  chat,
  loading = false,
  onClose,
  onViewProfile,
  onRefund,
  onTransfer,
  onFreeze,
  role = 'ADMIN',
}: UserContextPanelProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const displayName = user 
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || chat.userName || 'Unknown'
    : chat.userName || 'Anonymous User';

  const memberSince = user?.createdAt 
    ? formatDate(user.createdAt)
    : 'Unknown';

  const recentTransactions = (user?.transactions || []).slice(0, 3);

  return (
    <div className={styles.panel}>
      {/* Close Button (Mobile) */}
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={18} />
        </button>
      )}

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <span>Loading user details...</span>
        </div>
      ) : (
        <>
          {/* User Profile Section */}
          <div className={styles.profileSection}>
            <div className={styles.avatar}>
              {displayName.charAt(0).toUpperCase()}
            </div>
            <h3 className={styles.userName}>{displayName}</h3>
            <p className={styles.memberSince}>Member since {memberSince}</p>
          </div>

          {/* Account Balance Widget */}
          {user?.balance !== undefined && (
            <div className={styles.balanceWidget}>
              <div className={styles.balanceHeader}>
                <span className={styles.balanceLabel}>
                  <Wallet size={14} />
                  Account Balance
                </span>
              </div>
              <div className={styles.balanceAmount}>
                {formatCurrency(user.balance)}
              </div>
              {user.accountNumber && (
                <div className={styles.accountNumber}>
                  Account #{user.accountNumber}
                </div>
              )}
            </div>
          )}

          {/* User Info */}
          <div className={styles.infoSection}>
            {(user?.email || chat.userEmail) && (
              <div className={styles.infoRow}>
                <Mail size={16} className={styles.infoIcon} />
                <span className={styles.infoText}>{user?.email || chat.userEmail}</span>
              </div>
            )}
            {(user?.city || user?.state) && (
              <div className={styles.infoRow}>
                <MapPin size={16} className={styles.infoIcon} />
                <span className={styles.infoText}>
                  {[user?.city, user?.state].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
            {user?.accountNumber && (
              <div className={styles.infoRow}>
                <Hash size={16} className={styles.infoIcon} />
                <span className={styles.infoText}>#{user.accountNumber}</span>
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          {recentTransactions.length > 0 && (
            <div className={styles.transactionsSection}>
              <h4 className={styles.sectionTitle}>Recent Activity</h4>
              <div className={styles.transactionsList}>
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className={styles.transactionItem}>
                    <div className={styles.txInfo}>
                      <span className={styles.txDescription}>{tx.description}</span>
                      <span className={styles.txDate}>{formatDate(tx.createdAt)}</span>
                    </div>
                    <span className={`${styles.txAmount} ${tx.type === 'CREDIT' ? styles.credit : styles.debit}`}>
                      {tx.type === 'CREDIT' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
                    </span>
                  </div>
                ))}
              </div>
              {user?.id && onViewProfile && (
                <button 
                  className={styles.viewAllBtn}
                  onClick={() => onViewProfile(user.id)}
                >
                  View All History
                </button>
              )}
            </div>
          )}

          {/* Admin Actions */}
          {user?.id && role === 'SYSTEM_ADMIN' && (
            <div className={styles.actionsSection}>
              <h4 className={styles.sectionTitle}>Admin Actions</h4>
              <div className={styles.actionsGrid}>
                {onRefund && (
                  <button 
                    className={styles.actionBtn}
                    onClick={() => onRefund(user.id)}
                  >
                    <CreditCard size={18} />
                    <span>Refund</span>
                  </button>
                )}
                {onTransfer && (
                  <button 
                    className={styles.actionBtn}
                    onClick={() => onTransfer(user.id)}
                  >
                    <RefreshCw size={18} />
                    <span>Transfer</span>
                  </button>
                )}
                {onFreeze && (
                  <button 
                    className={`${styles.actionBtn} ${styles.danger}`}
                    onClick={() => onFreeze(user.id)}
                  >
                    <Ban size={18} />
                    <span>Freeze Account</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* No User Data Message */}
          {!user && (
            <div className={styles.noUserData}>
              <User size={32} className={styles.noUserIcon} />
              <p>Anonymous user</p>
              <span>No account linked to this chat</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
