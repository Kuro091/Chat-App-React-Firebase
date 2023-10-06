import { UserProfile } from '@/components/common/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/elements/tabs';
import { UserData } from '@/lib/firebase';

export const ChatTabs = ({ users, currentUser }: { users: UserData[]; currentUser: UserData }) => {
  const displayedUsers = users.filter((user) => user.email != currentUser.email);

  return (
    <div className="flex flex-col">
      <Tabs className="flex">
        <TabsList className="flex flex-col gap-y-5 max-w-[5rem] lg:max-w-xs min-h-screen lg:px-5 lg:py-4 items-start justify-start">
          <>
            {displayedUsers.map((user) => (
              <TabsTrigger key={user.email} value={user.displayName || ''}>
                <UserProfile
                  displayName={user.displayName || ''}
                  online={user.online}
                  photoURL={user.photoURL || ''}
                />
              </TabsTrigger>
            ))}
          </>
        </TabsList>
        <div className="flex-1 bg-accent px-5 py-3">
          {displayedUsers.map((user) => (
            <TabsContent key={user.email} value={user.displayName || ''}>
              <div>{user.displayName}</div>
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
