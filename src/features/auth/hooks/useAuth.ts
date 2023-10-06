import { onDisconnect, onValue, ref, update } from 'firebase/database';
import { useDatabase, useUser } from 'reactfire';

export const useAuth = () => {
  const { data: user, status, isComplete, error } = useUser();
  const database = useDatabase();
  const connectedRef = ref(database, '.info/connected');
  const userRef = ref(database, `users/${user?.uid}`);

  if (user?.uid) {
    onValue(connectedRef, (snap) => {
      if (snap.val() == false) {
        return;
      }

      onDisconnect(userRef)
        .update({ online: false })
        .then(() => {
          update(userRef, { online: true });
        });
    });
  }

  return {
    user,
    status,
    isComplete,
    error,
  };
};
