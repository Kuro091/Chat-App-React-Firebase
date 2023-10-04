import GoogleButton from "react-google-button";
import { PacmanLoader } from "react-spinners";

import { useGoogleSignIn } from "../hooks/useSignInWithGoogle";

export const LoginButton = () => {
  const { signInWithGoogle, loading } = useGoogleSignIn();

  if (loading)
    return (
      <div className="flex flex-col gap-y-5 items-center bg-white p-20">
        <div className="text-3xl font-bold text-primary">
          Waiting for you to login...
        </div>
        <PacmanLoader color="hsl(62, 80%, 50%)" loading={loading} />
      </div>
    );

  return (
    <div>
      <GoogleButton onClick={() => signInWithGoogle()} disabled={loading} />
    </div>
  );
};
