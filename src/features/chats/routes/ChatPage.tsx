import { MainLayout } from '@/components/layouts';
import { LoadingSpinner } from '@/components/loadingUI';
import { useUsers } from '@/features/auth/hooks/useUsers';

import { ChatTabs } from '../components/ChatTabs';
import { useGroups } from '../hooks/useGroups';

export const ChatPage = () => {
  const { users, status, currentUser } = useUsers();
  const { addGroup } = useGroups();

  if (!users || status === 'loading')
    return (
      <MainLayout className="items-center justify-center">
        <LoadingSpinner className="w-screen h-screen" />;
      </MainLayout>
    );

  return (
    <MainLayout>
      {currentUser && (
        <ChatTabs onTabClick={(user) => addGroup(user)} users={users} currentUser={currentUser} />
      )}
    </MainLayout>
  );
};
