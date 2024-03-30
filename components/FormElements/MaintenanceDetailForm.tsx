"use client";

import { updateMaintenanceById } from "@/actions/mantainance";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { MaintenanceSchema } from "@/schema";
import { MAINTENNANCES } from "@/types/maintenances";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusMaintenance } from "@prisma/client";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import * as z from "zod";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof MaintenanceSchema>>({
    resolver: zodResolver(MaintenanceSchema),
    defaultValues: {
      mantainanceName: maintenance.mantainanceName || "",
      status: maintenance.status || "CREATED",
      code: maintenance.code || "",
      startDate: maintenance.startDate || new Date(),
      description: maintenance.description || "",
    },
  });
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
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            placeholder="Nhập tên sơ sở vật chất"
            {...register("mantainanceName")}
            disabled={type === "detail" ? true : null || isPending}
          />
          <p
            className={clsx(
              `font-smblock mt-1 text-sm text-black dark:text-white`,
              {
                "text-red": errors.mantainanceName,
              },
            )}
          >
            {errors.mantainanceName?.message}
          </p>
        </div>
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
          <Select.Root
            disabled={type === "detail" ? true : null || isPending}
            defaultValue={maintenance.status}
            onValueChange={(e) => setValue("status", e as StatusMaintenance)}
          >
            <Select.Trigger
              className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              aria-label="branchId"
            >
              <Select.Value placeholder="Choise status" />
              <Select.Icon className="text-black">
                <IoChevronDownCircleOutline />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="z-10 w-full overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                <Select.ScrollUpButton className="flex  cursor-default items-center justify-center bg-white text-black">
                  <IoChevronUpCircleOutline />
                </Select.ScrollUpButton>
                <Select.Viewport className=" p-[5px]">
                  <Select.Group className="z-10">
                    <Select.Item
                      value={StatusMaintenance.CREATED}
                      className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                    >
                      <Select.ItemText>Đã tạo</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value={StatusMaintenance.INPROGRESS}
                      className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                    >
                      <Select.ItemText>Đang xử lý</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value={StatusMaintenance.FINISHED}
                      className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                    >
                      <Select.ItemText>Đã hoàn thành</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <p
            className={clsx(
              `font-smblock mt-1 text-sm text-black dark:text-white`,
              {
                "text-red": errors.status,
              },
            )}
          >
            {errors.status?.message}
          </p>
        </div>
      </div>

      <div className="mb-5.5 flex gap-4">
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
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="code"
            placeholder="Nhập mã đơn bảo trì"
            {...register("code")}
            disabled
          />
          <p
            className={clsx(
              `font-smblock mt-1 text-sm text-black dark:text-white`,
              {
                "text-red": errors.code,
              },
            )}
          >
            {errors.code?.message}
          </p>
        </div>
        <div className="w-full">
          <label
            className={clsx(
              "mb-3 block text-sm font-medium text-black dark:text-white",
              {
                "text-red": errors.startDate,
              },
            )}
          >
            Ngày bắt đầu
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            placeholder="Nhập tên sơ sở vật chất"
            value={new Date(maintenance.startDate).toLocaleDateString()}
            disabled={true}
          />
          <p
            className={clsx(
              `font-smblock mt-1 text-sm text-black dark:text-white`,
              {
                "text-red": errors.startDate,
              },
            )}
          >
            {errors.startDate?.message}
          </p>
        </div>
      </div>
      <div>
        <label
          className={clsx(
            "mb-3 block text-sm font-medium text-black dark:text-white",
            {
              "text-red": errors.startDate,
            },
          )}
        >
          Cơ sở vật chất
        </label>
        {maintenance?.facilities !== undefined && (
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
              {maintenance.facilities.map((facilitie, key) => (
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
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"></td>
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
        <div className="relative">
          <textarea
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            id="description"
            placeholder="Nhập mô tả đơn bảo trì ..."
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
