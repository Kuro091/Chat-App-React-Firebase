import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useAuthSignOut } from '../hooks/useAuthSignOut';
import { useUsers } from '../hooks/useUsers';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { signOut } = useAuthSignOut();
  const { updateUser } = useUsers();

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={async () => {
        await signOut();
        user?.uid && updateUser(user.uid, { online: false });
        navigate('/');
      }}
    >
      Sign out
    </button>
  );
};
