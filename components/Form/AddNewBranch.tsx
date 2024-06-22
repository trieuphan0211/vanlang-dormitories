"use client";
import { addBranch } from "@/actions/branch";
import { Input } from "@/components/Input";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { readFile } from "@/lib/file";
import { BranchSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import DialogTitle from "@mui/material/DialogTitle";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import * as z from "zod";
import { CancelButton, SaveButton } from "../Button";

export const AddNewBranch = ({
  isPending,
  startTransition,
  setOpen,
}: {
  isPending: boolean;
  startTransition: Function;
  setOpen: Function;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [image, setImage] = useState({
    fileName: "",
    fileFormat: "",
    value: "",
  });

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
  useEffect(() => {
    setValue("image.name", image.fileName);
    setValue("image.type", image.fileFormat);
    setValue("image.value", image.value);
  }, [image, setValue]);
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
    <div className="fixed left-[50%] top-[50%]  z-50 max-h-[85vh]  w-[90vw]  translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
      <div className="border-b border-stroke dark:border-strokedark">
        <DialogTitle className="!font-bold text-black dark:text-white">
          Thêm Chi nhánh
        </DialogTitle>
      </div>

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
            <Input
              type="text"
              placeholder="Nhập tên chi nhánh"
              errors={errors.name}
              isPending={isPending}
              register={register("name")}
            />
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
            <Input
              type="text"
              errors={errors.address}
              placeholder="Nhập địa chỉ chi nhánh"
              isPending={isPending}
              register={register("address")}
            />
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
            <Input
              type="number"
              errors={errors.numberFloors}
              placeholder="Nhập số tầng chi nhánh"
              isPending={isPending}
              register={register("numberFloors")}
            />
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Mô tả
            </label>
            <Input
              type="text"
              placeholder="Nhập mô tả chi nhánh ..."
              isPending={isPending}
              register={register("description")}
              errors={errors.description}
              multiline={true}
              rows={6}
            />
          </div>
          <div className="mb-6">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Hình ảnh
              </label>
            </div>
            <div className="items-center justify-between lg:flex ">
              <div className="mb-2 flex items-center gap-4">
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
                  <div>
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
                  </div>
                )}
              </div>
              <div className="w-1/2 overflow-hidden  ">
                {image?.fileName && (
                  <Image
                    className="h-auto w-full rounded-xl"
                    src={`data:${image.fileFormat};base64,${image.value}`}
                    alt={image.fileName}
                    height={100}
                    width={100}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-30 border-t border-stroke px-6.5 py-4">
          <CancelButton
            isPending={isPending}
            name="Hủy"
            onClick={handleCloseModal}
          />
          <SaveButton isPending={isPending} name="Lưu" />
        </div>
      </form>
    </div>
  );
};
