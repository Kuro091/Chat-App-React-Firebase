import {
  getMessaging,
  getToken,
  onMessage,
  isSupported as isMessagingSupported,
} from 'firebase/messaging';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useMessaging = () => {
  const requestForToken = async () => {
    const isSupported = await isMessagingSupported();
    console.log('isSupported', isSupported);
    if (!isSupported) return '';
    const messaging = getMessaging();

    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js');
        console.log('registration', registration);
        const currentToken = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY as string,
          serviceWorkerRegistration: registration,
        });
        return currentToken;
      } catch (err) {
        console.log('err', err);
      }
    }
    return '';
  };

  useEffect(() => {
    const onScreenMessaging = async () => {
      const isSupported = await isMessagingSupported();
      if (!isSupported) return '';
      const messaging = getMessaging();
      onMessage(messaging, ({ data }) => {
        toast(data?.title || "You've got a new message!");
      });
    };

    onScreenMessaging();
  }, []);

  return { requestForToken, isMessagingSupported };
};
