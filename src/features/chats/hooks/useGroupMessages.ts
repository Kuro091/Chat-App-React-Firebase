import { onChildAdded, push, ref, set, update } from 'firebase/database';
import { useEffect, useMemo } from 'react';
import { useDatabase, useDatabaseObjectData } from 'reactfire';

import { useUsers } from '@/features/auth/hooks/useUsers';
import { GroupMessage, GroupMessages } from '@/lib/firebase';

export interface Message {
  content: string;
  createdAt: string;
}

export interface Sender {
  displayName: string;
  photoURL: string;
}

export type MessageWithSender = Message & Sender;

export const useGroupMessages = (groupId: string) => {
  const database = useDatabase();
  const { currentUser } = useUsers();

  const groupMessagesRef = ref(database, `groupMessages/${groupId}}`);
  // const groupMembersQuery = query(groupMessagesRef);

  const { data: groupMessages } = useDatabaseObjectData<GroupMessages>(groupMessagesRef, {
    idField: 'groupId',
  });

  useEffect(() => {
    // Mark message as read
    const unsub = onChildAdded(groupMessagesRef, (snap) => {
      const message = snap.val() as GroupMessage;
      if (message.sender !== currentUser?.uid && !message.read) {
        const messageId = snap.key as string;
        const messageRef = ref(database, `groupMessages/${groupId}}/${messageId}`);
        update(messageRef, {
          readTimeStamp: new Date().toISOString(),
          read: true,
        });
      }
    });

    return () => {
      unsub();
    };
  }, [groupMessagesRef, currentUser?.uid, groupId, database]);

  const addChatMessage = async (groupId: string, message: GroupMessage) => {
    const newMessageRef = push(groupMessagesRef);
    const newMessage: GroupMessage = {
      ...message,
      read: false,
    };
    await set(newMessageRef, newMessage);
  };

  const filteredMessages = useMemo(() => {
    if (!groupMessages) return [];

    return Object.entries(groupMessages)
      .filter(([key, val]: [key: string, val: GroupMessage]) => {
        return typeof val !== 'string' || key !== 'groupId';
      })
      .map(([key, val]: [key: string, val: GroupMessage]) => {
        return { ...val, messageId: key };
      });
  }, [groupMessages]);

  return {
    groupMessages: filteredMessages,
    addChatMessage,
  };
};
