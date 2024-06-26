import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ServiceDetailForm } from "@/components/Form/ServiceDetailForm";
import { ViolateTypeDetailForm } from "@/components/Form/ViolateTypeDetailForm";
import { getServiceById } from "@/data/services";
import { getViolateTypeById } from "@/data/violate-type";
import { SERVICES } from "@/types";
import { ViolateType } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết loại vi phạm",
  description: "",
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const violateType = (await getViolateTypeById(params.id)) as ViolateType;
  return (
    <div>
      <Breadcrumb
        pageName={`Cập nhật Loại vi phạm`}
        link={[
          { name: "Loại vi phạm", link: "/admin/violate-type" },
          { name: "Chi tiết", link: `/admin/violate-type/detail/${params.id}` },
        ]}
      />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Loại vi phạm: {violateType?.name}
          </h3>
        </div>
        <div className="p-7">
          {violateType && (
            <ViolateTypeDetailForm violateType={violateType} type="detail" />
          )}
        </div>
      </div>
    </div>
  );
}
