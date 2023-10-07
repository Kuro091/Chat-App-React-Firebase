import { MainLayout } from '@/components/layouts';
import { LoadingSpinner } from '@/components/loadingUI';
import { useUsers } from '@/features/auth/hooks/useUsers';

import { ChatTabs } from '../components/ChatTabs';
import { MessageInputProps } from '../components/elements/ChatInput';
import { useGroupMessages } from '../hooks/useGroupMessages';
import { useGroups } from '../hooks/useGroups';

export const ChatPage = () => {
  const { users, status, currentUser } = useUsers();
  const { addGroup, selectedGroupId } = useGroups();

  // this only renders if there's a selected group
  const { groupMessages, addChatMessage } = useGroupMessages(selectedGroupId);

  if (!users || status === 'loading')
    return (
      <MainLayout className="items-center justify-center">
        <LoadingSpinner className="w-screen h-screen" />;
      </MainLayout>
    );

  const handleAddChat = (data: MessageInputProps) => {
    if (data.message === '') return;
    addChatMessage(selectedGroupId, {
      content: data.message,
      sender: currentUser?.uid || '',
      photoUrl: currentUser?.photoURL || '',
      timestamp: new Date().toISOString(),
      read: false,
      senderDisplayName: currentUser?.displayName || '',
      readTimeStamp: new Date().toISOString(),
    });
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
