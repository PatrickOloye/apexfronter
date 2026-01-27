'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { api } from '@/libs/http/api';

interface SystemSetting {
  id: string;
  key: string;
  value: string;
  type: string;
  category: string;
}

const DEFAULT_SETTINGS: SystemSetting[] = [
  { id: '1', key: 'max_transaction_limit', value: '1000000', type: 'number', category: 'transactions' },
  { id: '2', key: 'daily_transfer_limit', value: '500000', type: 'number', category: 'transactions' },
  { id: '3', key: 'loan_approval_threshold', value: '100000', type: 'number', category: 'loans' },
  { id: '4', key: 'max_loan_amount', value: '5000000', type: 'number', category: 'loans' },
  { id: '5', key: 'session_timeout_minutes', value: '30', type: 'number', category: 'security' },
  { id: '6', key: 'require_2fa', value: 'true', type: 'boolean', category: 'security' },
  { id: '7', key: 'email_notifications', value: 'true', type: 'boolean', category: 'notifications' },
  { id: '8', key: 'maintenance_mode', value: 'false', type: 'boolean', category: 'system' },
];

const CATEGORY_ICONS: Record<string, string> = {
  transactions: '💳',
  loans: '📊',
  security: '🔒',
  notifications: '🔔',
  system: '⚙️',
};

const CATEGORY_COLORS: Record<string, string> = {
  transactions: 'from-blue-500 to-blue-600',
  loans: 'from-green-500 to-green-600',
  security: 'from-purple-500 to-purple-600',
  notifications: 'from-amber-500 to-amber-600',
  system: 'from-gray-500 to-gray-600',
};

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const result = await api.get('/admin/settings');
      const data = result.data?.data || result.data || [];
      setSettings(data.length > 0 ? data : DEFAULT_SETTINGS);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (setting: SystemSetting) => {
    const newValue = editedValues[setting.key];
    if (newValue === undefined || newValue === setting.value) return;

    setSaving(setting.key);
    setError('');
    setSuccess('');

    try {
      await api.put(`/admin/settings/${setting.key}`, { value: newValue });

      setSettings(prev => prev.map(s => s.key === setting.key ? { ...s, value: newValue } : s));
      setEditedValues(prev => {
        const newVals = { ...prev };
        delete newVals[setting.key];
        return newVals;
      });
      setSuccess(`${setting.key.replace(/_/g, ' ')} updated successfully!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(null);
    }
  };

  const handleToggle = async (setting: SystemSetting) => {
    const newValue = setting.value === 'true' ? 'false' : 'true';
    setSaving(setting.key);
    setError('');
    setSuccess('');

    try {
      await api.put(`/admin/settings/${setting.key}`, { value: newValue });

      setSettings(prev => prev.map(s => s.key === setting.key ? { ...s, value: newValue } : s));
      setSuccess(`${setting.key.replace(/_/g, ' ')} ${newValue === 'true' ? 'enabled' : 'disabled'}!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(null);
    }
  };

  // Group settings by category
  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) acc[setting.category] = [];
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SystemSetting[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/system-admin" className="hover:text-blue-600">Dashboard</Link>
          <span>/</span>
          <span className="text-gray-800">System Settings</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
        <p className="text-gray-500 mt-1">Configure global platform settings</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
        >
          ✓ {success}
        </motion.div>
      )}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
        >
          ✗ {error}
        </motion.div>
      )}

      {/* Settings by Category */}
      {Object.entries(groupedSettings).map(([category, categorySettings]) => (
        <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Category Header */}
          <div className={`bg-gradient-to-r ${CATEGORY_COLORS[category] || 'from-gray-500 to-gray-600'} p-4`}>
            <div className="flex items-center gap-3 text-white">
              <span className="text-2xl">{CATEGORY_ICONS[category] || '⚙️'}</span>
              <h2 className="text-lg font-bold capitalize">{category}</h2>
            </div>
          </div>

          {/* Settings List */}
          <div className="divide-y divide-gray-50">
            {categorySettings.map((setting) => (
              <div key={setting.key} className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 capitalize">
                    {setting.key.replace(/_/g, ' ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Type: {setting.type}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {setting.type === 'boolean' ? (
                    /* Toggle Switch for booleans */
                    <button
                      onClick={() => handleToggle(setting)}
                      disabled={saving === setting.key}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        setting.value === 'true' ? 'bg-green-500' : 'bg-gray-300'
                      } ${saving === setting.key ? 'opacity-50' : ''}`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                          setting.value === 'true' ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  ) : (
                    /* Input for numbers/strings */
                    <div className="flex items-center gap-2">
                      <input
                        type={setting.type === 'number' ? 'number' : 'text'}
                        value={editedValues[setting.key] ?? setting.value}
                        onChange={(e) => setEditedValues({ ...editedValues, [setting.key]: e.target.value })}
                        className="w-40 px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-right"
                      />
                      {editedValues[setting.key] !== undefined && editedValues[setting.key] !== setting.value && (
                        <button
                          onClick={() => handleSave(setting)}
                          disabled={saving === setting.key}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg disabled:opacity-50"
                        >
                          {saving === setting.key ? '...' : 'Save'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
          <div className="flex items-center gap-3 text-white">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-bold">Danger Zone</h2>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
            <div>
              <p className="font-medium text-red-800">Maintenance Mode</p>
              <p className="text-sm text-red-600">Users will see a maintenance page</p>
            </div>
            {settings.find(s => s.key === 'maintenance_mode') && (
              <button
                onClick={() => handleToggle(settings.find(s => s.key === 'maintenance_mode')!)}
                disabled={saving === 'maintenance_mode'}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.find(s => s.key === 'maintenance_mode')?.value === 'true' ? 'bg-red-500' : 'bg-gray-300'
                } ${saving === 'maintenance_mode' ? 'opacity-50' : ''}`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                    settings.find(s => s.key === 'maintenance_mode')?.value === 'true' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 rounded-xl">
            <div>
              <p className="font-medium text-red-800">Seed Initial Permissions</p>
              <p className="text-sm text-red-600">Reset permissions to default (run once)</p>
            </div>
            <button
              onClick={async () => {
                if (!confirm('This will reset all permissions to defaults. Continue?')) return;
                  await api.post('/admin/permissions/seed');
                setSuccess('Permissions seeded successfully!');
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
            >
              Seed Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
