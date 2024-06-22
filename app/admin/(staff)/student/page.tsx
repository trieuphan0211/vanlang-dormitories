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
    studentCode?: string;
    email?: string;
    gender?: string;
    major?: string;
    schoolYear?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const studentCode = searchParams?.studentCode?.trim() || "";
  const email = searchParams?.email?.trim() || "";
  const gender = searchParams?.gender?.trim() || "";
  const major = searchParams?.major?.trim() || "";
  const schoolYear = Number(searchParams?.schoolYear?.trim()) || 0;
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;

  const students = (await getFilterStudents(
    query,
    studentCode,
    email,
    gender,
    major,
    schoolYear,
    currentPage,
    entries,
  )) as STUDENT[];
  const count = await getCountStudents(
    query,
    studentCode,
    email,
    gender,
    major,
    schoolYear,
  );
  return (
    <div>
      <Breadcrumb
        pageName="Quản lý sinh viên"
        link={[{ name: "Sinh viên", link: "/admin/student" }]}
      />
      <StudentTable students={students} count={Number(count)} />
    </div>
  );
};

export default StudentPage;
