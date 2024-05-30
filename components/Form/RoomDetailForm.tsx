"use client";

import { updateRoomById } from "@/actions/room";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { RoomSchema } from "@/schema";
import { BRANCH, ROOM, ROOMTYPE, SERVICES } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormSelect, FormSelectMultiple, Input } from "../Input";

export const RoomDetailForm = ({
  room,
  type,
  roomTypes,
  branchs,
  services,
}: {
  room: ROOM;
  type?: string;
  roomTypes: ROOMTYPE[];
  branchs: BRANCH[];
  services: SERVICES[];
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<z.infer<typeof RoomSchema>>({
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      branchId: room.branchId || "",
      description: room.description || "",
      roomTypeCode: room.roomTypeCode || "",
      floor: room.floor,
      code: room.code || "",
      services: room?.Services?.map((item) => item.serviceId) || [],
    },
  });
  const onSubmit = (value: z.infer<typeof RoomSchema>) => {
    startTransition(() => {
      console.log("value: ", value);
      updateRoomById(room.id, value).then((res) => {
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Phòng đã được cập nhật thành công!",
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5.5 flex flex-col gap-4 ">
        <div className="w-full">
          <label
            className={clsx(
              `mb-3 block text-sm font-medium text-black dark:text-white`,
              {
                "text-red": errors.code,
              },
            )}
          >
            Mã phòng
          </label>
          <Input
            type="text"
            placeholder="Nhập mã phòng"
            errors={errors.code}
            isPending={isPending}
            register={register("code")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.branchId,
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
              defaultValue={room.branchId}
              disabled={type === "detail" ? true : null || isPending}
            />
          </div>

          <div className="w-full">
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.roomTypeCode,
                },
              )}
            >
              Loại phòng
            </label>
            <FormSelect
              name="roomTypeCode"
              control={control}
              isPending={isPending}
              roomTypes={roomTypes}
              errors={errors?.roomTypeCode}
              placeholder={"Chọn chi nhánh"}
              defaultValue={room.roomTypeCode}
              disabled={type === "detail" ? true : null || isPending}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label
              className={clsx(
                `mb-3 block text-sm font-medium text-black dark:text-white`,
                {
                  "text-red": errors.floor,
                },
              )}
            >
              Tầng
            </label>
            <Input
              type="text"
              placeholder="Nhập số tầng"
              errors={errors.floor}
              isPending={isPending}
              register={register("floor")}
              disabled={type === "detail" ? true : null || isPending}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <label
          className={clsx(
            `mb-3 block text-sm font-medium text-black dark:text-white`,
            {
              "text-red": errors.services,
            },
          )}
        >
          Dịch vụ
        </label>
        <FormSelectMultiple
          register={register("services")}
          isPending={isPending}
          services={services}
          defaultValue={room?.Services?.map((item) => item.serviceId)}
          errors={errors?.services}
          disabled={type === "detail" ? true : null || isPending}
        />
      </div>
      {type === "detail" && (
        <div className="my-10 max-w-full overflow-x-auto">
          <label
            className={clsx(
              `mb-3 block text-sm font-medium text-black dark:text-white`,
              {
                "text-red": errors.services,
              },
            )}
          >
            Danh sách sinh viên
          </label>
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
                  Khoa
                </th>
              </tr>
            </thead>
            <tbody>
              {room.Student?.map((student, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{key + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {student.email}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {student.fullName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {student.major}
                    </p>
                  </td>
                </tr>
              ))}{" "}
            </tbody>
          </table>
        </div>
      )}
      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="description"
        >
          Mô tả
        </label>
        <div className="relative">
          <Input
            type="text"
            placeholder="Nhập mô tả phòng ..."
            errors={errors.description}
            isPending={isPending}
            register={register("description")}
            multiline={true}
            rows={6}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/room");
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
