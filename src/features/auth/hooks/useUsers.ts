import { UserCredential } from 'firebase/auth';
import { orderByChild, query, ref, set, update } from 'firebase/database';
import { useAuth, useDatabase, useDatabaseListData } from 'reactfire';

import { UserData } from '@/lib/firebase';

export const useUsers = () => {
  const database = useDatabase();
  const usersRef = ref(database, 'users');
  const usersQuery = query(usersRef, orderByChild('online'));
  const { data: users, status } = useDatabaseListData<UserData & { uid: string }>(usersQuery, {
    idField: 'uid',
  });

  const { currentUser: currentAuthUser } = useAuth();

  const addUser = async (data: UserCredential) => {
    if (data.user.uid) {
      const userRef = ref(database, `users/${data.user.uid}`);
      set(userRef, {
        displayName: data.user.displayName,
        email: data.user.email,
        photoURL: data.user.photoURL,
        online: false,
      } as UserData);
    }
  };

  const updateUser = async (uid: string, data: Partial<UserData>) => {
    const userRef = ref(database, `users/${uid}`);
    update(userRef, data);
  };

  const getUserByUid = (uid: string) => {
    return users?.find((u) => u.uid === uid);
  };

  const currentUser = users?.find((u) => u.uid === currentAuthUser?.uid) || null;

  return {
    users,
    status,
    updateUser,
    addUser,
    currentUser,
    getUserByUid,
  };
};
