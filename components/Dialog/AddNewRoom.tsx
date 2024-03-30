"use client";
import { addRoomType } from "@/actions/roomType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { RoomSchema, RoomTypeSchema } from "@/schema";
import { BRANCH } from "@/types/branch";
import { ROOMTYPE } from "@/types/room-type";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  IoAdd,
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import * as z from "zod";
import * as Select from "@radix-ui/react-select";
import { addRooms } from "@/actions/room";

export const AddNewRoom = ({
  branchs,
  roomTypes,
}: {
  branchs: BRANCH[];
  roomTypes: ROOMTYPE[];
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof RoomSchema>>({
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      branchId: "",
      description: "",
      roomTypeCode: "",
    },
  });
  const onSubmit = (value: z.infer<typeof RoomSchema>) => {
    startTransition(() => {
      console.log(value);
      addRooms(value).then((res) => {
        if (res?.success) {
          router.refresh();
          handleCloseModal();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Phòng đã được thêm thành công!",
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
      });
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
              Thêm phòng
            </Dialog.Title>
          </div>

          <Dialog.Description className=""></Dialog.Description>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="flex gap-4">
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
                  <Select.Root
                    {...register("branchId")}
                    onValueChange={(e) => setValue("branchId", e)}
                  >
                    <Select.Trigger
                      className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      aria-label="branchId"
                    >
                      <Select.Value placeholder="Chọn chi nhánh" />
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
                            {branchs.map((branch, index) => (
                              <Select.Item
                                value={branch.id}
                                className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                                key={index}
                              >
                                <Select.ItemText>{branch.name}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Group>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                  <p
                    className={clsx(
                      `font-smblock mt-1 text-sm text-black dark:text-white`,
                      {
                        "text-red": errors.branchId,
                      },
                    )}
                  >
                    {errors.branchId?.message}
                  </p>
                </div>

                <div className="w-full">
                  <label
                    className={clsx(
                      "mb-3 block text-sm font-medium text-black dark:text-white",
                      {
                        "text-red": errors.roomTypeCode,
                      },
                    )}
                  >
                    Loại phòng
                  </label>
                  <Select.Root
                    {...register("roomTypeCode")}
                    onValueChange={(e) => setValue("roomTypeCode", e)}
                  >
                    <Select.Trigger
                      className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      aria-label="branchId"
                    >
                      <Select.Value placeholder="Chọn phòng" />
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
                            {roomTypes.map((type, index) => (
                              <Select.Item
                                value={type.code}
                                className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                                key={index}
                              >
                                <Select.ItemText>{type.name}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Group>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                  <p
                    className={clsx(
                      `font-smblock mt-1 text-sm text-black dark:text-white`,
                      {
                        "text-red": errors.roomTypeCode,
                      },
                    )}
                  >
                    {errors.roomTypeCode?.message}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <label
                    className={clsx(
                      `mb-3 block text-sm font-medium text-black dark:text-white`,
                      {
                        "text-red": errors.floor,
                      },
                    )}
                  >
                    Tầng
                  </label>
                  <input
                    type="number"
                    placeholder="Nhập số lượng cơ sở vật chất"
                    className={clsx(
                      "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                      {
                        "focus:border-red": errors.floor,
                      },
                    )}
                    disabled={isPending}
                    {...register("floor")}
                  />
                  <p
                    className={clsx(
                      `font-smblock text-sm text-black dark:text-white`,
                      {
                        "text-red": errors.floor,
                      },
                    )}
                  >
                    {errors.floor?.message}
                  </p>
                </div>

                <div className="w-full">
                  <label
                    className={clsx(
                      `mb-3 block text-sm font-medium text-black dark:text-white`,
                      {
                        "text-red": errors.floor,
                      },
                    )}
                  >
                    Số phòng
                  </label>
                  <input
                    type="number"
                    placeholder="Nhập số lượng cơ sở vật chất"
                    className={clsx(
                      "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                      {
                        "focus:border-red": errors.count,
                      },
                    )}
                    disabled={isPending}
                    {...register("count")}
                  />
                  <p
                    className={clsx(
                      `font-smblock text-sm text-black dark:text-white`,
                      {
                        "text-red": errors.count,
                      },
                    )}
                  >
                    {errors.count?.message}
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mô tả
                </label>
                <textarea
                  rows={6}
                  placeholder="Nhập mô tả loại phòng ..."
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
