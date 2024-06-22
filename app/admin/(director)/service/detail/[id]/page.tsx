import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ServiceDetailForm } from "@/components/Form/ServiceDetailForm";
import { getServiceById } from "@/data/services";
import { SERVICES } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết dịch vụ",
  description: "",
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const service = (await getServiceById(params.id)) as SERVICES;
  return (
    <div>
      <Breadcrumb
        pageName={`Chi tiết dịch vụ`}
        link={[
          { name: "Dịch vụ", link: "/admin/service" },
          { name: "Chi tiết", link: `/admin/service/detail/${params.id}` },
        ]}
      />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Dịch vụ: {service?.name}
          </h3>
        </div>
        <div className="p-7">
          {service && <ServiceDetailForm service={service} type={"detail"} />}
        </div>
      </div>
    </div>
  );
}
