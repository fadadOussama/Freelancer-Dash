import { redirect, usePathname } from "next/navigation";

export default function UserRedirect() {
  const pathname = usePathname();

  redirect(`/signIn?redirectUrl=${pathname}`);

  return <></>;
}
