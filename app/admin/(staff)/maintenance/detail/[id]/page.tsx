import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { MaintenanceDetailForm } from "@/components/Form/MaintenanceDetailForm";
import { getMaintenancesById } from "@/data/mantainance";
import { MAINTENNANCES } from "@/types";
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
      <Breadcrumb
        pageName={`Chi tiết đơn bảo trì`}
        link={[
          { name: "Bảo trì", link: "/admin/maintenance" },
          { name: "Chi tiết", link: `/admin/maintenance/detail/${params.id}` },
        ]}
      />
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
