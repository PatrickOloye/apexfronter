"use client";

import React, { useState } from "react";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onReload?: () => void;
  onGoHome?: () => void;
};

export default function SessionModal({ open, title = "Session update", message, onClose, onReload, onGoHome }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(2,6,23,0.6)', zIndex: 9999 }}>
      <div style={{ width: 'min(720px,92%)', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 10px 40px rgba(2,6,23,0.3)' }}>
        <h3 style={{ margin: 0, marginBottom: 8, color: '#0f172a' }}>{title}</h3>
        <p style={{ marginTop: 0, marginBottom: 18, color: '#475569' }}>{message}</p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          {onGoHome && (
            <button
              onClick={() => {
                onClose();
                onGoHome();
              }}
              style={{ background: '#eef2ff', border: 'none', padding: '10px 14px', borderRadius: 8 }}
            >
              Go home
            </button>
          )}

          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                 onClose();
                 (onReload ?? (() => window.location.reload()))();
              }, 500);
            }}
            disabled={isLoading}
            style={{ 
              background: 'linear-gradient(90deg,#0ea5e9,#6366f1)', 
              color: '#fff', 
              border: 'none', 
              padding: '10px 14px', 
              borderRadius: 8,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            {isLoading && (
              <span style={{ 
                width: 14, 
                height: 14, 
                border: '2px solid rgba(255,255,255,0.3)', 
                borderTopColor: '#fff', 
                borderRadius: '50%', 
                display: 'inline-block',
                animation: 'spin 1s linear infinite'
              }} />
            )}
            {isLoading ? 'Reloading...' : 'Reload now'}
          </button>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}} />
        </div>
      </div>
    </div>
  );
}
