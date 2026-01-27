import { api } from '../http/api';

// Types for user management
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    accountNumber: string;
    role: string;
    status?: 'ACTIVE' | 'BLOCKED' | 'ARCHIVED';
    isVerified: boolean;
    phoneNumber?: string;
    country?: string;
    availableBalance?: number;
    clearedBalance?: number;
    totalCredits?: number;
    totalDebits?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface UsersResponse {
    data: User[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface CreateUserDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber?: string;
    country?: string;
    role?: 'USER' | 'ADMIN';
}

export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    country?: string;
    isVerified?: boolean;
}

export interface CreateAdminTransactionDto {
    userIdentifier: string;
    amount: number;
    type: 'CREDIT' | 'DEBIT';
    balanceType: 'AVAILABLE' | 'OPENING' | 'UNCLEARED' | 'TOTAL';
    description?: string;
    currency?: string;
    narration?: string;
}

export const AdminService = {
    // ============= USER MANAGEMENT =============

    async getAllUsers(params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        role?: string;
    }): Promise<UsersResponse> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.search) queryParams.append('search', params.search);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.role) queryParams.append('role', params.role);

        const { data } = await api.get(`/admin/users?${queryParams}`);
        if (data?.data && data?.pagination) {
            return { data: data.data, pagination: data.pagination };
        }
        return data?.data ?? data;
    },

    async getUserById(userId: string): Promise<User> {
        const { data } = await api.get(`/admin/users/${userId}`);
        return data?.data ?? data;
    },

    async createUser(dto: CreateUserDto): Promise<User> {
        const { data } = await api.post('/admin/users', dto);
        return data?.data ?? data;
    },

    async updateUser(userId: string, dto: UpdateUserDto): Promise<User> {
        const { data } = await api.put(`/admin/users/${userId}`, dto);
        return data?.data ?? data;
    },

    async blockUser(userId: string, reason?: string): Promise<User> {
        const { data } = await api.put(`/admin/users/${userId}/block`, { reason });
        return data?.data ?? data;
    },

    async unblockUser(userId: string): Promise<User> {
        const { data } = await api.put(`/admin/users/${userId}/unblock`);
        return data?.data ?? data;
    },

    async archiveUser(userId: string): Promise<User> {
        const { data } = await api.put(`/admin/users/${userId}/archive`);
        return data?.data ?? data;
    },

    async unarchiveUser(userId: string): Promise<User> {
        const { data } = await api.put(`/admin/users/${userId}/unarchive`);
        return data?.data ?? data;
    },

    async deleteUser(userId: string): Promise<void> {
        await api.delete(`/admin/users/${userId}`);
    },

    // ============= ADMIN TRANSACTIONS =============

    async createAdminTransaction(dto: CreateAdminTransactionDto): Promise<any> {
        const { data } = await api.post('/transactions/admin/create', dto);
        return data?.data ?? data;
    },

    async searchUserForTransaction(identifier: string): Promise<User | null> {
        const { data } = await api.get(`/transactions/admin/user-search?identifier=${identifier}`);
        return data?.data ?? data;
    },

    async getAllTransactions(params?: {
        page?: number;
        limit?: number;
        userId?: string;
        type?: string;
        status?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<any> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.userId) queryParams.append('userId', params.userId);
        if (params?.type) queryParams.append('type', params.type);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.startDate) queryParams.append('startDate', params.startDate);
        if (params?.endDate) queryParams.append('endDate', params.endDate);

        const { data } = await api.get(`/transactions/admin/all?${queryParams}`);
        if (data?.data && data?.pagination) {
            return { data: data.data, pagination: data.pagination };
        }
        return data?.data ?? data;
    },

    // ============= AUDIT LOGS =============

    async getAuditLogs(params?: {
        page?: number;
        limit?: number;
        action?: string;
    }): Promise<any> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.action) queryParams.append('action', params.action);

        const { data } = await api.get(`/admin/audit-logs?${queryParams}`);
        return data?.data ?? data;
    },

    // ============= DASHBOARD STATS =============

    async getDashboardStats(): Promise<any> {
        const { data } = await api.get('/admin/dashboard/stats');
        return data?.data ?? data;
    },
};
