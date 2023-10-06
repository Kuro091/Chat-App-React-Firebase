import { MainLayout } from '@/components/layouts';
import { LoadingSpinner } from '@/components/loadingUI';
import { AuthWrapper } from '@/features/auth';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/lib/tailwind-classname';
import { useSiteStore } from '@/store/site';

const UserDetails = () => {
  const { user, status } = useAuth();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (!user) {
    throw new Error('No user Loaded');
  }

  return (
    <>
      <div className="p-16 bg-primary-foreground text-primary">
        <h1 className="font-bold text-7xl">Welcome {user.displayName}</h1>
      </div>
    </>
  );
};

const LandingPage = () => {
  const { headerSize } = useSiteStore();

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
