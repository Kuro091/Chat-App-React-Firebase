import { query, ref } from 'firebase/database';
import { useDatabase, useDatabaseListData } from 'reactfire';

export const useGroupMembers = () => {
  const database = useDatabase();
  const groupMembersRefs = ref(database, 'groupMembers');
  const groupMembersQuery = query(groupMembersRefs);
  const { data: groupMembers } = useDatabaseListData<
    { [key: string]: any[] } & { groupId: string }
  >(groupMembersQuery, {
    idField: 'groupId',
  });

  const getGroupIdByMembers = (userIds: string[]) => {
    if (groupMembers) {
      for (const group of groupMembers) {
        const groupId = group.groupId;
        const memberIdsInGroup = Object.keys(group);

        if (userIds.every((userId) => memberIdsInGroup.includes(userId))) {
          return groupId;
        }
      }
    }

    return '';
  };

  const getMembersByGroupId = (groupId: string): string[] => {
    const group = groupMembers?.find((group) => group.groupId === groupId);
    const groups = Object.entries(group || {}).filter(([key]) => key !== 'groupId');
    return groups.map(([key]) => key);
  };

  return {
    groupMembers,
    getGroupIdByMembers,
    getMembersByGroupId,
  };
};
