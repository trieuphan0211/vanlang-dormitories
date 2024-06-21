import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AddNewRegister } from "@/components/Form/AddNewRegister";
import { getAllBranchs } from "@/data/branch";
import { getRoomTypesAll } from "@/data/room-type";
import { getStudentByEmail, getStudentById } from "@/data/student";
import { currentUser } from "@/lib/auth";
import { BRANCH, ROOMTYPE, STUDENT } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo đăng ký ký túc xá",
  description: "",
};

const CreatePage = async () => {
  const branchs = (await getAllBranchs()) as BRANCH[];
  const roomTypes = (await getRoomTypesAll()) as ROOMTYPE[];
  const user = await currentUser();
  const student = (await getStudentByEmail(user?.email as string)) as STUDENT;

  return (
    <div>
      <Breadcrumb pageName="Tạo đăng ký ký túc xá" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          {student?.Violate?.filter(
            (v) =>
              v.status === "FINISHED" &&
              v.formProcessing === "DORMITORYEXPULSION" &&
              v.createDate.getFullYear() === new Date().getFullYear(),
          )?.length || 0 > 0 ? (
            <div>
              <h1 className="text-center text-4xl font-bold italic leading-snug text-red">
                Bạn không đủ điều kiện ở lại ký túc xá trong năm nay và sẽ không
                thể đăng ký trở lại cho đến năm sau.
              </h1>
            </div>
          ) : (
            <AddNewRegister branchs={branchs} roomTypes={roomTypes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
