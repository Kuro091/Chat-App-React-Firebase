import { UserCredential } from 'firebase/auth';
import { orderByChild, query, ref, set, update } from 'firebase/database';
import { useDatabase, useDatabaseListData } from 'reactfire';

import { UserData } from '@/lib/firebase';

export const useUsers = () => {
  const database = useDatabase();
  const usersRef = ref(database, 'users');
  const usersQuery = query(usersRef, orderByChild('online'));
  const { data: users, status } = useDatabaseListData<UserData>(usersQuery, {
    idField: 'email',
  });

  const addUser = async (data: UserCredential) => {
    const userRef = ref(database, `users/${data.user.uid}`);
    set(userRef, {
      displayName: data.user.displayName,
      email: data.user.email,
      photoURL: data.user.photoURL,
      online: true,
    } as UserData);
  };

  const updateUser = async (uid: string, data: Partial<UserData>) => {
    const userRef = ref(database, `users/${uid}`);
    update(userRef, data);
  };

  return {
    users,
    status,
    updateUser,
    addUser,
  };
};
