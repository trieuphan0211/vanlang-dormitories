import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FacilitiesTypeDetailForm } from "@/components/Form/FacilitiesTypeDetailForm";
import { getFacilitiesTypeById } from "@/data/facilities-type";
import { FACILITIESTYPE } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết loại cơ sở vật chất",
  description: "",
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const facilitiesType = (await getFacilitiesTypeById(
    params.id,
  )) as FACILITIESTYPE;
  return (
    <div>
      <Breadcrumb
        pageName={`Chi tiết loại cơ sở vật chất`}
        link={[
          { name: "Loại cơ sở vật chất", link: "/admin/facilities-type" },
          {
            name: "Chi tiết",
            link: `/admin/facilities-type/detail/${params.id}`,
          },
        ]}
      />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Loại cơ sở vật chất: {facilitiesType?.name}
          </h3>
        </div>
        <div className="p-7">
          {facilitiesType && (
            <FacilitiesTypeDetailForm
              facilitiesType={facilitiesType}
              type="detail"
            />
          )}
        </div>
      </div>
    </div>
  );
}
