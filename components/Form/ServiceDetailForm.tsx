"use client";

import { updateServiceById } from "@/actions/service";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { ServiceSchema } from "@/schema";
import { SERVICES } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/Input";
import { Switch } from "@mui/material";

export const ServiceDetailForm = ({
  service,
  type,
}: {
  service: SERVICES;
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
  } = useForm<z.infer<typeof ServiceSchema>>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      serviceName: service.name || "",
      description: service.description || "",
      cost: String(service.cost) || "",
      unit: service.unit || "",
      allow: service.allow || false,
    },
  });
  const { allow } = watch();
  console.log("allow: ", allow);
  useEffect(() => {
    if (!allow) {
      setValue("unit", "tháng");
    }
  }, [allow]);
  const onSubmit = (value: z.infer<typeof ServiceSchema>) => {
    console.log(value);
    startTransition(() => {
      updateServiceById(service.id, value).then((res) => {
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Dịch vụ đã được cập nhật thành công!",
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
            Tên dịch vụ
          </label>
          <Input
            type="text"
            placeholder="Nhập tên dịch vụ"
            errors={errors.serviceName}
            isPending={isPending}
            register={register("serviceName")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>
      <div className="mb-3 flex items-center gap-10">
        <label
          className={clsx(
            " block text-sm font-medium text-black dark:text-white",
            {
              "text-red": errors.serviceName,
            },
          )}
        >
          Cho phép nhập số lượng khi tạo hóa đơn
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
          htmlFor="emailAddress"
        >
          Chi phí
        </label>
        <div className="flex w-full items-center gap-3">
          <div className="w-full">
            <Input
              type="number"
              placeholder="Nhập chi phí"
              errors={errors.cost}
              isPending={isPending}
              register={register("cost")}
              disabled={type === "detail" ? true : null || isPending}
            />
          </div>
          <p className="mb-3 text-3xl">/</p>
          <div>
            <Input
              type="text"
              placeholder="Nhập đơn vị"
              errors={errors.unit}
              isPending={isPending}
              register={register("unit")}
              disabled={type === "detail" ? true : null || isPending || !allow}
            />
          </div>
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
            router.push("/admin/service");
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
