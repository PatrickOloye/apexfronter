"use client"
import { useState, useRef, useEffect } from "react"
import { useAuthStore, getRoleBasePath, normalizeRole } from "../store/AuthStore"
import { useRouter } from "next/navigation"
import AppLink from "./AppLink"
import { api } from "../libs/http/api"
import { NotificationsAPI, AdminNotification } from "../libs/server-actions/notifications"
import { useNotificationsSocket } from "@/hooks/useNotificationsSocket"
import { UserProfileDropdown } from "./UserProfileDropdown"

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'warning' | 'info';
  rawType?: string;
  metadata?: Record<string, any>;
};

const Navbar = ({ isScrolled = false, onMenuClick }: { isScrolled?: boolean; onMenuClick?: () => void }) => {
  const user = useAuthStore((state) => state.currentUser)
  const isInitializing = useAuthStore((state) => state.isInitializing)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [remoteUnreadCount, setRemoteUnreadCount] = useState<number | null>(null)
  const { on: onNotifications } = useNotificationsSocket()
  const notificationRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  
  const dashboardRoute = getRoleBasePath(user?.role)
  const unreadCount = remoteUnreadCount ?? notifications.filter(n => !n.read).length

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) {
        setNotifications([])
        setRemoteUnreadCount(null)
        return
      }

      const role = normalizeRole(user?.role)

      try {
        if (role === 'ADMIN' || role === 'SYSTEM_ADMIN') {
          const listResponse = await NotificationsAPI.list(1, 10)
          const items = Array.isArray(listResponse?.notifications) ? listResponse.notifications : []
          const { count } = await NotificationsAPI.unreadCount()
          setRemoteUnreadCount(typeof count === 'number' ? count : 0)
            setNotifications(
              items.map((item: AdminNotification) => ({
                id: item.id,
                title: item.title,
                message: item.message,
                time: new Date(item.createdAt).toLocaleString(),
                read: !!item.readAt,
                type: (item.type || '').includes('CREDIT') ? 'success' : (item.type || '').includes('DEBIT') ? 'warning' : 'info',
                rawType: item.type,
                metadata: item.metadata,
              }))
            )
          return
        }

        const { data } = await api.get('/transactions/user-transactions')
        const transactions = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
        setNotifications(
          transactions.slice(0, 5).map((tx: any) => ({
            id: tx.id,
            title: `${tx.type} ${tx.status}`,
            message: `${tx.currency || 'USD'} ${Number(tx.amount).toFixed(2)} • ${tx.description || 'Transaction update'}`,
            time: new Date(tx.createdAt).toLocaleString(),
            read: false,
            type: tx.status === 'FAILED' ? 'warning' : tx.type === 'CREDIT' ? 'success' : 'info',
          }))
        )
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Failed to load notifications:', error)
        }
        setNotifications([])
      }
    }

    fetchNotifications()
  }, [user?.id, user?.role])

  useEffect(() => {
    if (!user?.id) return
    const role = normalizeRole(user?.role)
    
    // Admin listeners
    if (role === 'ADMIN' || role === 'SYSTEM_ADMIN') {
        const unsubNew = onNotifications('notification:new', () => {
            // refresh logic same as above fetchNotifications but simpler to just call it if extracted
            // For now inline re-fetch or invalidation
             NotificationsAPI.list(1, 10).then((response) => {
                const items = Array.isArray(response?.notifications) ? response.notifications : []
                setNotifications(prev => {
                     // logic to merge? For now just replace
                     return items.map((item: AdminNotification) => ({
                        id: item.id,
                        title: item.title,
                        message: item.message,
                        time: new Date(item.createdAt).toLocaleString(),
                        read: !!item.readAt,
                        type: (item.type || '').includes('CREDIT') ? 'success' : (item.type || '').includes('DEBIT') ? 'warning' : 'info',
                         rawType: item.type,
                        metadata: item.metadata,
                     }))
                });
            })
        })

        const unsubCount = onNotifications('notification:count', (payload: { count: number }) => {
            setRemoteUnreadCount(payload.count)
        })
        
        return () => {
            unsubNew()
            unsubCount()
        }
    } 

    // User listeners
    const unsubBalance = onNotifications('balance:update', () => {
        useAuthStore.getState().fetchCurrentUser(); // Refresh user data (balance)
        // Also refresh transactions list as a notification
        api.get('/transactions/user-transactions').then(({ data }) => {
             const transactions = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
             setNotifications(
                transactions.slice(0, 5).map((tx: any) => ({
                    id: tx.id,
                    title: `${tx.type} ${tx.status}`,
                    message: `${tx.currency || 'USD'} ${Number(tx.amount).toFixed(2)} • ${tx.description || 'Transaction update'}`,
                    time: new Date(tx.createdAt).toLocaleString(),
                    read: false,
                    type: tx.status === 'FAILED' ? 'warning' : tx.type === 'CREDIT' ? 'success' : 'info',
                }))
             )
        });
    });

    return () => {
        unsubBalance();
    }
  }, [user?.id, user?.role, onNotifications])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const markAsRead = async (id: string) => {
    const role = normalizeRole(user?.role)
    try {
      if (role === 'ADMIN' || role === 'SYSTEM_ADMIN') {
        await NotificationsAPI.markRead(id)
        const { count } = await NotificationsAPI.unreadCount()
        setRemoteUnreadCount(typeof count === 'number' ? count : 0)
      }
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to mark notification read:', error)
      }
    }
  }

  const markAllAsRead = async () => {
    const role = normalizeRole(user?.role)
    try {
      if (role === 'ADMIN' || role === 'SYSTEM_ADMIN') {
        await NotificationsAPI.markAllRead()
        const { count } = await NotificationsAPI.unreadCount()
        setRemoteUnreadCount(typeof count === 'number' ? count : 0)
      }
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to mark all notifications read:', error)
      }
    }
  }

  const handleApproveDeletion = async (notification: NotificationItem) => {
    if (!notification.metadata?.approvalId) return
    await NotificationsAPI.approveChatDeletion(notification.metadata.approvalId)
    await markAsRead(notification.id)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <div className="w-2 h-2 bg-emerald-500 rounded-full" />
      case 'warning': return <div className="w-2 h-2 bg-amber-500 rounded-full" />
      default: return <div className="w-2 h-2 bg-blue-500 rounded-full" />
    }
  }

  return (
    <div className={`sticky top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-2.5 transition-all duration-300 w-full ${
      isScrolled ? 'bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm' : 'bg-transparent'
    }`}>
      {/* LEFT SIDE: HAMBURGER & SEARCH */}
      <div className="flex items-center gap-3">
        {/* Hamburger Menu (Mobile & Tablet) */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* SEARCH BAR (Hidden on mobile/tablet, shown on desktop) */}
        <div className='hidden lg:flex items-center gap-2 text-sm rounded-lg bg-white/70 px-3 py-1.5 border border-slate-200 shadow-sm'>
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-[180px] bg-transparent outline-none text-slate-700 placeholder-slate-400 text-sm"
          />
        </div>
      </div>

      {/* ICONS AND USER */}
      <div className='flex items-center gap-3 justify-end'>
        {/* Notifications (Only if logged in) */}
        {user && (
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`relative bg-white/70 hover:bg-white rounded-lg w-9 h-9 flex items-center justify-center transition-all duration-200 border border-slate-200 shadow-sm ${isNotificationOpen ? 'bg-white' : ''}`}
              title="Notifications"
            >
              <svg className="w-[18px] h-[18px] text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className='absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center bg-red-500 text-white rounded-full text-[10px] font-bold shadow-lg'>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="fixed inset-x-4 top-[65px] lg:absolute lg:inset-auto lg:right-0 lg:top-full lg:mt-2 lg:w-80 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                {/* ... existing notification list ... */} 
                {/* To save tokens I won't copy the whole inner content if I can help it, but replace is block-based. */}
                {/* I will assume the inner content is same, but I need to include it for the replace tool. */}
                {/* Actually, let's just wrap the notification block in user check. */}
                 {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
                <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-72 overflow-y-auto no-scrollbar">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-slate-400">
                    <svg className="w-12 h-12 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => {
                         markAsRead(notification.id);
                         if (notification.metadata?.transactionId) {
                            router.push(`${dashboardRoute}/transactions?highlight=${notification.metadata.transactionId}`);
                            setIsNotificationOpen(false);
                         } else if (notification.metadata?.chatId) {
                            router.push(`${dashboardRoute}/chats?chatId=${notification.metadata.chatId}`);
                            setIsNotificationOpen(false);
                         }
                      }}
                      className={`px-4 py-3 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notification.read ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">{notification.message}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{notification.time}</p>
                          {notification.rawType === 'CHAT_DELETION_APPROVAL' && normalizeRole(user?.role) === 'SYSTEM_ADMIN' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleApproveDeletion(notification)
                              }}
                              className="mt-2 text-xs px-2.5 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                              Approve deletion
                            </button>
                          )}
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-2 bg-slate-50 border-t border-slate-100">
                <AppLink 
                  href={`${dashboardRoute}/notifications`}
                  onClick={() => setIsNotificationOpen(false)}
                  className="block text-center py-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                >
                  View All Notifications
                </AppLink>
              </div>
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        {user && <div className="h-6 w-px bg-slate-200 mx-1" />}

        {/* User Avatar Dropdown OR Sign In */}
        {user ? (
          <UserProfileDropdown showDetails tone="light" />
        ) : isInitializing ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-200 animate-pulse" />
            <div className="hidden lg:flex flex-col items-start gap-1">
              <div className="w-20 h-3 rounded bg-slate-200 animate-pulse" />
              <div className="w-12 h-3 rounded bg-slate-200 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <AppLink href="/signin" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                Sign In
            </AppLink>
            <AppLink href="/signup" className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                Open Account
            </AppLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
