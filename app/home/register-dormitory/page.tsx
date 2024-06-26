import { auth } from "@/auth";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RegistersTable } from "@/components/Tables/RegistersTable";
import { getCountRegister, getFilterRegister } from "@/data/register";
import { currentUser } from "@/lib/auth";
import { REGISTER } from "@/types";
import React from "react";

const RegisterPage = async ({
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
    status?: string;
  };
}) => {
  const user = await auth();
  const query = searchParams?.query?.trim() || "";
  const roomCode = searchParams?.roomCode?.trim() || "";
  const branchName = searchParams?.branchName?.trim() || "";
  const year = Number(searchParams?.year?.trim()) || 0;
  const date = searchParams?.date?.trim() || "";
  const status = Number(searchParams?.status?.trim());
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const registers = (await getFilterRegister(
    query,
    roomCode,
    branchName,
    year,
    status,
    date,
    currentPage,
    entries,
    user?.user.email as string,
  )) as REGISTER[];
  const count = await getCountRegister(
    query,
    roomCode,
    branchName,
    year,
    user?.user.email as string,
  );

  return (
    <div>
      <Breadcrumb
        pageName="Đăng ký ký túc xá"
        link={[{ name: "Đăng ký", link: "/home/register-dormitory" }]}
      />
      <RegistersTable registers={registers} count={Number(count)} role="user" />
    </div>
  );
};

export default RegisterPage;
