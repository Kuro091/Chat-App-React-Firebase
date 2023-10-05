import { useNavigate } from 'react-router-dom';

import { useAuthSignOut } from '../hooks/useAuthSignOut';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthSignOut();

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={async () => {
        await signOut();
        navigate('/');
      }}
    >
      Sign out
    </button>
  );
};
