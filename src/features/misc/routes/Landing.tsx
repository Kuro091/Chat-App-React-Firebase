import { MainLayout } from '@/components/layouts';
import { LoginButton } from '@/features/auth';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/lib/tailwind-classname';
import { useSiteStore } from '@/store/site';

const Landing = () => {
  const { user } = useAuth();
  const { headerSize } = useSiteStore();

  return (
    <MainLayout>
      <div
        style={{
          paddingBottom: headerSize,
        }}
        className={cn('flex-1 min-h-[inherit] grid place-items-center')}
      >
        {!user && <LoginButton />}
      </div>
    </MainLayout>
  );
};

export default Landing;
