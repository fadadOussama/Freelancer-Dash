import SignUpForm from "@/components/authComp/signUpForm";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await currentUser();
  if (user) redirect("/");

  return <SignUpForm />;
}
