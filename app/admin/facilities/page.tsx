import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FacilitiesTable } from "@/components/Tables/FacilitiesTable";
import { getCountFacilities, getFilterFacilities } from "@/data/facilities";
import { FACILITIES } from "@/types/facilities";
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

  const count = await getCountFacilities(query);
  return (
    <div>
      <Breadcrumb pageName="Quản lý cơ sở vật chất" />
      <FacilitiesTable facilities={facilities} count={Number(count)} />
    </div>
  );
};

export default FacilitiesPage;
