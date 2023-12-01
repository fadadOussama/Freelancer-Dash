"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";

export default function SignOut() {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  return <Button onClick={handleSignOut}>signOut</Button>;
}
