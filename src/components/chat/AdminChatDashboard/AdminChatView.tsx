'use client';

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useChatSocket } from '@/hooks/useChatSocket';
import { ChatAPI } from '@/libs/server-actions/chat';
import { AdminService, User as AdminUser } from '@/libs/server-actions/admin';
import { ChatSession, ChatMessage, ChatStats } from '@/types/chat';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { useAuthStore } from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from './DashboardHeader';
import { ChatListPanel } from './ChatListPanel';
import { ChatWorkspace } from './ChatWorkspace';
import { ChatHeader } from './ChatHeader';
import { UserContextPanel } from './UserContextPanel';
import { 
  CreditCard,
  Shield,
  Search,
  User as UserIcon,
  ArrowLeft,
  Lock,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

interface AdminChatViewProps {
  role: 'ADMIN' | 'SYSTEM_ADMIN';
}

export default function AdminChatView({ role }: AdminChatViewProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  
  // State
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [stats, setStats] = useState<ChatStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'locked' | 'closed' | 'unread' | 'me'>('all');
  const [manualOffline, setManualOffline] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showUserDetailsPanel, setShowUserDetailsPanel] = useState(true);
  
  // Advanced Filters (SYSTEM_ADMIN only)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterByAdminId, setFilterByAdminId] = useState<string>('');
  const [filterByEmail, setFilterByEmail] = useState<string>('');
  const [filterByAccountNumber, setFilterByAccountNumber] = useState<string>('');
  const [availableAdmins, setAvailableAdmins] = useState<AdminUser[]>([]);
  
  // User Details
  const [selectedUserDetails, setSelectedUserDetails] = useState<AdminUser | null>(null);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  
  // Modals
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<ChatSession | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Socket Hook
  const {
    isConnected,
    error: socketError,
    chatId: activeChatId,
    openChat,
    sendAdminMessage,
    sendTyping,
    closeChat,
    releaseChat,
    on,
    connect,
    disconnect
  } = useChatSocket({ autoConnect: false });

  // Handle URL Query Params
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialChatId = searchParams?.get('chatId');

  // Actions
  const loadChats = React.useCallback(async () => {
    try {
      const statusMap: Record<string, string | undefined> = {
        all: undefined, open: 'OPEN', locked: 'LOCKED', closed: 'CLOSED', me: undefined
      };

      const isAdmin = role === 'ADMIN';
      const queryParams: any = {
        status: isAdmin ? undefined : statusMap[filter],
        available: isAdmin ? true : undefined,
      };

      // Add advanced filters (SYSTEM_ADMIN only)
      if (role === 'SYSTEM_ADMIN') {
        if (filterByAdminId) queryParams.filterByAdminId = filterByAdminId;
        if (filterByEmail) queryParams.filterByEmail = filterByEmail;
        if (filterByAccountNumber) queryParams.filterByAccountNumber = filterByAccountNumber;
      }

      const res = await ChatAPI.getSessions(queryParams);

      let loadedChats = res.chats || [];

      if (isAdmin) {
        if (filter === 'open') {
          loadedChats = loadedChats.filter(c => c.status === 'OPEN');
        } else if (filter === 'locked') {
          loadedChats = loadedChats.filter(c => c.lock?.adminId === user?.id);
        } else if (filter === 'unread') {
          loadedChats = loadedChats.filter(c => (c.unreadCount || 0) > 0);
        } else if (filter === 'me') {
          // Show chats where current admin is locked/responding to
          loadedChats = loadedChats.filter(c => c.lock?.adminId === user?.id || (c.status === 'OPEN' && !c.lock?.adminId));
        }
      } else if (filter === 'unread') {
        loadedChats = loadedChats.filter(c => (c.unreadCount || 0) > 0);
      } else if (filter === 'me') {
        // For SYSTEM_ADMIN: "Me" means chats assigned to this admin
        loadedChats = loadedChats.filter(c => c.lock?.adminId === user?.id);
      }

      // Enforce sort by last message
      loadedChats.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
      setChats(loadedChats);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  }, [filter, role, user?.id, filterByAdminId, filterByEmail, filterByAccountNumber]);

  const loadStats = async () => {
    try {
        const s = await ChatAPI.getStats();
        setStats(s);
    } catch (e) { console.error(e); }
  };

  const handleSelectChat = React.useCallback(async (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (!chat || selectedChat?.id === chat.id) return;

    // Release current if locked by me? 
    if (activeChatId && activeChatId !== chat.id) {
       await releaseChat();
    }
    
    if (chat.status === 'CLOSED') {
         const res = await ChatAPI.getSession(chat.id);
         setSelectedChat(res);
         return;
    }

    if (role === 'SYSTEM_ADMIN' && chat.status === 'LOCKED' && chat.lock?.adminId !== user?.id) {
        const res = await ChatAPI.getSession(chat.id);
        setSelectedChat(res);
    } else {
        const response = await openChat(chat.id);
        if (response.success && response.session) {
            setSelectedChat(response.session);
        } else if (response.error) {
           if (role === 'SYSTEM_ADMIN') {
               const res = await ChatAPI.getSession(chat.id);
               setSelectedChat(res);
           } else {
               toast.error(response.error);
           }
        }
    }
  }, [chats, selectedChat?.id, activeChatId, releaseChat, openChat, role, user?.id]);

  const handleSendMessage = async (content: string) => {
    if (!selectedChat) return;
    const idempotencyKey = crypto.randomUUID();
    
    // Optimistic update
    const optimistic: ChatMessage = {
        id: idempotencyKey,
        chatId: selectedChat.id,
        senderType: 'ADMIN',
        content,
        sequence: (selectedChat.messages?.length || 0) + 1,
      createdAt: new Date().toISOString(),
      idempotencyKey
    };
    
    setSelectedChat(prev => prev ? { ...prev, messages: [...(prev.messages||[]), optimistic] } : prev);

    const res = await sendAdminMessage(content, idempotencyKey);
    if (res.error) {
        toast.error(res.error);
    }
  };

  const confirmDeleteChat = async () => {
      if (!chatToDelete) return;
      setIsDeleting(true);
      try {
          await ChatAPI.deleteSession(chatToDelete.id);
          setChats(prev => prev.filter(c => c.id !== chatToDelete.id));
          if (selectedChat?.id === chatToDelete.id) setSelectedChat(null);
          toast.success("Chat deleted");
          setChatToDelete(null);
          loadStats();
      } catch (e) {
          toast.error("Failed to delete chat");
      } finally {
          setIsDeleting(false);
      }
  };

  useEffect(() => {
    if(initialChatId && chats.length > 0 && !selectedChat && !loading) {
       handleSelectChat(initialChatId);
    }
  }, [initialChatId, chats.length, loading, handleSelectChat, selectedChat]);


  // Initial connection
   useEffect(() => {
    if (!manualOffline) {
        connect();
    }
  }, [manualOffline, connect]);

  // Load available admins (SYSTEM_ADMIN only)
  useEffect(() => {
    if (role === 'SYSTEM_ADMIN') {
      // Fetch both ADMIN and SYSTEM_ADMIN users for comprehensive filtering
      Promise.all([
        AdminService.getAllUsers({ role: 'ADMIN', limit: 100 }),
        AdminService.getAllUsers({ role: 'SYSTEM_ADMIN', limit: 100 }),
      ])
        .then(([adminsResponse, sysAdminsResponse]) => {
          const admins = adminsResponse.data || [];
          const sysAdmins = sysAdminsResponse.data || [];
          setAvailableAdmins([...sysAdmins, ...admins]);
        })
        .catch(err => console.error('Failed to load admins:', err));
    }
  }, [role]);

  // Load Data
  // Load Data
  useEffect(() => {
    loadChats();
    loadStats();
  }, [filter, loadChats]);

  // Socket Events
  useEffect(() => {
    if (!isConnected) return;

    const unsubNew = on('chat:new', (data: any) => {
      loadChats();
      loadStats();
      // Notify admin of new chat
      toast.info("New Support Chat Initiated", {
        description: `Session ID: ${data?.sessionId?.slice(0, 8) || 'Unknown'}`,
        action: {
            label: 'View',
            onClick: () => handleSelectChat(data.id || data.chatId) // Attempt to open if we have ID
        },
        duration: 5000
      });
    });

    const unsubUpdate = on('chat:list:update', () => {
      loadChats();
    });

    const unsubLock = on('chat:lock:update', (data: any) => {
      setChats(prev => prev.map(chat => 
        chat.id === data.chatId 
          ? { ...chat, lock: data.locked ? { adminId: data.adminId } as any : undefined }
          : chat
      ));
      // Also update selected chat if needed
      if(selectedChat?.id === data.chatId) {
          setSelectedChat(prev => prev ? { ...prev, lock: data.locked ? { adminId: data.adminId } as any : undefined } : prev);
      }
    });

    const unsubMessage = on('chat:message', (message: ChatMessage) => {
      // Update selected chat with deduplication
      if (selectedChat && message.chatId === selectedChat.id) {
        setSelectedChat(prev => {
          if (!prev) return prev;
          
          // Dedupe by message ID
          if (prev.messages?.some(m => m.id === message.id)) return prev;
          
          // Dedupe by idempotencyKey (for optimistic updates)
          if (message.idempotencyKey && prev.messages?.some(m => m.idempotencyKey === message.idempotencyKey || m.id === message.idempotencyKey)) {
            // Replace optimistic message with confirmed one
            return {
              ...prev,
              messages: prev.messages.map(m => 
                (m.idempotencyKey === message.idempotencyKey || m.id === message.idempotencyKey) ? message : m
              ).sort((a, b) => (a.sequence || 0) - (b.sequence || 0)),
            };
          }
          
          return {
            ...prev,
            messages: [...(prev.messages || []), message].sort((a, b) => (a.sequence || 0) - (b.sequence || 0)),
          };
        });
      }

      // Update List - only update lastMessageAt and unreadCount, don't duplicate messages
       setChats(prev => {
        const idx = prev.findIndex(c => c.id === message.chatId);
        
        if (idx === -1) {
            // New chat that wasn't in list? Wait for chat:list:update or fetch it?
            // Usually chat:new handles the full reload. 
            // But if we want real-time ordering for hidden/new chats, we might need to fetch it.
            return prev; 
        }
        
        // Only update metadata, NOT messages (they're already updated in selectedChat above)
        const updated = {
            ...prev[idx],
            lastMessageAt: message.createdAt,
            unreadCount: (selectedChat?.id === message.chatId) ? 0 : (prev[idx].unreadCount || 0) + 1
        };
        const newList = [...prev];
        newList.splice(idx, 1);
        newList.unshift(updated);
        return newList;
      });
    });

    const unsubClosed = on('chat:closed', (data: any) => {
         if (selectedChat?.id === data.chatId) {
             setSelectedChat(prev => prev ? { ...prev, status: 'CLOSED' } : prev);
         }
         loadChats();
         loadStats();
    });

    // Listen for lock takeover (when SYSTEM_ADMIN takes over a chat)
    const unsubTakeover = on('chat:lock:takeover', (data: any) => {
        if (selectedChat?.id === data.chatId) {
            toast.warning('Chat Taken Over', {
                description: data.message || 'A System Admin has taken over this chat.',
                duration: 5000
            });
            setSelectedChat(null); // Deselect the chat
            loadChats();
        }
    });

    return () => {
        unsubNew();
        unsubUpdate();
        unsubLock();
        unsubMessage();
        unsubClosed();
        unsubTakeover();
    };
  }, [isConnected, on, selectedChat, loadChats, handleSelectChat]); // Added missing deps

  // Fetch User Details
  useEffect(() => {
    const fetchUser = async () => {
        if (!selectedChat?.userId) {
            setSelectedUserDetails(null);
            return;
        }
        setLoadingUserDetails(true);
        try {
            const data = await AdminService.getUserById(selectedChat.userId);
            setSelectedUserDetails(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingUserDetails(false);
        }
    };
    fetchUser();
  }, [selectedChat?.userId]);




  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-slate-50 font-sans overflow-hidden">
      <DashboardHeader 
        userRole={user?.role}
        isConnected={isConnected}
        onToggleConnection={() => manualOffline ? (setManualOffline(false), connect()) : (setManualOffline(true), disconnect())}
        stats={stats ? { open: stats.open, locked: stats.locked, closed: stats.closed } : null}
      />
      
      {/* Advanced Filters (SYSTEM_ADMIN only) */}
      {role === 'SYSTEM_ADMIN' && (
        <div className="bg-white border-b border-slate-200 px-6 py-3">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
          >
            <svg className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Advanced Filters
            {(filterByAdminId || filterByEmail || filterByAccountNumber) && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Active</span>
            )}
          </button>
          
          {showAdvancedFilters && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filter by Admin */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Filter by Admin
                </label>
                <select
                  value={filterByAdminId}
                  onChange={(e) => setFilterByAdminId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Admins</option>
                  {availableAdmins.map(admin => (
                    <option key={admin.id} value={admin.id}>
                      {admin.firstName} {admin.lastName} ({admin.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Email */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Filter by User Email
                </label>
                <input
                  type="text"
                  value={filterByEmail}
                  onChange={(e) => setFilterByEmail(e.target.value)}
                  placeholder="Search by email..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter by Account Number */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Filter by Account Number
                </label>
                <input
                  type="text"
                  value={filterByAccountNumber}
                  onChange={(e) => setFilterByAccountNumber(e.target.value)}
                  placeholder="Search by account..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Clear Filters Button */}
          {(filterByAdminId || filterByEmail || filterByAccountNumber) && (
            <div className="mt-3">
              <button
                onClick={() => {
                  setFilterByAdminId('');
                  setFilterByEmail('');
                  setFilterByAccountNumber('');
                }}
                className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 border border-slate-300 hover:border-red-300 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`
             flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-20
             ${isSidebarCollapsed ? 'w-20' : 'w-80 md:w-96'}
             ${selectedChat ? 'hidden md:flex' : 'flex w-full'}
        `}>
            <ChatListPanel 
                chats={chats.map(c => ({
                    ...c,
                    // Check if locked by me
                    lockedByMe: c.lock?.adminId === user?.id || activeChatId === c.id,
                    isLocked: c.status === 'LOCKED',
                    // Map user properties for ChatListItem compatibility
                    user: c.user ? { accountNumber: (c.user as any).accountNumber } : undefined,
                }))}
                selectedChatId={selectedChat?.id}
                onSelectChat={handleSelectChat}
                filter={filter as any}
                onFilterChange={(f) => setFilter(f)}
                loading={loading}
                canDelete={role === 'SYSTEM_ADMIN'}
                onDelete={(id) => setChatToDelete(chats.find(c => c.id === id) || null)}
                role={role}
            />
        </div>

        {/* Workspace */}
        <div className={`flex-1 flex bg-slate-50/50 relative overflow-hidden ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
            {selectedChat ? (
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header reused from ChatDashboard components? No, ChatHeader is one. */}
                    {/* We can use the ChatHeader component from components/chat/AdminChatDashboard */}
                   <div className="flex justify-between items-center px-6 py-4 bg-white/60 backdrop-blur-sm border-b border-slate-200">
                        <div className="flex items-center gap-4 overflow-hidden">
                             <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 -ml-2 hover:bg-white rounded-full">
                                <ArrowLeft size={18} />
                            </button>
                             <div className="min-w-0">
                                <h2 className="font-bold text-slate-900 truncate flex items-center gap-2">
                                     {selectedChat.userName || selectedChat.userEmail || 'Anonymous'}
                                </h2>
                                <div className="text-xs text-slate-500">ID: {selectedChat.sessionId.slice(0,8)}</div>
                             </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                             {/* Toggle User Details Panel */}
                             <button 
                                onClick={() => setShowUserDetailsPanel(!showUserDetailsPanel)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors hidden lg:flex"
                                title={showUserDetailsPanel ? 'Hide User Details' : 'Show User Details'}
                             >
                                {showUserDetailsPanel ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
                             </button>
                             
                             {selectedChat.status !== 'CLOSED' && (
                                 <button 
                                    onClick={() => setShowCloseModal(true)}
                                    className="px-4 py-2 bg-white hover:bg-red-50 text-red-600 text-xs font-bold border border-red-100 rounded-lg"
                                 >
                                    Close Chat
                                 </button>
                             )}
                        </div>
                   </div>

                   <div className="flex flex-1 overflow-hidden">
                        <ChatWorkspace
                            chatId={selectedChat.id}
                            messages={selectedChat.messages || []}
                            onSendMessage={handleSendMessage}
                            isClosed={selectedChat.status === 'CLOSED'}
                            lockedByMe={selectedChat.lock?.adminId === user?.id || activeChatId === selectedChat.id}
                            isLocked={selectedChat.status === 'LOCKED'}
                        />
                        
                        {/* User Context Panel - Right Side */}
                        {showUserDetailsPanel && (
                            <UserContextPanel
                                user={selectedUserDetails ? {
                                    id: selectedUserDetails.id,
                                    firstName: selectedUserDetails.firstName,
                                    lastName: selectedUserDetails.lastName,
                                    email: selectedUserDetails.email,
                                    accountNumber: selectedUserDetails.accountNumber,
                                    balance: (selectedUserDetails as any).balance,
                                    createdAt: (selectedUserDetails as any).createdAt,
                                    city: (selectedUserDetails as any).city,
                                    state: (selectedUserDetails as any).state,
                                    transactions: (selectedUserDetails as any).transactions,
                                } : null}
                                chat={{
                                    id: selectedChat.id,
                                    userName: selectedChat.userName,
                                    userEmail: selectedChat.userEmail,
                                    userId: selectedChat.userId,
                                    createdAt: selectedChat.createdAt,
                                }}
                                loading={loadingUserDetails}
                                onClose={() => setShowUserDetailsPanel(false)}
                                onViewProfile={(userId) => router.push(`/dashboard/system-admin/users/${userId}`)}
                                role={role}
                            />
                        )}
                   </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                     <Search size={40} className="mb-4 text-slate-300" />
                     <p>Select a conversation</p>
                </div>
            )}
        </div>
      
      </div>

      <ConfirmationModal
        isOpen={!!chatToDelete}
        onClose={() => setChatToDelete(null)}
        onConfirm={confirmDeleteChat}
        title="Delete Chat"
        description="Are you sure? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        isLoading={isDeleting}
      />

       <ConfirmationModal
        isOpen={showCloseModal}
        onClose={() => setShowCloseModal(false)}
        onConfirm={async () => {
            setIsClosing(true);
            await closeChat();
            setIsClosing(false);
            setShowCloseModal(false);
            setSelectedChat(prev => prev ? {...prev, status: 'CLOSED'} : prev);
            loadChats();
        }}
        title="Close Chat"
        description="End this session?"
        confirmLabel="Close"
        variant="destructive"
        isLoading={isClosing}
      />
    </div>
  );
}
