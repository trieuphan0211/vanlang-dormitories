"use client";
import { ROOM } from "@/types";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormSelect, Input } from "../Input";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { createInvoice } from "@/actions/invoice";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";

export const CreateNewInvoice = ({
  room,
  type,
}: {
  room: ROOM[];
  type?: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      invoiceDate: "",
      detail: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
    startTransition(() => {
      createInvoice(data).then((res) => {
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Hóa đơn đã được lập và gửi mail cho sinh viên!",
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
          Hóa đơn tháng
        </label>
        <FormSelect
          register={register("invoiceDate")}
          isPending={isPending}
          month={[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ]}
          errors={errors?.invoiceDate}
          placeholder={"Chọn chi nhánh"}
          disabled={type === "detail" ? true : null || isPending}
        />
      </div>
      {/* {room.map((room, keys) => (
        <div key={keys}>
          <div className="my-10 w-full border-t-2"></div>
          <h4>
            Phòng: {room.code} - {room?.roomType?.name} - {room.branch.name}
          </h4>
          {room?.Services &&
            room?.Services.map(
              (service, key) =>
                service.service.allow && (
                  <div className="my-5.5" key={key}>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="branchName"
                    >
                      {service.service.name}
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Nhập số lượng"
                        isPending={isPending}
                        register={register(
                          `detail.${room.id}.${service.service.id}`,
                        )}
                        disabled={type === "detail" ? true : null || isPending}
                      />
                      {service.service.unit}
                    </div>
                  </div>
                ),
            )}
        </div>
      ))} */}
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
          Lập và Gửi email
        </button>
      </div>
    </form>
  );
};
