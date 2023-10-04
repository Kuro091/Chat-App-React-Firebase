import { MainLayout } from "@/components/layouts";
import { LoginButton } from "@/features/auth";
import { useAuth } from "@/features/auth/hooks/useAuth";

const Landing = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="flex-1 min-h-[inherit] grid place-items-center">
        {!user && <LoginButton />}
      </div>
    </MainLayout>
  );
};

export default Landing;
