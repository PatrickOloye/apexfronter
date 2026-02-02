import { api } from '@/libs/http/api';
import { ChatListResponse, ChatSession, ChatStats } from '@/types/chat';

export const ChatAPI = {
    /**
     * Get list of chat sessions for admin dashboard
     */
    async getSessions(params?: {
        status?: string;
        page?: number;
        limit?: number;
        available?: boolean;
        filterByAdminId?: string;
        filterByEmail?: string;
        filterByAccountNumber?: string;
    }): Promise<ChatListResponse> {
        const queryParams = new URLSearchParams();
        if (params?.status) queryParams.append('status', params.status);
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.available) queryParams.append('available', 'true');
        if (params?.filterByAdminId) queryParams.append('filterByAdminId', params.filterByAdminId);
        if (params?.filterByEmail) queryParams.append('filterByEmail', params.filterByEmail);
        if (params?.filterByAccountNumber) queryParams.append('filterByAccountNumber', params.filterByAccountNumber);

        const response = await api.get(`/chat/sessions?${queryParams.toString()}`);
        return response.data.data;
    },

    /**
     * Get a specific chat session with messages
     */
    async getSession(id: string): Promise<ChatSession> {
        const response = await api.get(`/chat/sessions/${id}`);
        return response.data.data;
    },

    /**
     * Get chat history with pagination
     */
    async getChatHistory(
        id: string,
        params?: { before?: string; limit?: number }
    ): Promise<{ messages: any[]; hasMore: boolean }> {
        const queryParams = new URLSearchParams();
        if (params?.before) queryParams.append('before', params.before);
        if (params?.limit) queryParams.append('limit', params.limit.toString());

        const response = await api.get(`/chat/sessions/${id}/history?${queryParams.toString()}`);
        return response.data.data;
    },

    /**
     * Get lock status for a chat
     */
    async getLockStatus(id: string): Promise<{ locked: boolean; adminId?: string }> {
        const response = await api.get(`/chat/sessions/${id}/lock`);
        return response.data.data;
    },

    /**
     * Get chat statistics for dashboard
     */
    async getStats(): Promise<ChatStats> {
        const response = await api.get('/chat/stats');
        return response.data.data;
    },

    /**
     * Delete a chat session
     */
    async deleteSession(id: string): Promise<{ success: boolean; deletedId: string }> {
        const response = await api.delete(`/chat/sessions/${id}`);
        return response.data;
    },
};
