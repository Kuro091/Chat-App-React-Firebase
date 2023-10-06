import { MainLayout } from '@/components/layouts';
import { LoadingSpinner } from '@/components/loadingUI';
import { useUsers } from '@/features/auth/hooks/useUsers';

import { ChatTabs } from '../components/ChatTabs';

export const Chat = () => {
  const { users, status } = useUsers();
  if (!users || status === 'loading')
    return (
      <MainLayout className="items-center justify-center">
        <LoadingSpinner />;
      </MainLayout>
    );

  return (
    <MainLayout>
      <ChatTabs users={users} />
    </MainLayout>
  );
};
