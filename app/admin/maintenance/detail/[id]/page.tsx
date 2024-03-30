import { getBranchsAll } from "@/actions/branch";
import { getFacilitiesTypeAll } from "@/actions/facilitiesType";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FacilityDetailForm } from "@/components/FormElements/FacilityDetailForm";
import { MaintenanceDetailForm } from "@/components/FormElements/MaintenanceDetailForm";
import { getFacilitiesById } from "@/data/facilities";
import { getMaintenancesById } from "@/data/mantainance";
import { FACILITIES } from "@/types/facilities";
import { MAINTENNANCES } from "@/types/maintenances";
import { Branch, FacilitiesType } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết đơn bảo trì",
  description: "",
};
export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const maintenance = (await getMaintenancesById(params.id)) as MAINTENNANCES;
  return (
    <div>
      <Breadcrumb pageName={`Chi tiết đơn bảo trì`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Tên đơn bảo trì: {maintenance?.mantainanceName}
          </h3>
        </div>
        <div className="p-7">
          {maintenance && (
            <MaintenanceDetailForm maintenance={maintenance} type="detail" />
          )}
        </div>
      </div>
    </div>
  );
}
