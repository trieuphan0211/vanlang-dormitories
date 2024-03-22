"use client";
import { addBranch } from "@/actions/branch";
import { addRoomType } from "@/actions/roomType";
import { readFile } from "@/lib/file";
import { BranchSchema, RoomTypeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { IoAdd, IoClose } from "react-icons/io5";
import * as z from "zod";

export const AddNewRoomType = () => {
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
    console.log(value);
    startTransition(() => {
      addRoomType(value).then((res) => {
        if (res?.success) {
          handleCloseModal();
          alert("Add room type successfully");
          document.location.reload();
        }
        if (res?.error) {
          console.log(res.error);
          alert("Add room type failed");
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
          Add Room Type
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-[rgba(0,0,0,0.4)]   data-[state=open]:animate-overlayShow"
          onClick={handleCloseModal}
        />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <Dialog.Title className="font-medium text-black dark:text-white">
              Add Room Type
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
                  Room Type Name
                </label>
                <input
                  type="text"
                  placeholder="Default Input"
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
                  Number of members
                </label>
                <input
                  type="number"
                  placeholder="Default Input"
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
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register("description")}
                  disabled={isPending}
                ></textarea>
              </div>
            </div>
            <div className="border-t border-stroke px-6.5 py-4">
              <Dialog.Close className="w-full">
                <button
                  disabled={isPending}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  aria-label="Close"
                >
                  Save
                </button>
              </Dialog.Close>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            ></button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
