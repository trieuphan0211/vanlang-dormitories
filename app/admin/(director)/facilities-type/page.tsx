import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FacilitiesTypeTable } from "@/components/Tables/FacilitiesTypeTable";
import {
  getCountFacilitiestypes,
  getFilterFacilitiesTypes,
} from "@/data/facilities-type";
import { FACILITIESTYPE } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý loại cơ sở vật chất",
  description: "",
};
const FacilitiesTypePage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    entries?: string;
    facilitiesTypeCode?: string;
    description?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const facilitiesTypeCode = searchParams?.facilitiesTypeCode?.trim() || "";
  const description = searchParams?.description?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const facilitiesTypes = (await getFilterFacilitiesTypes(
    query,
    facilitiesTypeCode,
    description,
    currentPage,
    entries,
  )) as FACILITIESTYPE[];
  const count = await getCountFacilitiestypes(
    query,
    facilitiesTypeCode,
    description,
  );
  return (
    <div>
      <Breadcrumb
        pageName="Quản lý loại cơ sở vật chất"
        link={[{ name: "Loại cơ sở vật chất", link: "/admin/facilities-type" }]}
      />
      <FacilitiesTypeTable
        facilitiesTypes={facilitiesTypes}
        count={Number(count)}
      />
    </div>
  );
};

export default FacilitiesTypePage;
