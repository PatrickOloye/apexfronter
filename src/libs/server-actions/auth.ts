import { api } from '../http/api';

export const AuthService = {
  async login(email: string, password: string): Promise<any> {
    const { data } = await api.post('/auth/signin', { email, password });
    return data?.data ?? data;
  },
  async getCurrentUser(): Promise<any> {
    const { data } = await api.get('/auth/me');
    return data?.data?.user ?? data?.user ?? data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout', undefined, { timeout: 8000 });
  },

  async forgotPassword(email: string): Promise<any> {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  async resetPassword(password: string, token: string): Promise<any> {
    const { data } = await api.post('/auth/reset-password', { newPassword: password, resetToken: token });
    return data;
  },
};