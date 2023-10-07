import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

let allowlist;
if (import.meta.env.DEV) {
  allowlist = [/^\/$/];
}

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
});


const messaging = getMessaging(firebaseApp);

console.info('Firebase messaging service worker is set up');

onBackgroundMessage(messaging, function ({data}) {
  console.log('data is ', data);
  // Customize notification here
  if(data && data.title){
    const notificationTitle = data.title;
    const notificationOptions = {
      body: data.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  }

});
// If we don't include a point to inject the manifest the plugin will fail.
// Using just a variable will not work because it is tree-shaked, we need to make it part of a side effect to prevent it from being removed
console.log(self.__WB_MANIFEST);
