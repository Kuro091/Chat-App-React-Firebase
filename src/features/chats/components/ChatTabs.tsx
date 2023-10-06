import { UserProfile } from '@/components/common/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/elements/tabs';
import { UserData } from '@/lib/firebase';

interface ChatTabsProps {
  users: UserData[];
  currentUser: UserData;
  onTabClick: (users: UserData[]) => void;
}

export const ChatTabs = ({ users, currentUser, onTabClick }: ChatTabsProps) => {
  const displayedUsers = users.filter((user) => user.email != currentUser.email);

  return (
    <div className="flex flex-col overflow-y-auto">
      <Tabs className="flex overflow-y-auto">
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
