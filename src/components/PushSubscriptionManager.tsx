"use client";

import { usePushNotifications } from '@/hooks/usePushNotifications';
import Button from '@/components/ui/Button'; // Adjusted to Button.tsx and default export assumption
import { useState } from 'react';

export function PushSubscriptionManager() {
  const { permission, isSubscribed, loading, subscribeToPush, unsubscribeFromPush } = usePushNotifications();

  if (permission === 'denied') {
    return (
      <div className="text-red-500 text-sm">
        Notifications are blocked. Please enable them in your browser settings to receive updates.
      </div>
    );
  }

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-green-600 text-sm">Push Notifications Active</span>
        <Button 
          text={loading ? 'Processing...' : 'Unsubscribe'} 
          onClick={unsubscribeFromPush} 
          disabled={loading}
          className="bg-transparent text-red-500 border border-red-500 hover:bg-red-50"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-muted-foreground text-sm">
        Enable push notifications to stay updated on transactions and chats.
      </p>
      <Button 
        text={loading ? 'Enabling...' : 'Enable Notifications'} 
        onClick={subscribeToPush} 
        disabled={loading} 
      />
    </div>
  );
}
