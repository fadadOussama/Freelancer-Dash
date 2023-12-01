import { useSignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SiGoogle } from "react-icons/si";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GoogleAuthButton() {
  const { isLoaded, signIn } = useSignIn();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");

  const [isLoading, setIsLoading] = useState(false);

  const signInWith = async () => {
    if (!isLoaded) return;

    setIsLoading(true);

    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: redirectUrl !== null ? redirectUrl : "/",
    });

    setIsLoading(false);
  };

  return (
    <div
      onClick={() => signInWith()}
      className="flex border border-colorBg/10 rounded-lg mt-4 py-3 items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all cursor-pointer"
    >
      <span className="text-sm">{isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <SiGoogle />}</span>
      <button className="text-sm font-semibold" disabled={isLoading}>
        Sign in with Google
      </button>
    </div>
  );
}
