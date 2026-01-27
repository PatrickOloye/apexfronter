'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../../../store/AuthStore';
import { AdminService } from '../../../../libs/server-actions/admin';
import { toast } from 'sonner';

export default function SystemAdminProfilePage() {
  const user = useAuthStore(state => state.user);
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser);
  const isLoading = useAuthStore(state => state.isLoading);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
    isVerified: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchCurrentUser();
    }
  }, [user, fetchCurrentUser]);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
        country: user.country || '',
        isVerified: !!user.isVerified,
      });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setSaving(true);
    try {
      await AdminService.updateUser(user.id, form);
      await fetchCurrentUser();
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">System Admin Profile</h1>
        <p className="text-slate-500 mt-1">Manage your account information</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider">First Name</label>
            <input
              className="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2"
              value={form.firstName}
              onChange={(e) => setForm(prev => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider">Last Name</label>
            <input
              className="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2"
              value={form.lastName}
              onChange={(e) => setForm(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider">Phone Number</label>
            <input
              className="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2"
              value={form.phoneNumber}
              onChange={(e) => setForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider">Country</label>
            <input
              className="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2"
              value={form.country}
              onChange={(e) => setForm(prev => ({ ...prev, country: e.target.value }))}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.isVerified}
            onChange={(e) => setForm(prev => ({ ...prev, isVerified: e.target.checked }))}
          />
          <span className="text-sm text-slate-600">Account verified</span>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
