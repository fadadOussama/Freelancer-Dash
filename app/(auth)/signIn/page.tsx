import SignInForm from "@/components/authComp/signInForm";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await currentUser();
  if (user) redirect("/");

  return <SignInForm />;
}
