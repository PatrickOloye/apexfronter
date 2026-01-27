"use client";

import { useEffect, useMemo, useState, useCallback } from 'react';
import { EmailService, EmailTemplate, EmailLog } from '../../../../libs/server-actions/email';
import { AdminService, User } from '../../../../libs/server-actions/admin';

const EmailManagementPage = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [history, setHistory] = useState<EmailLog[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tab, setTab] = useState<'templates' | 'send' | 'history'>('templates');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [historyPagination, setHistoryPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [historyFilters, setHistoryFilters] = useState({
    status: '',
    recipientEmail: '',
    templateId: '',
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    body: '',
    description: '',
    category: 'general',
    isActive: true,
    variables: '',
  });

  const [sendForm, setSendForm] = useState({
    recipientType: 'user',
    recipientId: '',
    recipientEmail: '',
    templateId: '',
    subject: '',
    body: '',
    variables: [{ key: '', value: '' }],
  });

  const loadTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await EmailService.getTemplates();
      setTemplates(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await AdminService.getAllUsers({ page: 1, limit: 100 });
      const data = Array.isArray(response) ? response : response.data;
      setUsers(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    }
  };

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const response = await EmailService.getEmailHistory({
        page: historyPagination.page,
        limit: historyPagination.limit,
        status: historyFilters.status || undefined,
        recipientEmail: historyFilters.recipientEmail || undefined,
        templateId: historyFilters.templateId || undefined,
      });

      const data = Array.isArray(response) ? response : response.data;
      setHistory(data || []);
      if (response?.pagination) {
        setHistoryPagination(response.pagination);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load email history');
    } finally {
      setHistoryLoading(false);
    }
  }, [historyPagination.page, historyPagination.limit, historyFilters.status, historyFilters.recipientEmail, historyFilters.templateId]);

  useEffect(() => {
    loadTemplates();
    loadUsers();
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const openCreateTemplate = () => {
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      subject: '',
      body: '',
      description: '',
      category: 'general',
      isActive: true,
      variables: '',
    });
    setShowTemplateModal(true);
  };

  const openEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      subject: template.subject,
      body: template.body,
      description: template.description || '',
      category: template.category,
      isActive: template.isActive,
      variables: template.variables.join(', '),
    });
    setShowTemplateModal(true);
  };

  const handleTemplateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        name: templateForm.name,
        subject: templateForm.subject,
        body: templateForm.body,
        description: templateForm.description || undefined,
        category: templateForm.category,
        isActive: templateForm.isActive,
        variables: templateForm.variables
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editingTemplate) {
        await EmailService.updateTemplate(editingTemplate.id, payload);
        setSuccess('Template updated successfully.');
      } else {
        await EmailService.createTemplate(payload);
        setSuccess('Template created successfully.');
      }

      setShowTemplateModal(false);
      loadTemplates();
    } catch (err: any) {
      setError(err.message || 'Failed to save template');
    }
  };

  const handleTemplateDelete = async (templateId: string) => {
    if (!confirm('Delete this template?')) return;
    setError(null);
    setSuccess(null);
    try {
      await EmailService.deleteTemplate(templateId);
      setSuccess('Template deleted successfully.');
      loadTemplates();
    } catch (err: any) {
      setError(err.message || 'Failed to delete template');
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const variables: Record<string, string> = {};
      sendForm.variables.forEach((entry) => {
        if (entry.key.trim()) {
          variables[entry.key.trim()] = entry.value;
        }
      });

      await EmailService.sendEmail({
        recipientId: sendForm.recipientType === 'user' ? sendForm.recipientId || undefined : undefined,
        recipientEmail: sendForm.recipientType === 'email' ? sendForm.recipientEmail || undefined : undefined,
        templateId: sendForm.templateId || undefined,
        subject: sendForm.templateId ? undefined : sendForm.subject,
        body: sendForm.templateId ? undefined : sendForm.body,
        variables: Object.keys(variables).length ? variables : undefined,
      });

      setSuccess('Email sent successfully.');
      setSendForm({
        recipientType: 'user',
        recipientId: '',
        recipientEmail: '',
        templateId: '',
        subject: '',
        body: '',
        variables: [{ key: '', value: '' }],
      });
      loadHistory();
    } catch (err: any) {
      setError(err.message || 'Failed to send email');
    }
  };

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === sendForm.templateId),
    [templates, sendForm.templateId]
  );

  return (
    <div className="p-6 min-h-screen bg-slate-50/50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Email Hub</h1>
        <p className="text-slate-500 mt-1">Design templates, campaign emails, and track delivery status.</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 w-fit mb-8 shadow-sm">
        <button
          onClick={() => setTab('templates')}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'templates' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          Templates
        </button>
        <button
          onClick={() => setTab('send')}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'send' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          Compose
        </button>
        <button
          onClick={() => setTab('history')}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'history' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          History
        </button>
      </div>

      {tab === 'templates' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Available Templates</h2>
              <p className="text-xs text-slate-500">Manage your system email templates</p>
            </div>
            <button
              onClick={openCreateTemplate}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
            >
              + New Template
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              No templates created yet.
            </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {templates.map((template) => (
                   <div key={template.id} className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-300 relative">
                      <div className="flex items-start justify-between mb-3">
                         <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${template.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                           {template.category}
                         </div>
                         <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEditTemplate(template)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            {!template.isSystem && (
                               <button onClick={() => handleTemplateDelete(template.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                               </button>
                            )}
                         </div>
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg mb-1">{template.name}</h3>
                      <p className="text-slate-500 text-xs mb-4 line-clamp-2">{template.subject}</p>
                      
                      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                         <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded-md">
                            {template.variables.length} variables
                         </span>
                         <span className={`ml-auto w-2 h-2 rounded-full ${template.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                         <span className="text-xs text-slate-400">{template.isActive ? 'Active' : 'Inactive'}</span>
                      </div>
                   </div>
                ))}
            </div>
          )}
        </div>
      )}

      {tab === 'send' && (
        <form onSubmit={handleSendEmail} className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-14rem)]">
           {/* Left Column: Form */}
           <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 overflow-y-auto custom-scrollbar">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Compose Email</h2>
              
              <div className="space-y-6">
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recipient</label>
                   <div className="flex p-1 bg-slate-100 rounded-xl mb-3 w-fit">
                      <button
                        type="button"
                        onClick={() => setSendForm((prev) => ({ ...prev, recipientType: 'user', recipientEmail: '' }))}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${sendForm.recipientType === 'user' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                      >
                        Registered User
                      </button>
                      <button
                        type="button"
                        onClick={() => setSendForm((prev) => ({ ...prev, recipientType: 'email', recipientId: '' }))}
                         className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${sendForm.recipientType === 'email' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                      >
                        External Email
                      </button>
                   </div>
                   
                   {sendForm.recipientType === 'user' ? (
                      <select
                        value={sendForm.recipientId}
                        onChange={(e) => setSendForm((prev) => ({ ...prev, recipientId: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        required
                      >
                        <option value="">Select a user...</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName} ({user.email})
                          </option>
                        ))}
                      </select>
                   ) : (
                      <input
                        type="email"
                        placeholder="recipient@example.com"
                        value={sendForm.recipientEmail}
                        onChange={(e) => setSendForm((prev) => ({ ...prev, recipientEmail: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                   )}
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Content Source</label>
                   <select
                      value={sendForm.templateId}
                      onChange={(e) => setSendForm((prev) => ({ ...prev, templateId: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    >
                      <option value="">Start from scratch</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          Template: {template.name}
                        </option>
                      ))}
                    </select>
                </div>

                {!sendForm.templateId && (
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                      <input
                        type="text"
                        value={sendForm.subject}
                        onChange={(e) => setSendForm((prev) => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        required
                        placeholder="Welcome to Apex Bank..."
                      />
                   </div>
                )}
                
                {/* Variable Manager */}
                {selectedTemplate ? (
                   <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                      <h3 className="text-sm font-bold text-blue-900 mb-2">Template Variables</h3>
                      <p className="text-xs text-blue-700/70 mb-3">This template expects the following values.</p>
                      
                      <div className="space-y-3">
                         {selectedTemplate.variables.map((v, i) => (
                            <div key={v} className="flex items-center gap-2">
                               <span className="text-xs font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 min-w-[80px] text-center">{`{{${v}}}`}</span>
                               <input 
                                  type="text"
                                  placeholder={`Value for ${v}`}
                                  value={sendForm.variables.find(item => item.key === v)?.value || ''}
                                  onChange={(e) => {
                                      const newVars = [...sendForm.variables];
                                      const idx = newVars.findIndex(item => item.key === v);
                                      if (idx >= 0) newVars[idx].value = e.target.value;
                                      else newVars.push({ key: v, value: e.target.value });
                                      setSendForm(prev => ({ ...prev, variables: newVars }));
                                  }}
                                  className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:border-blue-500 outline-none"
                               />
                            </div>
                         ))}
                      </div>
                   </div>
                ) : (
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Body Content</label>
                      <textarea
                        value={sendForm.body}
                        onChange={(e) => setSendForm((prev) => ({ ...prev, body: e.target.value }))}
                        rows={8}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-mono text-sm"
                        required
                        placeholder="<h1>Hello World</h1><p>Write your HTML content...</p>"
                      />
                      <div className="mt-2 flex gap-2 flex-wrap">
                         <span className="text-xs text-slate-400">Helpers:</span>
                         {['{{name}}', '{{email}}', '{{date}}', '{{company}}'].map(tag => (
                            <button 
                                key={tag} 
                                type="button"
                                onClick={() => setSendForm(prev => ({ ...prev, body: prev.body + ' ' + tag }))}
                                className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600 transition-colors"
                            >
                              {tag}
                            </button>
                         ))}
                      </div>
                   </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-[1.02] transition-all"
                  >
                    Send Email
                  </button>
                </div>
              </div>
           </div>

           {/* Right Column: Preview */}
           <div className="hidden lg:flex flex-col gap-4">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex-1 flex flex-col overflow-hidden">
                 <div className="bg-slate-100/50 p-4 border-b border-slate-100 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <span className="ml-2 text-xs font-mono text-slate-400">Live Preview</span>
                 </div>
                 <div className="flex-1 p-8 bg-white overflow-y-auto">
                    {/* Simulated Email Header */}
                    <div className="mb-8 border-b border-slate-100 pb-6">
                       <h1 className="text-2xl font-bold text-slate-900 mb-2">{selectedTemplate ? selectedTemplate.subject : (sendForm.subject || 'No Subject')}</h1>
                       <div className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                          <div className="flex flex-col">
                             <span className="font-bold text-slate-700">Apex Bank</span>
                             <span className="text-xs">support@apexbank.com</span>
                          </div>
                       </div>
                    </div>

                    {/* Email Content Preview */}
                    <div className="prose prose-slate max-w-none">
                       {selectedTemplate ? (
                          <div dangerouslySetInnerHTML={{ 
                             __html: selectedTemplate.body.replace(/\{\{(\w+)\}\}/g, (_, key) => {
                                const val = sendForm.variables.find(v => v.key === key)?.value;
                                return val ? `<span class="bg-yellow-100 px-1 border-b-2 border-yellow-300 text-slate-900">${val}</span>` : `<span class="text-red-400 bg-red-50 px-1">{{${key}}}</span>`;
                             }) 
                          }} />
                       ) : (
                          sendForm.body ? (
                            <div dangerouslySetInnerHTML={{ __html: sendForm.body }} />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-300 h-40">
                               <p>Start typing to preview...</p>
                            </div>
                          )
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </form>
      )}

      {tab === 'history' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-lg font-bold text-slate-800">Email History</h2>
            <div className="flex flex-wrap gap-2">
              <select
                value={historyFilters.status}
                onChange={(e) => setHistoryFilters((prev) => ({ ...prev, status: e.target.value }))}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="">All Status</option>
                <option value="SENT">Sent</option>
                <option value="FAILED">Failed</option>
                <option value="PENDING">Pending</option>
              </select>
              <select
                value={historyFilters.templateId}
                onChange={(e) => setHistoryFilters((prev) => ({ ...prev, templateId: e.target.value }))}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="">All Templates</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {historyLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">No emails found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Recipient</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Sent At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-slate-700">
                        {log.recipientEmail}
                        <div className="text-xs text-slate-400 font-normal">{log.template?.name || 'Custom'}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 truncate max-w-[200px]">{log.subject}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${log.status === 'SENT' ? 'bg-emerald-100 text-emerald-700' : log.status === 'FAILED' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500 font-mono text-xs">
                        {log.sentAt ? new Date(log.sentAt).toLocaleString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">
                {editingTemplate ? 'Edit Template' : 'Create Template'}
              </h2>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleTemplateSubmit} className="space-y-4">
              {!editingTemplate && (
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Name</label>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm text-slate-600 mb-2">Subject</label>
                <input
                  type="text"
                  value={templateForm.subject}
                  onChange={(e) => setTemplateForm((prev) => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Body (HTML)</label>
                <textarea
                  value={templateForm.body}
                  onChange={(e) => setTemplateForm((prev) => ({ ...prev, body: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Category</label>
                  <input
                    type="text"
                    value={templateForm.category}
                    onChange={(e) => setTemplateForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Variables (comma-separated)</label>
                  <input
                    type="text"
                    value={templateForm.variables}
                    onChange={(e) => setTemplateForm((prev) => ({ ...prev, variables: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-2">Description</label>
                <textarea
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={templateForm.isActive}
                  onChange={(e) => setTemplateForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                />
                <span className="text-sm text-slate-600">Active</span>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
                >
                  {editingTemplate ? 'Save Changes' : 'Create Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailManagementPage;
