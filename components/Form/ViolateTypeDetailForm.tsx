"use client";

import { updateServiceById } from "@/actions/service";
import { updateViolateType } from "@/actions/violateType";
import { Input } from "@/components/Input";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { ServiceSchema, ViolateTypeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@mui/material";
import { ViolateType } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const ViolateTypeDetailForm = ({
  violateType,
  type,
}: {
  violateType: ViolateType;
  type?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<z.infer<typeof ViolateTypeSchema>>({
    resolver: zodResolver(ViolateTypeSchema),
    defaultValues: {
      violateTypeName: violateType.name || "",
      description: violateType.description || "",
      point: String(violateType.point) || "",
      allow: violateType.allow || false,
    },
  });
  const { allow } = watch();

  const onSubmit = (value: z.infer<typeof ViolateTypeSchema>) => {
    startTransition(() => {
      updateViolateType(violateType.id, value).then((res) => {
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Vi phạm đã cập nhật thành công!",
              },
            }),
          );
        }
        if (res?.error) {
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "error",
                content: "Có lỗi xảy ra! Vui lòng thử lại sau!",
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
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="serviceName"
          >
            Tên loại vi phạm
          </label>
          <Input
            type="text"
            placeholder="Nhập tên dịch vụ"
            errors={errors.violateTypeName}
            isPending={isPending}
            register={register("violateTypeName")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>
      <div>
        <label
          className={clsx(
            "mb-3 block text-sm font-medium text-black dark:text-white",
            {
              "text-red": errors.point,
            },
          )}
        >
          Điểm vi phạm
        </label>
        <Input
          type="number"
          placeholder="Nhập điểm trừ khi sinh viên vi phạm"
          errors={errors.point}
          isPending={isPending}
          register={register("point")}
          disabled={type === "detail" ? true : null || isPending}
        />
      </div>
      <div className="mb-3 flex items-center gap-10">
        <label
          className={clsx(
            " block text-sm font-medium text-black dark:text-white",
            {
              "text-red": errors.allow,
            },
          )}
        >
          Cho phép lập hóa đơn
        </label>
        <Switch
          {...register("allow")}
          checked={allow}
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
            router.push("/admin/violate-type");
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
