"use client";

import { updateRoomTypeById } from "@/actions/roomType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { RoomTypeSchema } from "@/schema";
import { ROOMTYPE } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../Input";

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
  } = useForm<z.infer<typeof RoomTypeSchema>>({
    resolver: zodResolver(RoomTypeSchema),
    defaultValues: {
      roomTypeName: roomType.name || "",
      members: String(roomType.members) || "",
      description: roomType.description || "",
      code: roomType.code || "",
      cost: String(roomType.cost) || "",
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
      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="emailAddress"
        >
          Mã loại phòng
        </label>
        <Input
          type="text"
          placeholder="Nhập giá tiền"
          errors={errors.code}
          isPending={isPending}
          register={register("code")}
          disabled={true}
        />
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            htmlFor="roomTypeName"
            className={clsx(
              `mb-3 block text-sm font-medium text-black dark:text-white`,
              {
                "text-red": errors.roomTypeName,
              },
            )}
          >
            Tên loại phòng
          </label>
          <Input
            type="text"
            placeholder="Nhập tên loại phòng"
            errors={errors.roomTypeName}
            isPending={isPending}
            register={register("roomTypeName")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>

      <div className="mb-5.5">
        <label
          className={clsx(
            `mb-3 block text-sm font-medium text-black dark:text-white`,
            {
              "text-red": errors.cost,
            },
          )}
          htmlFor="emailAddress"
        >
          Số thành viên
        </label>
        <Input
          type="number"
          placeholder="Nhập giá tiền"
          errors={errors.members}
          isPending={isPending}
          register={register("members")}
          disabled={type === "detail" ? true : null || isPending}
        />
      </div>
      <div className="mb-5.5">
        <label
          className={clsx(
            `mb-3 block text-sm font-medium text-black dark:text-white`,
            {
              "text-red": errors.cost,
            },
          )}
          htmlFor="emailAddress"
        >
          Giá
        </label>
        <Input
          type="number"
          placeholder="Nhập giá tiền"
          errors={errors.cost}
          isPending={isPending}
          register={register("cost")}
          disabled={type === "detail" ? true : null || isPending}
        />
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
          placeholder="Nhập mô tả loại phòng ..."
          isPending={isPending}
          register={register("description")}
          errors={errors.description}
          multiline={true}
          rows={6}
          disabled={type === "detail" ? true : null || isPending}
        />
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
