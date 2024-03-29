"use client";
import { addBranch } from "@/actions/branch";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { readFile } from "@/lib/file";
import { BranchSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { IoAdd, IoClose } from "react-icons/io5";
import * as z from "zod";

export const AddNewItem = ({
  isPending,
  startTransition,
}: {
  isPending: boolean;
  startTransition: Function;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({
    fileName: "",
    fileFormat: "",
    value: "",
  });
  useEffect(() => {
    setValue("image.name", image.fileName);
    setValue("image.type", image.fileFormat);
    setValue("image.value", image.value);
  }, [image]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<z.infer<typeof BranchSchema>>({
    resolver: zodResolver(BranchSchema),
    defaultValues: {
      name: "",
      address: "",
      numberFloors: "0",
      description: "",
      image: {
        name: "",
        type: "",
        value: "",
      },
    },
  });
  const onSubmit = (value: z.infer<typeof BranchSchema>) => {
    console.log(value);
    startTransition(() => {
      addBranch(value).then((res) => {
        if (res?.success) {
          router.refresh();
          handleCloseModal();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Chi nhánh đã được thêm thành công!",
              },
            }),
          );
        }
        if (res?.error) {
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "error",
                content: "Có lỗi xảy ra! Vui lòng thử lại!",
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
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[2] max-h-[85vh]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <Dialog.Title className="font-medium text-black dark:text-white">
              Thêm Chi nhánh
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
                      "text-red": errors.name,
                    },
                  )}
                >
                  Tên Chi nhánh
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên chi nhánh"
                  className={clsx(
                    "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                    {
                      "focus:border-red": errors.name,
                    },
                  )}
                  disabled={isPending}
                  {...register("name")}
                />
                <p
                  className={clsx(
                    `font-smblock mt-1 text-sm text-black dark:text-white`,
                    {
                      "text-red": errors.name,
                    },
                  )}
                >
                  {errors.name?.message}
                </p>
              </div>
              <div>
                <label
                  className={clsx(
                    `mb-3 block text-sm font-medium text-black dark:text-white`,
                    {
                      "text-red": errors.address,
                    },
                  )}
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ chi nhánh"
                  className={clsx(
                    "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                    {
                      "focus:border-red": errors.address,
                    },
                  )}
                  disabled={isPending}
                  {...register("address")}
                />
                <p
                  className={clsx(
                    `font-smblock mt-1 text-sm text-black dark:text-white`,
                    {
                      "text-red": errors.address,
                    },
                  )}
                >
                  {errors.address?.message}
                </p>
              </div>
              <div>
                <label
                  className={clsx(
                    `mb-3 block text-sm font-medium text-black dark:text-white`,
                    {
                      "text-red": errors.numberFloors,
                    },
                  )}
                >
                  Số tầng
                </label>
                <input
                  type="number"
                  placeholder="Nhập số tầng của chi nhánh"
                  className={clsx(
                    "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                    {
                      "focus:border-red": errors.numberFloors,
                    },
                  )}
                  disabled={isPending}
                  {...register("numberFloors")}
                />
                <p
                  className={clsx(
                    `font-smblock text-sm text-black dark:text-white`,
                    {
                      "text-red": errors.numberFloors,
                    },
                  )}
                >
                  {errors.numberFloors?.message}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mô tả
                </label>
                <textarea
                  rows={6}
                  placeholder="Nhập mô tả chi nhánh ..."
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register("description")}
                  disabled={isPending}
                ></textarea>
              </div>
              <div className="mb-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Hình ảnh
                  </label>
                </div>
                <div className="items-center justify-between lg:flex ">
                  <div className="mb-2 flex items-center gap-4">
                    {/* <label className="text-s mb-3 block  text-black dark:text-white">
                    Image Name: {value.fileName}
                  </label>
                  <label className="text-s mb-3 block  text-black dark:text-white">
                    Image Type: {value.fileFormat}
                  </label> */}
                    <button
                      className="relative flex cursor-pointer items-center justify-center gap-2 rounded bg-primary p-3 text-sm font-medium text-gray hover:bg-opacity-90"
                      disabled={isPending}
                    >
                      <FiUpload className="text-base" />
                      Tải ảnh lên
                      <input
                        type="file"
                        className="absolute inset-0 h-full w-full  opacity-0"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            readFile(e.target.files[0], setImage);
                          }
                          e.target.value = "";
                        }}
                      />
                    </button>
                    {image?.fileName && (
                      <>
                        <label className="text-s block  text-graydark dark:text-white">
                          {image.fileName}
                        </label>

                        <button
                          disabled={isPending}
                          onClick={() =>
                            setImage({
                              fileName: "",
                              fileFormat: "",
                              value: "",
                            })
                          }
                        >
                          <IoClose className="text-2xl text-red" />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="w-1/2 overflow-hidden  ">
                    {image?.fileName && (
                      <img
                        className="h-auto w-full rounded-xl"
                        src={`data:${image.fileFormat};base64,${image.value}`}
                        alt={image.fileName}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-stroke px-6.5 py-4">
              <Dialog.Close className="w-full">
                <button
                  disabled={isPending}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  aria-label="Close"
                >
                  Lưu
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
