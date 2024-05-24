import { getBranchsAll } from "@/actions/branch";
import { getFacilitiesTypeAll } from "@/actions/facilitiesType";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FacilityDetailForm } from "@/components/Form/FacilityDetailForm";
import { getFacilitiesById } from "@/data/facilities";
import { BRANCH, FACILITIES } from "@/types";
import { Branch, FacilitiesType } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết cơ sở vật chất",
  description: "",
};
export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const facilities = (await getFacilitiesById(params.id)) as FACILITIES;
  const branchs = (await getBranchsAll()) as BRANCH[];

  return (
    <div>
      <Breadcrumb pageName={`Chi tiết cơ sở vật chất`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Cơ sở vật chất: {facilities?.name}
          </h3>
        </div>
        <div className="p-7">
          {facilities && (
            <FacilityDetailForm
              facilities={facilities}
              branchs={branchs}
              type="detail"
            />
          )}
        </div>
      </div>
    </div>
  );
}
