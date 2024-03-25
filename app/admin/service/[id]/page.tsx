import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomTypeDetailForm } from "@/components/FormElements/RoomTypeDetailForm";
import { ServiceDetailForm } from "@/components/FormElements/ServiceDetailForm";
import { getServiceById } from "@/data/services";
import { SERVICES } from "@/types/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cập nhật dịch vụ",
  description: "",
};

export default async function UpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const service = (await getServiceById(params.id)) as SERVICES;
  return (
    <div>
      <Breadcrumb pageName={`Cập nhật dịch vụ`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Dịch vụ: {service?.name}
          </h3>
        </div>
        <div className="p-7">
          {service && <ServiceDetailForm service={service} />}
        </div>
      </div>
    </div>
  );
}
