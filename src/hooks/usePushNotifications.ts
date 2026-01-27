import { useState, useEffect } from 'react';
import axios from 'axios';

const NEXT_PUBLIC_VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function usePushNotifications() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
            checkSubscription();
        }
    }, []);

    const checkSubscription = async () => {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            setIsSubscribed(!!subscription);
        }
    };

    const subscribeToPush = async () => {
        setLoading(true);
        try {
            if (!NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
                throw new Error('VAPID Public Key not found');
            }

            const permissionResult = await Notification.requestPermission();
            setPermission(permissionResult);

            if (permissionResult !== 'granted') {
                throw new Error('Permission not granted for Notification');
            }

            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(NEXT_PUBLIC_VAPID_PUBLIC_KEY),
            });

            // Send to backend
            // Assuming headers handle Auth token automatically via interceptors or cookie
            await axios.post('http://localhost:3000/notifications/subscribe', subscription); // Adjust API URL

            setIsSubscribed(true);
            alert('Successfully subscribed to notifications!');
        } catch (error) {
            console.error('Error subscribing to push notifications:', error);
            alert('Failed to subscribe to notifications.');
        } finally {
            setLoading(false);
        }
    };

    const unsubscribeFromPush = async () => {
        setLoading(true);
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            if (subscription) {
                await subscription.unsubscribe();
                // Optional: Notify backend
                await axios.post('http://localhost:3000/notifications/unsubscribe', { endpoint: subscription.endpoint });
            }
            setIsSubscribed(false);
        } catch (error) {
            console.error("Error unsubscribing", error);
        } finally {
            setLoading(false);
        }
    }

    return {
        permission,
        isSubscribed,
        loading,
        subscribeToPush,
        unsubscribeFromPush
    };
}
