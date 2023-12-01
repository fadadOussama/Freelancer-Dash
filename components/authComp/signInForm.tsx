"use client";

import { MouseEvent, useRef, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import GoogleAuthButton from "./GoogleButton";
import Link from "next/link";

import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisiblity] = useState(false);
  const [signStatus, setSignStatus] = useState(false);
  const [signGuestStatus, setSignGuestStatus] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl");

  // start the sign In process.
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      setSignStatus(true);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(redirectUrl !== null ? redirectUrl : "/");
        toast.success("You've been signed in.");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      toast.error(err.errors[0].longMessage);
    }
  };

  // start the sign In process.
  const handleSubmitGuest = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: "pirokog526@bixolabs.com",
        password: "guestuser2001",
      });

      setSignGuestStatus(true);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(redirectUrl !== null ? redirectUrl : "/");
        toast.success("You've been signed in.");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      toast.error(err.errors[0].longMessage);
    }
  };

  const eyeIconShow = passwordRef.current?.value ? true : false;
  const eyeIconVisible = visible ? <FiEyeOff /> : <FiEye />;

  return (
    <div className="flex w-full h-screen">
      <div className="hidden relative lg:flex h-full w-1/2 bg-loginBg bg-cover loginBgAnimation"></div>

      <div className="w-full lg:w-1/2 flex items-center justify-center text-colorBg">
        <div className="bg-colorText p-10 sm:w-[80%] rounded-lg border border-colorBg/10">
          <h1 className={`sm:text-5xl text-3xl font-semibold text-center font-secondFont`}>Sign In</h1>
          <p className="font-medium sm:text-base text-sm text-center text-colorBg/60 mt-2">Welcome Back! Please enter your details.</p>

          <div className="mt-8">
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="font-semibold text-sm">
                  Email
                </label>
                <input
                  autoComplete="off"
                  className="w-full border border-colorBg/10 rounded-lg p-2.5 mt- bg-transparent outline-none placeholder:text-sm placeholder:font-light"
                  placeholder="Enter your email"
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
                  ref={passwordRef}
                  className="w-full border border-colorBg/10 rounded-lg p-2.5 mt- bg-transparent outline-none placeholder:text-sm placeholder:font-light"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type={visible ? "text" : "password"}
                  placeholder="type your password"
                />
                <span className="absolute cursor-pointer right-4 top-[40px]" onClick={() => setVisiblity(!visible)}>
                  {eyeIconShow && eyeIconVisible}
                </span>
              </div>

              <div className="mt-8 flex flex-col">
                <button
                  disabled={signStatus}
                  onClick={handleSubmit}
                  className={`block w-full bg-colorPurple py-3 text-sm font-semibold text-colorText rounded-lg ${
                    !signStatus && "hover:bg-colorGreen hover:text-colorText active:scale-[.98] active:duration-75 transition-all"
                  } transition-all duration-300`}
                >
                  {signStatus ? "Sign in..." : "Sign in"}
                </button>
              </div>
            </form>

            <GoogleAuthButton />
            <div className="mt-8 flex justify-center items-center">
              <p className="font-semibold text-sm">
                Don&apos;t have an account ?
                <Link
                  href={`/signUp${redirectUrl !== null ? `?redirectUrl=${redirectUrl}` : ""}`}
                  className="text-colorPurple hover:text-colorGreen transition-colors duration-300"
                >
                  {" "}
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="mt-2 flex justify-center items-center">
              <p className="font-semibold text-sm">
                Or just Join as a{" "}
                <button
                  disabled={signGuestStatus}
                  onClick={handleSubmitGuest}
                  className="text-colorPurple hover:text-colorGreen transition-colors duration-300"
                >
                  {signGuestStatus ? "Joining..." : "Guest"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
