import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { MaintenanceDetailForm } from "@/components/FormElements/MaintenanceDetailForm";
import { getMaintenancesById } from "@/data/mantainance";
import { MAINTENNANCES } from "@/types/maintenances";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cập nhật đơn bảo trì",
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
      <Breadcrumb pageName={`Cập nhật đơn bảo trì`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Tên đơn bảo trì: {maintenance?.mantainanceName}
          </h3>
        </div>
        <div className="p-7">
          {maintenance && <MaintenanceDetailForm maintenance={maintenance} />}
        </div>
      </div>
    </div>
  );
}
