import { ChevronDownSquare, ChevronUpSquare } from 'lucide-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/elements/tabs';
import { UserData } from '@/lib/firebase';

const OnlineLogo = ({ online }: { online: boolean }) => {
  if (online) {
    return <ChevronUpSquare color="green" />;
  }
  return <ChevronDownSquare color="red" />;
};

export const ChatTabs = ({ users }: { users: UserData[] }) => {
  return (
    <div className="flex flex-col">
      <Tabs className="flex">
        <TabsList className="flex flex-col gap-y-5 max-w-[5rem] lg:max-w-xs min-h-screen lg:px-5 lg:py-4 items-start justify-start">
          <>
            {users.map((user) => (
              <TabsTrigger key={user.email} value={user.displayName || ''}>
                <div className="flex  gap-x-2 items-center ">
                  <img width={50} src={user.photoURL || ''} alt="avatar" />
                  <div className="hidden lg:block">{user.displayName}</div>
                  <OnlineLogo online={user.online} />
                </div>
              </TabsTrigger>
            ))}
          </>
        </TabsList>
        <div className="flex-1 bg-accent px-5 py-3">
          {users.map((user) => (
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
