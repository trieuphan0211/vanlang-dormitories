"use client";

import { updateMaintenanceById } from "@/actions/mantainance";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { MaintenanceSchema } from "@/schema";
import { BRANCH, MAINTENNANCES, ROOM } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormSelect, Input } from "../Input";
import { Branch } from "../Search";
import { getRoomByBranchIdAndRoomTypeCode } from "@/actions/room";
import { getBranchsAll } from "@/actions/branch";

export const MaintenanceDetailForm = ({
  maintenance,
  type,
}: {
  maintenance: MAINTENNANCES;
  type?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Branch
  const [branchs, setBranchs] = useState<BRANCH[]>();
  // Rooms
  const [rooms, setRooms] = useState<ROOM[]>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<z.infer<typeof MaintenanceSchema>>({
    resolver: zodResolver(MaintenanceSchema),
    defaultValues: {
      mantainanceName: maintenance.mantainanceName || "",
      status: maintenance.status || "CREATED",
      code: maintenance.code || "",
      reason: maintenance.reason || "",
      branchId: maintenance.branchId || "",
      floor: maintenance.Room?.floor || 1,
      roomId: maintenance.roomId || "",
      listFacilities: maintenance?.Facilities?.map((item) => item.id) || [],
    },
  });
  const { branchId, floor } = watch();
  const onSubmit = (value: z.infer<typeof MaintenanceSchema>) => {
    console.log(value);

    startTransition(() => {
      updateMaintenanceById(maintenance.id, value).then((res) => {
        console.log(res);
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Cơ sở vật chất đã được cập nhật thành công!",
              },
            }),
          );
        }
        if (res?.error) {
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "error",
                content: "Có lỗi xảy ra, vui lòng thử lại!",
              },
            }),
          );
        }
        router.refresh();
      });
    });
  };
  const getCommon = async () => {
    const branch = (await getBranchsAll()) as BRANCH[];
    setBranchs(branch);
  };
  // get Room
  const getRooms = async () => {
    const room = (await getRoomByBranchIdAndRoomTypeCode(
      branchId,
      undefined,
      floor,
    )) as ROOM[];
    setRooms(room);
  };
  // get Branch
  useEffect(() => {
    getCommon();
  }, []);
  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchId, floor]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5.5 flex gap-4 ">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Tên đơn bảo trì
          </label>
          <Input
            type="text"
            placeholder="Nhập tên sơ sở vật chất"
            errors={errors.mantainanceName}
            isPending={isPending}
            register={register("mantainanceName")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
        <div className="w-full">
          <label
            className={clsx(
              "mb-3 block text-sm font-medium text-black dark:text-white",
              {
                "text-red": errors.code,
              },
            )}
          >
            Mã đơn bảo trì
          </label>
          <Input
            type="text"
            placeholder="Nhập mã phòng"
            errors={errors.code}
            isPending={isPending}
            register={register("code")}
            disabled={true}
          />
        </div>
      </div>

      <div className="mb-5.5 flex gap-4">
        <div className="w-full">
          <label
            className={clsx(
              "mb-3 block text-sm font-medium text-black dark:text-white",
              {
                "text-red": errors.status,
              },
            )}
          >
            Trạng thái
          </label>
          <FormSelect
            name="status"
            control={control}
            isPending={isPending}
            facilifiesStatus={["CREATED", "INPROGRESS", "FINISHED"]}
            errors={errors?.status}
            placeholder={"Chọn chi nhánh"}
            defaultValue={maintenance.status}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>
      <div>
        <label
          className={clsx(
            "mb-3 block text-sm font-medium text-black dark:text-white",
            {
              "text-red": errors.mantainanceName,
            },
          )}
        >
          Chi nhánh
        </label>
        <FormSelect
          name="branchId"
          control={control}
          isPending={isPending}
          branchs={branchs}
          errors={errors?.branchId}
          placeholder={"Chọn chi nhánh"}
        />
      </div>
      <div>
        <label
          className={clsx(
            "mb-3 block text-sm font-medium text-black dark:text-white",
            {
              "text-red": errors.floor,
            },
          )}
        >
          Tầng
        </label>
        <FormSelect
          name="floor"
          control={control}
          isPending={isPending}
          number={
            branchs?.filter((item) => item.id === branchId)[0]?.floorNumber || 1
          }
          errors={errors?.floor}
          placeholder={"Chọn tầng"}
        />
      </div>
      <div>
        <label
          className={clsx(
            "mb-3 block text-sm font-medium text-black dark:text-white",
            {
              "text-red": errors.roomId,
            },
          )}
        >
          Phòng
        </label>
        <FormSelect
          name="roomId"
          control={control}
          isPending={isPending}
          rooms={rooms}
          errors={errors?.roomId}
          placeholder={"Chọn tầng"}
        />
      </div>
      <div>
        <label
          className={clsx(
            "mb-3 block text-sm font-medium text-black dark:text-white",
            // {
            //   "text-red": errors.startDate,
            // },
          )}
        >
          Cơ sở vật chất
        </label>
        {maintenance?.Facilities !== undefined && (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  #
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Tên cơ sở vật chất
                </th>

                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Mã cơ sở vật chất
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white"></th>
              </tr>
            </thead>
            <tbody>
              {maintenance.Facilities.map((facilitie, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{key + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {facilitie.name}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {facilitie.code}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {/* <button
                      className="rounded-xl p-2 text-rose-600 shadow-14 hover:bg-gray-3 focus:outline-none"
                      disabled={isPending}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="description"
        >
          Mô tả
        </label>
        <Input
          type="text"
          placeholder="Nhập lý do bảo trì ..."
          errors={errors.reason}
          isPending={isPending}
          register={register("reason")}
          multiline={true}
          rows={3}
          disabled={type === "detail" ? true : null || isPending}
        />
      </div>

      <div className="flex justify-end gap-4.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/maintenance");
          }}
          className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          type="submit"
          disabled={isPending}
        >
          Quay lại
        </button>
        <button
          className={clsx(
            "flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90",
            {
              hidden: type === "detail",
            },
          )}
          type="submit"
          disabled={isPending}
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
};
