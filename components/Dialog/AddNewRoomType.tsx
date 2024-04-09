"use client";
import { addRoomType } from "@/actions/roomType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { RoomTypeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import * as z from "zod";

export const AddNewRoomType = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof RoomTypeSchema>>({
    resolver: zodResolver(RoomTypeSchema),
    defaultValues: {
      roomTypeName: "",
      description: "",
      members: "0",
    },
  });
  const onSubmit = (value: z.infer<typeof RoomTypeSchema>) => {
    startTransition(() => {
      addRoomType(value).then((res) => {
        if (res?.success) {
          router.refresh();
          handleCloseModal();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Loại phòng đã được thêm thành công!",
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
              Thêm loại phòng
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
                      "text-red": errors.roomTypeName,
                    },
                  )}
                >
                  Tên loại phòng
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên loại phòng"
                  className={clsx(
                    "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                    {
                      "focus:border-red": errors.roomTypeName,
                    },
                  )}
                  disabled={isPending}
                  {...register("roomTypeName")}
                />
                <p
                  className={clsx(
                    `font-smblock mt-1 text-sm text-black dark:text-white`,
                    {
                      "text-red": errors.roomTypeName,
                    },
                  )}
                >
                  {errors.roomTypeName?.message}
                </p>
              </div>
              <div>
                <label
                  className={clsx(
                    `mb-3 block text-sm font-medium text-black dark:text-white`,
                    {
                      "text-red": errors.members,
                    },
                  )}
                >
                  Số thành viên
                </label>
                <input
                  type="number"
                  placeholder="Nhập số thành viên"
                  className={clsx(
                    "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                    {
                      "focus:border-red": errors.members,
                    },
                  )}
                  disabled={isPending}
                  {...register("members")}
                />
                <p
                  className={clsx(
                    `font-smblock mt-1 text-sm text-black dark:text-white`,
                    {
                      "text-red": errors.members,
                    },
                  )}
                >
                  {errors.members?.message}
                </p>
              </div>
              <div>
                <label
                  className={clsx(
                    `mb-3 block text-sm font-medium text-black dark:text-white`,
                    {
                      "text-red": errors.members,
                    },
                  )}
                >
                  Giá
                </label>
                <input
                  type="number"
                  placeholder="Nhập số thành viên"
                  className={clsx(
                    "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                    {
                      "focus:border-red": errors.members,
                    },
                  )}
                  disabled={isPending}
                  {...register("cost")}
                />
                <p
                  className={clsx(
                    `font-smblock mt-1 text-sm text-black dark:text-white`,
                    {
                      "text-red": errors.members,
                    },
                  )}
                >
                  {errors.members?.message}
                </p>
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
