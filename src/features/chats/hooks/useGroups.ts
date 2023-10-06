import { get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { useState } from 'react';
import { useDatabase } from 'reactfire';

import { Group, UserData } from '@/lib/firebase';

import { useGroupMembers } from './useGroupMembers';

export const useGroups = () => {
  const database = useDatabase();
  const groupsRef = ref(database, 'groups');
  const { getGroupIdByMembers } = useGroupMembers();
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');

  const addGroup = async (users: UserData[]) => {
    // CHECK IF ALL USERS SHARE A GROUP ALREADY
    const userIds = users.map((user) => user.uid);
    let groupId = getGroupIdByMembers(userIds);

    if (groupId) {
      setSelectedGroupId(groupId);
      return;
    }

    // ADD A NEW GROUP
    const newGroupRef = push(groupsRef);
    groupId = newGroupRef.key || '';
    const title = users.map((user) => user.displayName).join(', ');
    const newGroup: Group = {
      title,
      lastMessage: '',
      timeStamp: new Date().toISOString(),
    };
    set(newGroupRef, newGroup);
    setSelectedGroupId(groupId);
    const userRefs = users.map((user) => ref(database, `users/${user.uid}/groups/${groupId}`));
    userRefs.forEach((ref) => {
      update(ref, { groupId });
    });

    const groupMembersRef = ref(database, `groupMembers/${groupId}`);
    const members = users.reduce<{ [key: string]: boolean }>((acc, user) => {
      acc[user.uid] = true;
      return acc;
    }, {});

    update(groupMembersRef, members);
  };

  const getAllGroupsByUID = async (uid: string) => {
    const userRef = ref(database, `users/${uid}/groups`);
    const q = query(userRef, orderByChild('groupId'));
    const userGroups = await get(q);

    return userGroups.val();
  };

  return {
    addGroup,
    selectedGroupId,
    getAllGroupsByUID,
  };
};
