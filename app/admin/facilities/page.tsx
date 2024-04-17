import { getBranchsAll } from "@/actions/branch";
import { getFacilitiesTypeAll } from "@/actions/facilitiesType";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FacilitiesTable } from "@/components/Tables/FacilitiesTable";
import { getCountFacilities, getFilterFacilities } from "@/data/facilities";
import { BRANCH, FACILITIES, FACILITIESTYPE } from "@/types";
import { Branch, FacilitiesType } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý cơ sở vật chất",
  description: "",
};

const FacilitiesPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const facilities = (await getFilterFacilities(
    query,
    currentPage,
    entries,
  )) as FACILITIES[];
  const branchs = (await getBranchsAll()) as BRANCH[];
  const facilitiesType = (await getFacilitiesTypeAll()) as FACILITIESTYPE[];
  const count = await getCountFacilities(query);
  return (
    <div>
      <Breadcrumb pageName="Quản lý cơ sở vật chất" />
      <FacilitiesTable
        facilities={facilities}
        count={Number(count)}
        branchs={branchs}
        facilitiesType={facilitiesType}
      />
    </div>
  );
};

export default FacilitiesPage;
