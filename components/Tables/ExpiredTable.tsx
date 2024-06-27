"use client";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchTable } from "@/components/Search/SearchTable";
import { STUDENT } from "@/types";
import { useState, useTransition } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { CheckInvoice } from "../Dialog/CheckInvoice";

export const ExpiredTable = ({
  students,
  count,
}: {
  students: STUDENT[];
  count: number;
}) => {
  // hook to handle pedding when calling server
  const [isPending, startTransition] = useTransition();
  // state open remove dialog
  const [openCheck, setOpenCheck] = useState<Boolean>(false);
  // state to get serviceId when showing action menu
  const [studentId, setStudentId] = useState<string>("");

  console.log(students);
  return (
    <div className=" rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex w-full gap-3 sm:flex-col">
        <SearchTable placeholder="Tìm tiếm tên sinh viên ..." type="student" />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                #
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Họ và tên
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Phòng - Chi nhánh
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Thời gian hết hạn
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{key + 1}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{student.email}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {student.fullName}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {student.Room
                      ? student.Room?.code + " - " + student?.Room?.Branch?.name
                      : "Chưa có phòng"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {student?.expiredRoom &&
                      new Date(
                        (new Date() as any) -
                          (new Date(student?.expiredRoom) as any),
                      ).getDate() - 1}{" "}
                    ngày
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div>
                    <button
                      onClick={() => {
                        setOpenCheck(true);
                        setStudentId(student.id);
                      }}
                      className="flex items-center gap-3 rounded-xl p-3 text-yellow-600 shadow-14 focus:outline-none"
                    >
                      <IoLogOutOutline className="text-xl text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {students.length > 0 && <Pagination count={count} />}
      {/* {openRemove && (
        <RemoveItemDialog
          isPending={isPending}
          startTransition={startTransition}
          studentId={studentId}
          setState={setOpenRemove}
          title={"Bạn có chắc chắn muốn xóa thông tin sinh viên này không?"}
        />
      )} */}
      {openCheck && (
        <CheckInvoice
          title={"Bạn có chắc chắn muốn xóa sinh viên khỏi phòng không ?"}
          startTransition={startTransition}
          isPending={isPending}
          studentId={studentId}
          type="removeRoom"
          setState={setOpenCheck}
        />
      )}
    </div>
  );
};
