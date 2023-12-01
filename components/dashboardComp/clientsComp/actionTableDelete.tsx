"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction, startTransition } from "react";
import { toast } from "sonner";
import { ClientType } from "./columns";
import updateClientInDb from "@/serverActions/updateClientInDb";

type propsTypes = {
  deleteOpen: boolean;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
  client: ClientType;
  data: ClientType[];
  setTableData: (action: unknown) => void;
};

export default function ActionTableDelete({ deleteOpen, setDeleteOpen, client, data, setTableData }: propsTypes) {
  const handleDelete = async () => {
    const clientsCopy: ClientType[] = JSON.parse(JSON.stringify(data));
    const clientIndex = data.findIndex((cl) => cl.id === client?.id);

    clientsCopy.splice(clientIndex, 1);

    startTransition(() => {
      setTableData(clientsCopy);
    });
    toast.success("Client deleted successfuly");

    // Database update
    const res = await updateClientInDb(clientsCopy);
    res.error && toast.error("Failed to delete the client!");
  };

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone and it will permanently delete your client.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction className="w-full" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
