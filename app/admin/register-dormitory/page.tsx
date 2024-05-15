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
    roomCode?: string;
    branchName?: string;
    year?: string;
    date?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const roomCode = searchParams?.roomCode?.trim() || "";
  const branchName = searchParams?.branchName?.trim() || "";
  const year = Number(searchParams?.year?.trim()) || 0;
  // const date = searchParams?.date?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const registers = (await getFilterRegister(
    query,
    roomCode,
    branchName,
    year,
    // date,
    currentPage,
    entries,
  )) as REGISTER[];
  const count = await getCountRegister(
    query,
    roomCode,
    branchName,
    year,
    // date,
  );
  return (
    <div>
      <Breadcrumb pageName="Quản lý đăng ký ký túc xá" />
      <RegistersTable registers={registers} count={Number(count)} />
    </div>
  );
};

export default RegisterDormitoryPage;
