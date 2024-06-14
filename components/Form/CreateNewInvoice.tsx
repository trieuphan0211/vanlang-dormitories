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
    watch,
  } = useForm<z.infer<typeof InvoceSchema>>({
    resolver: zodResolver(InvoceSchema),
    defaultValues: {
      invoiceMonth: "1",
      invoiceYear: new Date().getFullYear().toString(),
      detail: [],
    },
  });
  const { detail } = watch();
  console.log(detail);
  // Set default value for form
  useEffect(() => {
    room.map((room, roomKey) => {
      setValue(`detail.${roomKey}.roomId`, room.id);
      room?.Services?.filter((e) => e.Service.allow === true).map(
        (service, serviceKey) => {
          setValue(
            `detail.${roomKey}.service.${serviceKey}.serviceId`,
            service.Service.id,
          );
        },
      );
    });
  }, [room, setValue]);

  const onSubmit = (data: z.infer<typeof InvoceSchema>) => {
    startTransition(() => {
      createInvoice(data).then((res) => {
        if (res?.success) {
          router.push("/admin/invoice");
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex w-full gap-5 rounded-xl bg-white px-7 py-4 shadow-lg">
        <div className="w-full">
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
        <div className="w-full">
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
        <div
          key={roomKey}
          className="rounded-xl bg-white p-11 text-black shadow-lg"
        >
          <div className="flex justify-between ">
            <h4 className="">
              <strong>Phòng:</strong> {room.code} - {room?.RoomType?.name} -{" "}
              {room?.Branch?.name}
            </h4>
            <h4 className="">
              <strong>Số lượng hóa đơn:</strong> {room.Student?.length}
            </h4>
          </div>
          <hr className="my-5 text-slate-300"></hr>
          <div className="">
            <h4 className="">
              <strong>Gửi đến:</strong>{" "}
              {room.Student?.map((student) => student.email).join("; ")}
            </h4>
          </div>
          <hr className="my-5 text-slate-300"></hr>
          <div>
            {room?.Services && (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Tên dịch vụ
                    </th>

                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Số lượng
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Giá
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {room?.Services.map((service, serviceKey) => {
                    const quantity =
                      detail[roomKey]?.service[serviceKey]?.quantity ||
                      (0 as any);
                    return (
                      <tr key={serviceKey}>
                        <td className=" px-4 py-2 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {service.Service.name}
                          </p>
                        </td>

                        <td className=" px-4 py-2 dark:border-strokedark">
                          {service.Service.allow === true ? (
                            <div className="flex w-full items-center gap-1">
                              <div className="">
                                <Input
                                  type="number"
                                  placeholder="Nhập số lượng"
                                  isPending={isPending}
                                  size="small"
                                  register={register(
                                    `detail.${roomKey}.service.${serviceKey}.quantity` as "detail",
                                  )}
                                  errors={
                                    errors?.detail?.[roomKey]?.service?.[
                                      serviceKey
                                    ]?.quantity
                                  }
                                  disabled={
                                    type === "detail" ? true : null || isPending
                                  }
                                />
                              </div>
                              {service.Service.unit}
                            </div>
                          ) : (
                            <p className="text-black dark:text-white">
                              1 Tháng
                            </p>
                          )}
                        </td>
                        <td className="pmy21 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {service.Service.allow === true
                              ? (
                                  service.Service.cost * quantity
                                ).toLocaleString("en-US") + "  VND"
                              : service.Service.cost.toLocaleString("en-US") +
                                "  VND"}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td className=" px-4 py-2 dark:border-strokedark">
                      <p className="text-black dark:text-white">Phí phòng</p>
                    </td>

                    <td className=" px-4 py-2 dark:border-strokedark">
                      <p className="text-black dark:text-white">1 Tháng</p>
                    </td>
                    <td className="pmy21 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {room.RoomType?.cost.toLocaleString("en-US") + "  VND"}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <hr className="my-5 text-slate-300"></hr>
          <div className="flex justify-between">
            <h4 className="">
              <strong>Tổng hóa đơn:</strong>{" "}
            </h4>
            <h4 className="">
              {(
                room?.Services?.map((service, serviceKey) => {
                  const quantity =
                    detail[roomKey]?.service[serviceKey]?.quantity ||
                    (0 as any);

                  return service.Service.allow === true
                    ? service.Service.cost * quantity
                    : service.Service.cost;
                }).reduce((total, num) => total + num) + room.RoomType?.cost
              ).toLocaleString("en-US") + "  VND"}
            </h4>
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
              "bg-slate-600": isPending,
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
