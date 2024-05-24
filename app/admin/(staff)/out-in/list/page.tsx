import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InOutTable } from "@/components/Tables/InOutTable";
import { getCountInOut, getFilterInOut } from "@/data/in-out";
import { INOUT } from "@/types";
import { StatusInOut } from "@prisma/client";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý ra/vào",
  description: "",
};

const ListInOutPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    status?: string;
    studentCode?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const status = (searchParams?.status?.trim() || "") as StatusInOut;
  const studentCode = searchParams?.studentCode?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const inOuts = (await getFilterInOut(
    query,
    status,
    studentCode,
    currentPage,
    entries,
  )) as INOUT[];
  const count = await getCountInOut(query, status, studentCode);
  return (
    <div>
      <Breadcrumb pageName="Danh sách ra/vào" />
      <InOutTable inOuts={inOuts} count={Number(count)} />
    </div>
  );
};

export default ListInOutPage;
