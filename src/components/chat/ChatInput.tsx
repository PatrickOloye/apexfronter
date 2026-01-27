'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  draftKey?: string; // Key for sessionStorage draft persistence
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Type a message...',
  maxLength = 2000,
  draftKey,
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const draftTimeout = useRef<NodeJS.Timeout | null>(null);

  // Restore draft from sessionStorage
  useEffect(() => {
    if (draftKey && typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(`chat-draft-${draftKey}`);
      if (saved) {
        setValue(saved);
      }
    }
  }, [draftKey]);

  // Save draft to sessionStorage (debounced)
  useEffect(() => {
    if (!draftKey) return;

    if (draftTimeout.current) {
      clearTimeout(draftTimeout.current);
    }

    draftTimeout.current = setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (value.trim()) {
          sessionStorage.setItem(`chat-draft-${draftKey}`, value);
        } else {
          sessionStorage.removeItem(`chat-draft-${draftKey}`);
        }
      }
    }, 500);

    return () => {
      if (draftTimeout.current) {
        clearTimeout(draftTimeout.current);
      }
    };
  }, [value, draftKey]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled || isComposing) return;

    onSend(trimmed);
    setValue('');

    // Clear draft
    if (draftKey && typeof window !== 'undefined') {
      sessionStorage.removeItem(`chat-draft-${draftKey}`);
    }

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }, [value, disabled, isComposing, onSend, draftKey]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  return (
    <div className={styles.container}>
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={styles.input}
        rows={1}
        dir="auto" /* Auto RTL detection */
      />
      
      <div className={styles.actions}>
        {value.length > 0 && (
          <span className={styles.charCount}>
            {value.length}/{maxLength}
          </span>
        )}
        
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className={styles.sendBtn}
          aria-label="Send message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
