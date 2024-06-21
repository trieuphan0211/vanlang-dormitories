import { getStudentsAll } from "@/actions/student";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ViolateDetailForm } from "@/components/Form/ViolateDetailForm";
import { getViolateById } from "@/data/violate";
import { STUDENT, VIOLATE } from "@/types";
import { Violate } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cập nhật vi phạm",
  description: "",
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const violate = (await getViolateById(params.id)) as VIOLATE;
  const students = (await getStudentsAll()) as STUDENT[];
  return (
    <div>
      <Breadcrumb pageName={`Cập nhật vi phạm`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Tên vi phạm: {violate?.TypeViolate?.name}
          </h3>
        </div>
        <div className="p-7">
          {violate && <ViolateDetailForm violate={violate} />}
        </div>
      </div>
    </div>
  );
}
