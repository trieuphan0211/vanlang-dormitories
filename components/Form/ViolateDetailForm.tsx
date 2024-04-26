"use client";

import { updateRoomTypeById } from "@/actions/roomType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { ViolateSchema } from "@/schema";
import { ROOMTYPE, STUDENT, VIOLATE } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormSelect, Input } from "../Input";
import { updateViolateById } from "@/actions/violate";

export const ViolateDetailForm = ({
  violate,
  students,
  type,
}: {
  violate: VIOLATE;
  students: STUDENT[];
  type?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof ViolateSchema>>({
    resolver: zodResolver(ViolateSchema),
    defaultValues: {
      violateName: violate.name || "",
      description: violate.description || "",
      studentId: violate.studentId || "",
    },
  });
  const onSubmit = (value: z.infer<typeof ViolateSchema>) => {
    console.log(value);
    startTransition(() => {
      updateViolateById(violate.id, value).then((res) => {
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
          Tên vi phạm
        </label>
        <Input
          type="text"
          placeholder="Nhập tên vi phạm"
          errors={errors.violateName}
          isPending={isPending}
          register={register("violateName")}
        />
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            htmlFor="roomTypeName"
            className={clsx(
              `mb-3 block text-sm font-medium text-black dark:text-white`,
              {
                "text-red": errors.studentId,
              },
            )}
          >
            Thành viên vi phạm
          </label>
          <FormSelect
            name="studentId"
            control={control}
            isPending={isPending}
            students={students}
            errors={errors?.studentId}
            placeholder={"Chọn chi nhánh"}
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
            router.push("/admin/violate");
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
