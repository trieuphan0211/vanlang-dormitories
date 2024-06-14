"use client";

import { updateFacilityById } from "@/actions/facilities";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { FacilitiesSchema } from "@/schema";
import { BRANCH, FACILITIES } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormSelect, Input } from "../Input";

export const FacilityDetailForm = ({
  facilities,
  type,
  branchs,
}: {
  facilities: FACILITIES;
  type?: string;
  branchs: BRANCH[];
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof FacilitiesSchema>>({
    resolver: zodResolver(FacilitiesSchema),
    defaultValues: {
      name: facilities?.name || "",
      description: facilities?.description || "",
      branchId: facilities?.branchId || "",
      facilitiesTypeCode: facilities?.facilitiesTypeCode || "",
      status: facilities?.status,
      code: facilities?.code,
    },
  });
  console.log({
    name: facilities?.name || "",
    description: facilities?.description || "",
    branchId: facilities?.branchId || "",
    facilitiesTypeCode: facilities?.facilitiesTypeCode || "",
    status: facilities?.status,
  });
  const onSubmit = (value: z.infer<typeof FacilitiesSchema>) => {
    console.log(value);

    startTransition(() => {
      updateFacilityById(facilities.id, value).then((res) => {
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5.5 flex gap-4 ">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Tên sơ sở vật chất
          </label>
          <Input
            type="text"
            placeholder="Nhập tên sơ sở vật chất"
            errors={errors.name}
            isPending={isPending}
            register={register("name")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
        <div className="w-full">
          <label
            className={clsx(
              "mb-3 block text-sm font-medium text-black dark:text-white",
              {
                "text-red": errors.branchId,
              },
            )}
          >
            Trạng thái
          </label>
          <FormSelect
            name="status"
            control={control}
            isPending={isPending}
            facilifiesStatus={[
              "ACTIVE",
              "INACTIVE",
              "MAINTENANCE",
              "LIQUIDATION",
            ]}
            errors={errors?.status}
            placeholder={"Chọn chi nhánh"}
            defaultValue={facilities.status}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>

      <div className="mb-5.5 flex gap-4">
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
            defaultValue={facilities.branchId}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
        <div className="w-full">
          <label
            className={clsx(
              "mb-3 block text-sm font-medium text-black dark:text-white",
              {
                "text-red": errors.facilitiesTypeCode,
              },
            )}
          >
            Loại cơ sở vật chất
          </label>
          <Input
            type="text"
            placeholder="Nhập mã phòng"
            errors={errors.code}
            isPending={isPending}
            value={
              facilities.FacilitiesType?.code +
              " - " +
              facilities.FacilitiesType?.name
            }
            register={register("facilitiesTypeCode")}
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
          <Input
            type="text"
            placeholder="Nhập mô tả cơ sở vật chất ..."
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
            router.push("/admin/facilities");
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
