"use client";

import { updateRoomTypeById } from "@/actions/roomType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { RoomTypeSchema } from "@/schema";
import { ROOMTYPE } from "@/types/room-type";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const RoomTypeDetailForm = ({
  roomType,
  type,
}: {
  roomType: ROOMTYPE;
  type?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof RoomTypeSchema>>({
    resolver: zodResolver(RoomTypeSchema),
    defaultValues: {
      roomTypeName: roomType.name || "",
      members: String(roomType.members) || "",
      description: roomType.description || "",
      code: roomType.code || "",
    },
  });
  const onSubmit = (value: z.infer<typeof RoomTypeSchema>) => {
    console.log(value);
    startTransition(() => {
      updateRoomTypeById(roomType.id, value).then((res) => {
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Loại phòng đã được cập nhật thành công!",
              },
            }),
          );
        }
        if (res?.error) {
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "error",
                content: "Đã xảy ra lỗi! Vui lòng thử lại sau!",
              },
            }),
          );
        }
      });
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="roomTypeName"
          >
            Tên loại phòng
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="roomTypeName"
            placeholder="Nhập tên loại phòng"
            {...register("roomTypeName")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>

      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="emailAddress"
        >
          Số thành viên
        </label>
        <div className="relative">
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="number"
            id="emailAddress"
            placeholder="Nhập số thành viên"
            {...register("members")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>
      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="emailAddress"
        >
          Mã loại phòng
        </label>
        <div className="relative">
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="emailAddress"
            placeholder="Nhập mã loại phòng"
            {...register("code")}
            disabled={true}
          />
        </div>
      </div>

      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="description"
        >
          Mô tả
        </label>
        <div className="relative">
          <textarea
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            id="description"
            {...register("description")}
            placeholder="Nhập mô tả loại phòng ..."
            disabled={type === "detail" ? true : null || isPending}
            rows={6}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/room-type");
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
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
};
