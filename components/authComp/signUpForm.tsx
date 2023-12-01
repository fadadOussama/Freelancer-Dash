"use client";

import { MouseEvent, useRef, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import GoogleAuthButton from "./GoogleButton";

import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [visible, setVisiblity] = useState(false);
  const [signStatus, setSignStatus] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");

  const router = useRouter();

  // start the sign up process.
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        firstName,
        lastName,
        password,
      });

      setSignStatus(true);

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
      toast("A verification code has been sent to your email to verify your account");
    } catch (err: any) {
      toast.error(err.errors[0].longMessage);
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push(redirectUrl !== null ? redirectUrl : "/");
        toast.success("You've been signed up.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const eyeIconShow = passwordRef.current?.value ? true : false;
  const eyeIconVisible = visible ? <FiEyeOff /> : <FiEye />;

  return (
    <div className={`flex w-full ${pendingVerification ? "h-screen" : "authHeight"}`}>
      <div className="w-full lg:w-1/2 flex items-center justify-center my-12 mx-3 text-colorBg">
        <div className="bg-colorText p-10 rounded-lg sm:w-[80%] border border-colorBg/10">
          <h1 className={`sm:text-5xl text-3xl font-semibold text-center font-secondFont`}>Sign Up</h1>
          {!pendingVerification ? (
            <p className="font-medium sm:text-base text-sm text-center text-colorBg/60 mt-2">Choose your preferred sign up method</p>
          ) : (
            <p className="font-medium sm:text-base text-sm text-center text-colorBg/60 mt-2">
              Verification methods assist in authenticating the identity of users
            </p>
          )}

          <div className="mt-8">
            {!pendingVerification && (
              <div>
                <form>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="font-semibold text-sm">
                      First name
                    </label>
                    <input
                      autoComplete="off"
                      className="w-full border border-colorBg/10 rounded-lg p-2.5 mt- bg-transparent outline-none placeholder:text-sm placeholder:font-light"
                      placeholder="type your first name"
                      onChange={(e) => setfirstName(e.target.value)}
                      id="firstName"
                      name="firstName"
                      type="text"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="lastName" className="font-semibold text-sm">
                      Last Name
                    </label>
                    <input
                      autoComplete="off"
                      className="w-full border border-colorBg/10 rounded-lg p-2.5 mt- bg-transparent outline-none placeholder:text-sm placeholder:font-light"
                      placeholder="type your last name"
                      onChange={(e) => setlastName(e.target.value)}
                      id="lastName"
                      name="lastName"
                      type="text"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="font-semibold text-sm">
                      E-mail
                    </label>
                    <input
                      autoComplete="off"
                      className="w-full border border-colorBg/10 rounded-lg p-2.5 mt- bg-transparent outline-none placeholder:text-sm placeholder:font-light"
                      placeholder="example@example.com"
                      onChange={(e) => setEmailAddress(e.target.value)}
                      id="email"
                      name="email"
                      type="email"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="password" className="font-semibold text-sm">
                      Password
                    </label>
                    <input
                      className="w-full border border-colorBg/10 rounded-lg p-2.5 mt- bg-transparent outline-none placeholder:text-sm placeholder:font-light"
                      placeholder="type your password"
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      name="password"
                      type={visible ? "text" : "password"}
                      ref={passwordRef}
                    />
                    <span className="absolute cursor-pointer right-4 top-[40px]" onClick={() => setVisiblity(!visible)}>
                      {eyeIconShow && eyeIconVisible}
                    </span>
                  </div>

                  <div className="mt-8 flex flex-col gap-y-4">
                    <button
                      disabled={signStatus}
                      onClick={handleSubmit}
                      className={`block w-full bg-colorPurple py-3 text-sm font-semibold text-colorText rounded-lg ${
                        !signStatus && "hover:bg-colorGreen hover:text-colorText active:scale-[.98] active:duration-75 transition-all"
                      } transition duration-300`}
                    >
                      {signStatus ? "Sign up..." : "Sign up"}
                    </button>
                  </div>
                </form>

                <GoogleAuthButton />
                <div className="mt-8 flex justify-center items-center">
                  <p className="font-semibold text-sm">
                    Already have an account ?
                    <Link
                      className="text-colorPurple hover:text-colorGreen transition-colors duration-300"
                      href={`/signIn${redirectUrl !== null ? `?redirectUrl=${redirectUrl}` : ""}`}
                    >
                      {" "}
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {pendingVerification && (
              <div>
                <form>
                  <label htmlFor="verification" className="font-semibold text-sm">
                    Verification code
                  </label>
                  <input
                    autoComplete="off"
                    className="w-full border border-colorBg/10 rounded-lg p-2.5 mt- bg-transparent outline-none placeholder:text-sm placeholder:font-light"
                    name="vrification"
                    id="verification"
                    value={code}
                    placeholder="type your code"
                    onChange={(e) => setCode(e.target.value)}
                  />

                  <div className="mt-8">
                    <button
                      className="block w-full bg-colorPurple py-3 text-sm font-semibold text-colorText rounded-lg hover:bg-colorGreen hover:text-colorText active:scale-[.98] active:duration-75 duration-300 transition-all"
                      onClick={onPressVerify}
                    >
                      Verify Email
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden relative lg:flex h-full w-1/2 bg-loginBg bg-cover loginBgAnimation"></div>
    </div>
  );
}
