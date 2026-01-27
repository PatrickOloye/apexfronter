import { api } from '../http/api';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  description?: string;
  category: string;
  isSystem: boolean;
  isActive: boolean;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EmailLog {
  id: string;
  templateId?: string;
  recipientEmail: string;
  recipientId?: string;
  subject: string;
  body: string;
  status: 'PENDING' | 'SENT' | 'FAILED';
  sentAt?: string;
  error?: string;
  createdAt: string;
  sentBy?: string;
  template?: EmailTemplate;
}

export interface EmailHistoryResponse {
  data: EmailLog[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const EmailService = {
  async getTemplates(): Promise<EmailTemplate[]> {
    const { data } = await api.get('/email/templates');
    return data?.data ?? data;
  },

  async createTemplate(dto: {
    name: string;
    subject: string;
    body: string;
    description?: string;
    category?: string;
    isSystem?: boolean;
    isActive?: boolean;
    variables?: string[];
  }): Promise<EmailTemplate> {
    const { data } = await api.post('/email/templates', dto);
    return data?.data ?? data;
  },

  async updateTemplate(id: string, dto: {
    subject?: string;
    body?: string;
    description?: string;
    category?: string;
    isActive?: boolean;
    variables?: string[];
  }): Promise<EmailTemplate> {
    const { data } = await api.put(`/email/templates/${id}`, dto);
    return data?.data ?? data;
  },

  async deleteTemplate(id: string): Promise<void> {
    await api.delete(`/email/templates/${id}`);
  },

  async sendEmail(dto: {
    recipientEmail?: string;
    recipientId?: string;
    templateId?: string;
    subject?: string;
    body?: string;
    variables?: Record<string, string>;
  }): Promise<any> {
    const { data } = await api.post('/email/send', dto);
    return data?.data ?? data;
  },

  async getEmailHistory(params?: {
    page?: number;
    limit?: number;
    status?: string;
    templateId?: string;
    recipientEmail?: string;
    sentBy?: string;
  }): Promise<EmailHistoryResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.templateId) queryParams.append('templateId', params.templateId);
    if (params?.recipientEmail) queryParams.append('recipientEmail', params.recipientEmail);
    if (params?.sentBy) queryParams.append('sentBy', params.sentBy);

    const { data } = await api.get(`/email/history?${queryParams}`);
    return data?.data ?? data;
  },
};
