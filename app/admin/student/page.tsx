import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StudentTable } from "@/components/Tables/StudentTable";
import { getCountStudents, getFilterStudents } from "@/data/student";
import { STUDENT } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý sinh viên",
  description: "",
};

const StudentPage = async ({
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
  const students = (await getFilterStudents(
    query,
    currentPage,
    entries,
  )) as STUDENT[];
  const count = await getCountStudents(query);
  return (
    <div>
      <Breadcrumb pageName="Quản lý sinh viên" />
      <StudentTable students={students} count={Number(count)} />
    </div>
  );
};

export default StudentPage;
