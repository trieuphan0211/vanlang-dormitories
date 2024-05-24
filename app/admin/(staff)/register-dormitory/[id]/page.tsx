import { getBranchsAll } from "@/actions/branch";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RegisterDetailForm } from "@/components/Form/RegisterDetailForm";
import { getRegisterById } from "@/data/register";
import { getRoomsByFields } from "@/data/room";
import { getRoomTypesAll } from "@/data/room-type";
import { getUserByEmail } from "@/data/users";
import { BRANCH, REGISTER, ROOM, ROOMTYPE, USER } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xét duyệt đơn đăng ký",
  description: "",
};

export default async function DetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    roomTypesCode?: string;
    branchId?: string;
  };
}) {
  const register = (await getRegisterById(params.id)) as REGISTER;
  const user = (await getUserByEmail(register.student.email)) as USER;
  const branchs = (await getBranchsAll()) as BRANCH[];
  const roomTypes = (await getRoomTypesAll()) as ROOMTYPE[];
  const rooms = (await getRoomsByFields(
    searchParams?.roomTypesCode,
    searchParams?.branchId,
  )) as ROOM[];
  console.log("rooms", rooms);
  return (
    <div>
      <Breadcrumb pageName={`Xét duyệt đơn đăng ký`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Sinh viên: {register?.student?.fullName}
          </h3>
        </div>
        <div className="p-7">
          {register && (
            <RegisterDetailForm
              registers={register}
              user={user}
              branchs={branchs}
              roomTypes={roomTypes}
              rooms={rooms.filter(
                (room) =>
                  room.Student?.length || 0 < (room.roomType?.members ?? 0),
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
