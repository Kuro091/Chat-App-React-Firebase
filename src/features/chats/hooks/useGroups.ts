import { UserData } from '@/lib/firebase';

export const useGroups = () => {
  const addGroup = (users: UserData[]) => {
    console.log('addGroup', users);
  };

  return {
    addGroup,
  };
};
