import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InOutTable } from "@/components/Tables/InOutTable";
import { getCountInOut, getFilterInOut } from "@/data/in-out";
import { getStudentByEmail } from "@/data/student";
import { currentUser } from "@/lib/auth";
import { INOUT } from "@/types";
import { StatusInOut, Student } from "@prisma/client";
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
  const user = await currentUser();
  const student = (await getStudentByEmail(user?.email as string)) as Student;
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
    student?.id as string,
  )) as INOUT[];
  const count = await getCountInOut(
    query,
    status,
    studentCode,
    student?.id as string,
  );
  return (
    <div>
      <Breadcrumb
        pageName="Danh sách ra/vào"
        link={[{ name: "Ra vào", link: "/admin/out-in/list" }]}
      />
      <InOutTable
        inOuts={inOuts}
        count={Number(count)}
        role="user"
        student={student}
      />
    </div>
  );
};

export default ListInOutPage;
