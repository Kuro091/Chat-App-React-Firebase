import { UserProfile } from '@/components/common/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/elements/tabs';
import { GroupMessage, UserData } from '@/lib/firebase';

import { MessageInputProps } from './elements/ChatInput';
import { GroupConversation } from './GroupConversation';

interface ChatTabsProps {
  users: UserData[];
  currentUser: UserData;
  onTabClick: (users: UserData[]) => void;
  messages: (GroupMessage & { messageId: string })[];
  onAddChat: (data: MessageInputProps) => void;
}

export const ChatTabs = ({
  users,
  currentUser,
  onTabClick,
  messages,
  onAddChat,
}: ChatTabsProps) => {
  const displayedUsers = users.filter((user) => user.email != currentUser.email);

  return (
    <div className="flex flex-col overflow-y-auto h-full">
      <Tabs className="flex overflow-y-auto h-full">
        <TabsList className="flex flex-col gap-y-5 max-w-[5rem] lg:min-w-[18rem] h-full lg:px-5 lg:py-2 items-start justify-start overflow-y-auto">
          <>
            {displayedUsers.map((user) => (
              <TabsTrigger
                key={user.email}
                value={user.displayName || ''}
                onClick={() => onTabClick([user, currentUser])}
              >
                <UserProfile
                  displayName={user.displayName || ''}
                  online={user.online}
                  photoURL={user.photoURL || ''}
                />
              </TabsTrigger>
            ))}
          </>
        </TabsList>
        <div className="flex-1">
          {displayedUsers.map((user) => (
            <TabsContent key={user.email} value={user.displayName || ''} className="h-full">
              <GroupConversation messages={messages} onSubmit={onAddChat} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <>
        {users.map((user) => {
          <div>{user.displayName}</div>;
        })}
      </>
    </div>
  );
};
