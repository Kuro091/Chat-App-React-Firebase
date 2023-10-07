// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { UserInfo, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

/* TYPINGS Todo: Move this to another file maybe */

export type UserData = UserInfo & {
  online: boolean;
  deviceToken?: string;
};

export interface Group {
  title: string;
  lastMessage: string;
  timeStamp: number;
}

export interface GroupMembers {
  [key: string]: boolean;
}

export interface GroupMessages {
  [key: string]: GroupMessage;
}

export interface GroupMessage {
  sender: string;
  senderDisplayName: string;
  photoUrl: string;
  content: string;
  timestamp: number;
  readTimeStamp: number;
  read: boolean;
  notified: boolean;
}
