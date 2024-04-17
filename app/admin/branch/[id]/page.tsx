import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BranchDetailForm } from "@/components/Form/BranchDetailForm";
import { getBranchById } from "@/data/branch";
import { BRANCH } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cập nhật chi nhánh",
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
      <Breadcrumb pageName={`Cập nhật chi nhánh`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Chi nhánh: {branch?.name}
          </h3>
        </div>
        <div className="p-7">
          {branch && <BranchDetailForm branch={branch} />}
        </div>
      </div>
    </div>
  );
}
