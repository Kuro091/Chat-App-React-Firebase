import { useEffect } from 'react';

import { MainLayout } from '@/components/layouts';
import { AuthWrapper } from '@/features/auth';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useUsers } from '@/features/auth/hooks/useUsers';
import { useMessaging } from '@/hooks/useMessaging';
import { cn } from '@/lib/tailwind-classname';
import { useSiteStore } from '@/store/site';

const UserDetails = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    throw new Error('No user Loaded');
  }

  return (
    <>
      <div className="p-16 bg-primary-foreground text-primary">
        <h1 className="font-bold text-7xl">Welcome {currentUser.displayName}</h1>
      </div>
    </>
  );
};

const LandingPage = () => {
  const { headerSize } = useSiteStore();
  const { requestForToken } = useMessaging();
  const { currentUser, updateUser } = useUsers();

  useEffect(() => {
    if (!currentUser) return;
    const requestToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
      const token = await requestForToken();
      if (!token || !currentUser) return;
      updateUser(currentUser.uid, {
        deviceToken: token,
      });
    };
    requestToken();
  }, [requestForToken, updateUser, currentUser]);

  return (
    <MainLayout>
      <div
        style={{
          paddingBottom: headerSize + 20,
        }}
        className={cn('flex-1 min-h-[inherit] grid place-items-center')}
      >
        <AuthWrapper>
          <UserDetails />
        </AuthWrapper>
      </div>
    </MainLayout>
  );
};

export default LandingPage;
