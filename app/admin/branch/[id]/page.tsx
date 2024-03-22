import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BranchDetailForm } from "@/components/FormElements/BranchDetailForm";
import { getBranchById } from "@/data/branch";
import { BRANCH } from "@/types/branch";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const branch = (await getBranchById(params.id)) as BRANCH;
  return (
    <div>
      <Breadcrumb pageName={`Detail`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Branch: {branch?.name}
          </h3>
        </div>
        <div className="p-7">
          <BranchDetailForm branch={branch} />
        </div>
      </div>
    </div>
  );
}
