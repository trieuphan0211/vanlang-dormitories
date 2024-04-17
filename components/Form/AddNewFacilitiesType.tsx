"use client";
import { addFacilitiesType } from "@/actions/facilitiesType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { FacilitiesTypeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CancelButton, SaveButton } from "../Button";

export const AddNewFacilitiesType = ({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof FacilitiesTypeSchema>>({
    resolver: zodResolver(FacilitiesTypeSchema),
    defaultValues: {
      facilitesTypeName: "",
      description: "",
    },
  });
  const onSubmit = (value: z.infer<typeof FacilitiesTypeSchema>) => {
    startTransition(() => {
      addFacilitiesType(value).then((res) => {
        if (res?.success) {
          router.refresh();
          handleCloseModal();
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
      });
    });
  };
  const handleCloseModal = () => {
    setOpen(false);
    reset();
  };
  return (
    <div className="fixed left-[50%]  top-[50%]  z-50  max-h-[85vh]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
      <div className="border-b border-stroke dark:border-strokedark">
        <DialogTitle className="!font-bold text-black dark:text-white">
          Thêm loại cơ sở vật chất
        </DialogTitle>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.facilitesTypeName,
                },
              )}
            >
              Tên loại cơ sở vật chất
            </label>
            <input
              type="text"
              placeholder="Nhập tên loại cơ sở vật chất"
              className={clsx(
                "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                {
                  "focus:border-red": errors.facilitesTypeName,
                },
              )}
              disabled={isPending}
              {...register("facilitesTypeName")}
            />
            <p
              className={clsx(
                `font-smblock mt-1 text-sm text-black dark:text-white`,
                {
                  "text-red": errors.facilitesTypeName,
                },
              )}
            >
              {errors.facilitesTypeName?.message}
            </p>
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
