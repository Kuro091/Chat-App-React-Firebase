import { query, ref } from 'firebase/database';
import { useDatabase, useDatabaseListData } from 'reactfire';

import { GroupMessages } from '@/lib/firebase';

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
  const groupMessagesRef = ref(database, `groupMessages/${groupId}}`);
  const groupMembersQuery = query(groupMessagesRef);
  const { data: groupMessages } = useDatabaseListData<GroupMessages>(groupMembersQuery, {
    idField: 'groupId',
  });

  return {
    groupMessages,
  };
};
