import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RegistersTable } from "@/components/Tables/RegistersTable";
import { getCountRegister, getFilterRegister } from "@/data/register";
import { REGISTER } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý đăng ký ký túc xá",
  description: "",
};

const RegisterDormitoryPage = async ({
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
  const registers = (await getFilterRegister(
    query,
    currentPage,
    entries,
  )) as REGISTER[];
  const count = await getCountRegister(query);
  return (
    <div>
      <Breadcrumb pageName="Quản lý đăng ký ký túc xá" />
      <RegistersTable registers={registers} count={Number(count)} />
    </div>
  );
};

export default RegisterDormitoryPage;
