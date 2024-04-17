import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BranchDetailForm } from "@/components/Form/BranchDetailForm";
import { getBranchById } from "@/data/branch";
import { BRANCH } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết chi nhánh",
  description: "",
};
export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const branch = (await getBranchById(params.id)) as BRANCH;
  return (
    <div>
      <Breadcrumb pageName={`Chi tiết chi nhánh`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Branch: {branch?.name}
          </h3>
        </div>
        <div className="p-7">
          {branch && <BranchDetailForm branch={branch} type={"detail"} />}
        </div>
      </div>
    </div>
  );
}
