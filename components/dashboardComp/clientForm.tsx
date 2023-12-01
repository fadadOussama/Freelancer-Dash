"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Dispatch, FormEvent, SetStateAction, startTransition, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ClientType, referralSourceType } from "./clientsComp/columns";
import { referralSources } from "@/array/referralSourceArr";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { CountriesSelect } from "./selectCountrys";
import { generateUniqueId } from "@/helpers/generateUniqueId";
import updateClientInDb from "@/serverActions/updateClientInDb";
import clientFormValidation from "@/helpers/clientFormValidation";
import checkIfClientDataDiff from "@/helpers/checkIfClientDataDiff";

type propsTypes = {
  editOpen?: boolean;
  setEditOpen?: Dispatch<SetStateAction<boolean>>;
  data: ClientType[];
  setTableData: (action: unknown) => void;
  client: ClientType | undefined;
};

export default function ClientForm({ client, editOpen, setEditOpen, data, setTableData }: propsTypes) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const projectsRef = useRef<HTMLInputElement | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<string>(client ? client.country : "");
  const [selectedSource, setSelectedSource] = useState<string>(client ? client.referralSource : "");

  const resetState = () => {
    if (!client) {
      setSelectedCountry("");
      setSelectedSource("");
    }
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();

    const clientFormValidationResult = clientFormValidation(nameRef, emailRef, projectsRef, selectedCountry, selectedSource);

    if (!clientFormValidationResult) {
      return;
    }

    const { name, email, projects } = clientFormValidationResult;

    // Optimistic Update
    const optimisticData = JSON.parse(JSON.stringify(data));
    optimisticData.unshift({
      id: generateUniqueId(),
      country: selectedCountry,
      referralSource: selectedSource as referralSourceType,
      email,
      name,
      projects: +projects,
    });

    startTransition(() => {
      setTableData(optimisticData);
    });

    if (setEditOpen) setEditOpen(false);
    toast.success("Client added successfully");

    // Data base update
    const res = await updateClientInDb(optimisticData);
    res.error && toast.error("Failed to add a new client!");
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    const clientFormValidationResult = clientFormValidation(nameRef, emailRef, projectsRef, selectedCountry, selectedSource);
    if (!clientFormValidationResult) {
      return;
    }
    const { name, email, projects } = clientFormValidationResult;

    const checkIfClientDataDiffResult = checkIfClientDataDiff(client, name, email, projects, selectedCountry, selectedSource);

    if (checkIfClientDataDiffResult) {
      const clientsCopy: ClientType[] = JSON.parse(JSON.stringify(data));
      const clientIndex = data.findIndex((cl) => cl.id === client?.id);

      clientsCopy.splice(clientIndex, 1, {
        id: client?.id as string,
        name,
        email,
        projects,
        country: selectedCountry,
        referralSource: selectedSource as referralSourceType,
      });

      startTransition(() => {
        setTableData(clientsCopy);
      });
      toast.success("Client updated successfully");

      // Database update
      const res = await updateClientInDb(clientsCopy);
      res.error && toast.error("Failed to update the client!");
    } else {
      return;
    }

    if (setEditOpen) setEditOpen(false);
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent onInteractOutside={resetState} onEscapeKeyDown={resetState} onCloseAutoFocus={resetState}>
        <DialogHeader className="mb-4">
          <DialogTitle>{client ? "Edit Client" : "Add Client"}</DialogTitle>
          <DialogDescription>
            {client
              ? "Make changes to your client's data here, Click save when you're done."
              : "Fill out the inputs with your client's data, Click add when you're done."}
          </DialogDescription>
        </DialogHeader>

        <form className="grid w-full max-w-lg gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-center text-sm font-medium">
              Name
            </label>
            <input
              defaultValue={client?.name}
              autoComplete="off"
              ref={nameRef}
              id="name"
              className="placeholder:text-colorText/50 col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none"
              placeholder="Enter Content Here"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-center text-sm font-medium">
              Email
            </label>
            <input
              defaultValue={client?.email}
              autoComplete="off"
              ref={emailRef}
              id="email"
              className="placeholder:text-colorText/50 col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none"
              placeholder="Enter Content Here"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4   ">
            <label htmlFor="projects" className="text-center text-sm font-medium">
              Projects
            </label>
            <input
              type="number"
              min={1}
              defaultValue={client?.projects}
              autoComplete="off"
              ref={projectsRef}
              id="projects"
              className="placeholder:text-colorText/50 col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none"
              placeholder="Enter Content Here"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-center text-sm font-medium">Country</label>
            <CountriesSelect
              isEditClient={client}
              clientCountry={client?.country}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-center text-sm font-medium">Referral Source</label>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="col-span-3 text-sm py-2 px-3 bg-colorBg border-[2px] border-colorText/10 rounded-md outline-none">
                {client ? <SelectValue placeholder={client.referralSource} /> : <SelectValue placeholder={"Select referral source"} />}
              </SelectTrigger>
              <SelectContent>
                {referralSources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {client ? (
            <Button variant={"default"} onClick={handleEdit} className="active:scale-[.98] active:duration-75 transition-all">
              Save Changes
            </Button>
          ) : (
            <Button variant={"default"} onClick={handleAdd} className="active:scale-[.98] active:duration-75 transition-all">
              Add Client
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
