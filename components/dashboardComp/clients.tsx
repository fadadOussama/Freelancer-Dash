
import { fetchClients } from "@/helpers/fetchClients";
import { DataTable } from "./clientsComp/dataTable";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Clients({ searchParams }: Props) {
  const { pageIndex, pageSize, sort, clientsData, filter } = await fetchClients(searchParams);

  return (
    <div className="case">
      <DataTable data={clientsData} pageIndex={pageIndex} pageSize={pageSize} sort={sort} filter={filter} />
    </div>
  );
}
