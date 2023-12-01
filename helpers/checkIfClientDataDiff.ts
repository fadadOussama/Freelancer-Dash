import { ClientType } from "@/components/dashboardComp/clientsComp/columns";
import { toast } from "sonner";

export default function checkIfClientDataDiff(
  client: ClientType | undefined,
  name: string,
  email: string,
  projects: number,
  selectedCountry: string,
  selectedSource: string
) {
  if (!client) return;

  if (
    name === client.name &&
    email === client.email &&
    projects === client.projects &&
    selectedCountry === client.country &&
    selectedSource === client.referralSource
  ) {
    toast.error("You don't change any data!");
    return false;
  } else {
    return true;
  }
}
