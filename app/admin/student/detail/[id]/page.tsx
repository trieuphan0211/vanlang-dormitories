import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StudentDetailForm } from "@/components/FormElements/StudentDetailForm";
import { getStudentById } from "@/data/student";
import { getUserByEmail } from "@/data/users";
import { STUDENT } from "@/types/student";
import { USER } from "@/types/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết sinh viên",
  description: "",
};
export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const student = (await getStudentById(params.id)) as STUDENT;
  const user = (await getUserByEmail(student.email)) as USER;
  return (
    <div>
      <Breadcrumb pageName={`Chi tiết sinh viên`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Student Name: {student?.fullName}
          </h3>
        </div>
        <div className="p-7">
          {student && <StudentDetailForm student={student} user={user} />}
        </div>
      </div>
    </div>
  );
}
