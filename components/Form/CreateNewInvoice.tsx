"use client";
import { useAppDispatch } from "@/hooks/redux";
import { InvoceSchema } from "@/schema";
import { ROOM } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormSelect, Input } from "../Input";
import { createInvoice } from "@/actions/invoice";
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
    control,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof InvoceSchema>>({
    resolver: zodResolver(InvoceSchema),
    defaultValues: {
      invoiceMonth: "1",
      invoiceYear: new Date().getFullYear().toString(),
      detail: [],
    },
  });
  // Set default value for form
  useEffect(() => {
    room.map((room, roomKey) => {
      setValue(`detail.${roomKey}.roomId`, room.id);
      room?.Services?.map((service, serviceKey) => {
        service.service.allow
          ? setValue(
              `detail.${roomKey}.service.${serviceKey}.serviceId`,
              service.service.id,
            )
          : console.log("service not allow");
      });
    });
  }, [room, setValue]);

  const onSubmit = (data: z.infer<typeof InvoceSchema>) => {
    startTransition(() => {
      createInvoice(data).then((res) => {
        if (res?.success) {
          router.push("/admin/invoice");
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
      <div className="flex w-full gap-5">
        <div className="mb-5.5 w-full">
          <label
            className="mb-3 block text-base font-semibold text-black dark:text-white"
            htmlFor="emailAddress"
          >
            Tháng
          </label>
          <FormSelect
            isPending={isPending}
            name="invoiceMonth"
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
            size="small"
            control={control}
            errors={errors?.invoiceMonth}
            placeholder={"Chọn chi nhánh"}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
        <div className="mb-5.5 w-full">
          <label
            className="mb-3 block text-base font-semibold text-black dark:text-white"
            htmlFor="emailAddress"
          >
            Năm
          </label>

          <Input
            type="text"
            register={register("invoiceYear")}
            isPending={isPending}
            size="small"
            placeholder={"Nhập năm"}
            errors={errors?.invoiceYear}
            disabled={true}
          />
        </div>
      </div>
      {room.map((room, roomKey) => (
        <div key={roomKey} className="mb-2 rounded-2xl border p-5">
          <h4 className="mb-5 text-center font-semibold">
            Phòng: {room.code} - {room?.roomType?.name} - {room.branch.name}
          </h4>
          <div className="grid grid-cols-2 gap-5">
            {room?.Services &&
              room?.Services.map(
                (service, serviceKey) =>
                  service.service.allow && (
                    <div className="mb-2" key={serviceKey}>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="branchName"
                      >
                        {service.service.name}
                      </label>
                      <div className="flex items-center gap-1">
                        <div className="w-full">
                          <Input
                            type="number"
                            placeholder="Nhập số lượng"
                            isPending={isPending}
                            size="small"
                            register={register(
                              `detail.${roomKey}.service.${serviceKey}.quantity` as "detail",
                            )}
                            errors={
                              errors?.detail?.[roomKey]?.service?.[serviceKey]
                                ?.quantity
                            }
                            disabled={
                              type === "detail" ? true : null || isPending
                            }
                          />
                        </div>
                        {service.service.unit}
                      </div>
                    </div>
                  ),
              )}
          </div>
        </div>
      ))}
      <div className="flex justify-end gap-4.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/invoice");
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
