import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { MaintenancesTable } from "@/components/Tables/MaintenancesTable";
import {
  getCountMaintenances,
  getFilterMaintenances,
} from "@/data/mantainance";

import { MAINTENNANCES } from "@/types/maintenances";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý bảo trì",
  description: "",
};

const MaintenancePage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const maintenances = (await getFilterMaintenances(
    query,
    currentPage,
    entries,
  )) as MAINTENNANCES[];
  const count = await getCountMaintenances(query);
  return (
    <div>
      <Breadcrumb pageName="Quản lý bảo trì" />
      <MaintenancesTable maintenances={maintenances} count={Number(count)} />
    </div>
    // <div>
    //   {open && (
    //
    //   )}

    //   <p>{data}</p>
    //   <button onClick={() => setOpen(!open)}>OPEN</button>
    // </div>
  );
};

export default MaintenancePage;
