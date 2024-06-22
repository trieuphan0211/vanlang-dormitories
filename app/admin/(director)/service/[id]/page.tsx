import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ServiceDetailForm } from "@/components/Form/ServiceDetailForm";
import { getServiceById } from "@/data/services";
import { SERVICES } from "@/types";
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
      <Breadcrumb
        pageName={`Cập nhật dịch vụ`}
        link={[
          { name: "Dịch vụ", link: "/admin/service" },
          { name: "Cập nhật", link: `/admin/service/${params.id}` },
        ]}
      />
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
