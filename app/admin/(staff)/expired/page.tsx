import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ExpiredTable } from "@/components/Tables/ExpiredTable";
import { FacilitiesTable } from "@/components/Tables/FacilitiesTable";
import { getStudentExpired } from "@/data/student";
import { STUDENT } from "@/types";
import React from "react";

const ExpiredPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const student = (await getStudentExpired()) as STUDENT[];
  
  return (
    <div>
      <Breadcrumb
        pageName="Danh sách sinh viên viên hết hạn"
        link={[{ name: "Danh sách hết hạn", link: "/admin/expired" }]}
      />
      <ExpiredTable students={student} count={0} />
    </div>
  );
};

export default ExpiredPage;
