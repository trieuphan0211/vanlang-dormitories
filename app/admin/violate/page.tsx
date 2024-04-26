import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ViolateTable } from "@/components/Tables/ViolateTable";
import { getCountViolate, getFilterViolate } from "@/data/violate";
import { VIOLATE } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý vi phạm",
  description: "",
};

const ViolatePage = async ({
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
  const violates = (await getFilterViolate(
    query,
    currentPage,
    entries,
  )) as VIOLATE[];
  const count = await getCountViolate(query);
  return (
    <div>
      <Breadcrumb pageName="Quản lý vi phạm" />
      <ViolateTable violates={violates} count={Number(count)} />
    </div>
  );
};

export default ViolatePage;
