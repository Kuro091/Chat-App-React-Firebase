import { onDisconnect, onValue, ref, update } from 'firebase/database';
import { useEffect } from 'react';
import { useDatabase, useAuth as useReactFireAuth } from 'reactfire';

export const useAuth = () => {
  const { currentUser } = useReactFireAuth();
  const database = useDatabase();
  const connectedRef = ref(database, '.info/connected');
  const userRef = ref(database, `users/${currentUser?.uid || ''}`);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = onValue(connectedRef, (snap) => {
      if (snap.val() == false) {
        return;
      }

      onDisconnect(userRef)
        .update({ online: false })
        .then(() => {
          update(userRef, { online: true });
        });
    });

    return () => {
      unsub();
    };
  }, [currentUser, userRef, connectedRef]);

  return {
    currentUser,
  };
};
