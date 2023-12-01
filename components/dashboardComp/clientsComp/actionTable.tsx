import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ActionTableDelete from "./actionTableDelete";
import { ClientType } from "./columns";
import { useState } from "react";
import { toast } from "sonner";
import ClientForm from "../clientForm";

type Props = {
  client: ClientType;
  tableData: ClientType[];
  setTableData: (action: unknown) => void;
};

export default function ActionsDropDown({ client, setTableData, tableData }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCopyClientEmail = () => {
    navigator.clipboard.writeText(client.email);
    toast.success(`${client.email} is copied successfully`);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-colorText" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleCopyClientEmail}>Copy Client&apos;s Email</DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setEditOpen(true)}>Edit Client</DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setDeleteOpen(true)}>Delete Client</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ClientForm editOpen={editOpen} setEditOpen={setEditOpen} client={client} setTableData={setTableData} data={tableData} />
      <ActionTableDelete deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} client={client} data={tableData} setTableData={setTableData} />
    </>
  );
}
