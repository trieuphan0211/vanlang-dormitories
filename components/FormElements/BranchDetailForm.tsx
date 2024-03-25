"use client";

import { updateBranchById } from "@/actions/branch";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { BranchSchema } from "@/schema";
import { BRANCH } from "@/types/branch";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const BranchDetailForm = ({
  branch,
  type,
}: {
  branch: BRANCH;
  type?: string;
}) => {
  let image;
  if (branch?.img) {
    image = JSON.parse(branch?.img as string);
  }
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof BranchSchema>>({
    resolver: zodResolver(BranchSchema),
    defaultValues: {
      name: branch?.name || "",
      address: branch?.address || "",
      numberFloors: String(branch?.floorNumber) || "",
      description: branch?.description || "",
      image: {
        name: image?.name || "",
        type: image?.type || "",
        value: image?.value || "",
      },
    },
  });
  const onSubmit = (value: z.infer<typeof BranchSchema>) => {
    console.log(value);
    startTransition(() => {
      updateBranchById(branch.id, value).then((res) => {
        console.log(res);
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Chi nhánh đã được cập nhật thành công!",
              },
            }),
          );
        }
        if (res?.error) {
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "error",
                content: "Cập nhật chi nhánh thất bại!",
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
            htmlFor="branchName"
          >
            Tên chi nhánh
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            {...register("name")}
            placeholder="Nhập tên chi nhánh"
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>

      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="emailAddress"
        >
          Địa chỉ
        </label>
        <div className="relative">
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="emailAddress"
            placeholder="Nhập địa chỉ chi nhánh"
            {...register("address")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>

      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="numberFloors"
        >
          Số tầng
        </label>
        <input
          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type="number"
          id="numberFloors"
          {...register("numberFloors")}
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
        <div className="relative">
          <textarea
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            id="description"
            placeholder="Nhập mô tả chi nhánh ..."
            {...register("description")}
            rows={6}
            disabled={type === "detail" ? true : null || isPending}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/branch");
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
