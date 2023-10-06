import { MainLayout } from '@/components/layouts';
import { LoadingSpinner } from '@/components/loadingUI';
import { useUsers } from '@/features/auth/hooks/useUsers';

import { ChatTabs } from '../components/ChatTabs';

export const ChatPage = () => {
  const { users, status, currentUser } = useUsers();

  if (!users || status === 'loading')
    return (
      <MainLayout className="items-center justify-center">
        <LoadingSpinner />;
      </MainLayout>
    );

  return (
    <MainLayout>{currentUser && <ChatTabs users={users} currentUser={currentUser} />}</MainLayout>
  );
};
