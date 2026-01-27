"use client";

import { PushSubscriptionManager } from "@/components/PushSubscriptionManager";

export default function NotificationsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold tracking-tight">Notification Settings</h1>
      </div>
       
       <div className="grid gap-6">
        <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6">
            <div className="flex flex-col space-y-1.5 mb-4">
                <h3 className="font-semibold leading-none tracking-tight">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">Manage your device push notification preferences.</p>
            </div>
            <div className="p-0">
                <PushSubscriptionManager />
            </div>
        </div>
       </div>
    </div>
  )
}
