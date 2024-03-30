"use client";
import { addFacilitiesType } from "@/actions/facilitiesType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { FacilitiesTypeSchema, MaintenanceSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import * as z from "zod";
import { QrReader } from "../scanner/Scanner";
import { Result } from "@zxing/library";
import { getFacilitiesById } from "@/data/facilities";
import { FACILITIES } from "@/types/facilities";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import { ScanQrCode } from "./ScanQrCode";
import { getFacilities } from "@/actions/facilities";
import { addManitainance } from "@/actions/mantainance";

export const AddNewMaintenance = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [openQr, setOpenQr] = useState(false);
  const [qr, setQr] = useState<string>("");
  const [facilities, setFacilities] = useState<FACILITIES[]>([]);
  const getFacility = async (qrCode: string) => {
    const res = (await getFacilities(qrCode)) as FACILITIES;
    facilities.find((item) => item.code === res.code)
      ? null
      : setFacilities([...facilities, res]);
    setQr("");
    setOpenQr(false);
  };
  useEffect(() => {
    if (qr) {
      getFacility(qr);
    }
  }, [qr]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof MaintenanceSchema>>({
    resolver: zodResolver(MaintenanceSchema),
    defaultValues: {
      mantainanceName: "",
      listFacilities: [],
      status: "CREATED",
      description: "",
    },
  });
  const onSubmit = (value: z.infer<typeof MaintenanceSchema>) => {
    const facilitiesId = facilities.map((item) => item.id);
    startTransition(() => {
      addManitainance({ ...value, listFacilities: facilitiesId }).then(
        (res) => {
          if (res?.success) {
            router.refresh();
            handleCloseModal();
            setFacilities([]);
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Loại cơ sở vật chất đã được thêm thành công!",
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
        },
      );
    });
  };
  const handleCloseModal = () => {
    setOpen(false);
    reset();
  };
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center text-nowrap rounded-md bg-primary px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <IoAdd className="text-2xl" />
          Thêm
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-[rgba(0,0,0,0.4)]   data-[state=open]:animate-overlayShow"
          onClick={handleCloseModal}
        />
        <Dialog.Content className="fixed left-[50%]  top-[50%] z-[2] max-h-[85vh]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <Dialog.Title className="font-medium text-black dark:text-white">
              Thêm đơn bảo trì
            </Dialog.Title>
          </div>

          <Dialog.Description className=""></Dialog.Description>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label
                  className={clsx(
                    "mb-3 block text-sm font-medium text-black dark:text-white",
                    {
                      "text-red": errors.mantainanceName,
                    },
                  )}
                >
                  Tên bảo trì
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên bảo trì"
                  className={clsx(
                    "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                    {
                      "focus:border-red": errors.mantainanceName,
                    },
                  )}
                  disabled={isPending}
                  {...register("mantainanceName")}
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
              <div>
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
                <DatePickerOne setValue={setValue} />
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
              <div>
                {/* Scan QR Code */}
                <div className="flex justify-end">
                  <ScanQrCode setQr={setQr} open={openQr} setOpen={setOpenQr} />
                </div>
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
                {facilities.length > 0 && (
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
                      {facilities.map((facilitie, key) => (
                        <tr key={key}>
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {key + 1}
                            </p>
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

                {/* Scan QR Code */}
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mô tả
                </label>
                <textarea
                  rows={6}
                  placeholder="Nhập mô tả loại cơ sở vật chất ..."
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register("description")}
                  disabled={isPending}
                ></textarea>
              </div>
            </div>
            <div className="border-t border-stroke px-6.5 py-4">
              <button
                disabled={isPending}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                aria-label="Close"
              >
                Lưu
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
