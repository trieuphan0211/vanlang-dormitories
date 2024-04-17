"use client";

import { updateFacilitiesTypeById } from "@/actions/facilitiesType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { FacilitiesTypeSchema } from "@/schema";
import { FACILITIESTYPE } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../Input";

export const FacilitiesTypeDetailForm = ({
  facilitiesType,
  type,
}: {
  facilitiesType: FACILITIESTYPE;
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
  } = useForm<z.infer<typeof FacilitiesTypeSchema>>({
    resolver: zodResolver(FacilitiesTypeSchema),
    defaultValues: {
      facilitesTypeName: facilitiesType.name || "",
      description: facilitiesType.description || "",
      code: facilitiesType.code || "",
    },
  });
  const onSubmit = (value: z.infer<typeof FacilitiesTypeSchema>) => {
    startTransition(() => {
      updateFacilitiesTypeById(facilitiesType.id, value).then((res) => {
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Loại cơ sở vật chất đã được cập nhật thành công!",
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
            Tên loại cơ sở vật chất
          </label>
          <Input
            type="text"
            placeholder="Nhập tên loại cơ sở vật chất"
            errors={errors.facilitesTypeName}
            isPending={isPending}
            register={register("facilitesTypeName")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>

      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="emailAddress"
        >
          Mã loại cơ sở vật chất
        </label>
        <Input
          type="text"
          placeholder="Nhập mã loại cơ sở vật chất"
          errors={errors.code}
          isPending={isPending}
          register={register("code")}
          disabled={true}
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
          placeholder="Nhập mô tả chi nhánh ..."
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
            router.push("/admin/facilities-type");
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
