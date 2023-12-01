import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ClientForm from "../clientForm";
import { ClientType } from "./columns";

type Props = {
  data: ClientType[];
  setTableData: (action: unknown) => void;
};

export default function ActionTableAdd({ data, setTableData }: Props) {
  const [clientState, setClientState] = useState(false);

  const handleClientForm = () => {
    setClientState(true);
  };

  return (
    <>
      <div>
        <Button
          variant="outline"
          className="font-normal bg-colorText text-colorBg duration-300 active:scale-[.98] active:duration-75 transition-all"
          onClick={handleClientForm}
        >
          <span className="select-none">Add New Client</span>
        </Button>
      </div>

      <ClientForm client={undefined} editOpen={clientState} setEditOpen={setClientState} data={data} setTableData={setTableData} />
    </>
  );
}
