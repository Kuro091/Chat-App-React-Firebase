import { MainLayout } from '@/components/layouts';
import { LoadingSpinner } from '@/components/loadingUI';
import { useUsers } from '@/features/auth/hooks/useUsers';

import { ChatTabs } from '../components/ChatTabs';
import { ChatInputProps } from '../components/GroupConversation';
import { useGroupMessages } from '../hooks/useGroupMessages';
import { useGroups } from '../hooks/useGroups';

export const ChatPage = () => {
  const { users, status, currentUser } = useUsers();
  const { addGroup, selectedGroupId } = useGroups();
  const { groupMessages } = useGroupMessages(selectedGroupId);

  if (!users || status === 'loading')
    return (
      <MainLayout className="items-center justify-center">
        <LoadingSpinner className="w-screen h-screen" />;
      </MainLayout>
    );

  const handleAddChat = (data: ChatInputProps) => {
    console.log('with userId', currentUser?.uid);
    console.log('with groupId', selectedGroupId);
    console.log('with data', data.message);
  };

  return (
    <MainLayout>
      {currentUser && (
        <ChatTabs
          onAddChat={handleAddChat}
          onTabClick={(user) => addGroup(user)}
          users={users}
          currentUser={currentUser}
          messages={groupMessages || []}
        />
      )}
    </MainLayout>
  );
};
