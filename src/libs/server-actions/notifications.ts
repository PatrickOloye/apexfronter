import { api } from '@/libs/http/api';

export interface AdminNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  readAt?: string | null;
  metadata?: Record<string, any>;
}

export const NotificationsAPI = {
  async list(page = 1, limit = 10): Promise<{ notifications: AdminNotification[]; pagination: any }> {
    const response = await api.get(`/notifications?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  async unreadCount(): Promise<{ count: number }> {
    const response = await api.get('/notifications/unread-count');
    return response.data.data;
  },

  async markRead(id: string) {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  },

  async markAllRead() {
    const response = await api.patch('/notifications/read-all');
    return response.data;
  },

  async approveChatDeletion(approvalId: string) {
    const response = await api.post(`/chat/deletions/approve/${approvalId}`);
    return response.data;
  },
};
