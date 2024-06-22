"use client";
import { addFacilities } from "@/actions/facilities";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { FacilitiesSchema } from "@/schema";
import { BRANCH, FACILITIESTYPE } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CancelButton, SaveButton } from "../Button";
import { FormSelect, Input } from "../Input";

export const AddNewFacilities = ({
  isPending,
  startTransition,
  branchs,
  facilitiesType,
  setOpen,
}: {
  isPending: boolean;
  startTransition: Function;
  branchs: BRANCH[];
  facilitiesType: FACILITIESTYPE[];
  setOpen: Function;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof FacilitiesSchema>>({
    resolver: zodResolver(FacilitiesSchema),
    defaultValues: {
      name: "",
      description: "",
      branchId: "",
      facilitiesTypeCode: "",
      count: "0",
    },
  });
  const onSubmit = (value: z.infer<typeof FacilitiesSchema>) => {
    console.log(value);
    startTransition(() => {
      addFacilities(value).then((res) => {
        if (res?.success) {
          router.refresh();
          handleCloseModal();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Cơ sở vật chất đã được thêm thành công!",
              },
            }),
          );
        }
        if (res?.error) {
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "error",
                content: "Có lỗi xảy ra, vui lòng thử lại!",
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
    <div className="fixed left-[50%] top-[50%] z-[2] max-h-[85vh]  w-[90vw]  translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
      <div className="py border-b border-stroke  dark:border-strokedark">
        <DialogTitle className="!font-bold text-black dark:text-white">
          Thêm cơ sở vật chất
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
              Tên cơ sở vật chất
            </label>
            <Input
              type="text"
              placeholder="Nhập tên cơ sở vật chất"
              errors={errors.name}
              isPending={isPending}
              register={register("name")}
            />
          </div>
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
              <FormSelect
                name="branchId"
                control={control}
                isPending={isPending}
                branchs={branchs}
                errors={errors?.branchId}
                placeholder={"Chọn chi nhánh"}
              />
            </div>
            <div className="w-full">
              <label
                className={clsx(
                  "mb-3 block text-sm font-medium text-black dark:text-white",
                  {
                    "text-red": errors.facilitiesTypeCode,
                  },
                )}
              >
                Loại cơ sở vật chất
              </label>
              <FormSelect
                name="facilitiesTypeCode"
                isPending={isPending}
                control={control}
                facilitiesType={facilitiesType}
                errors={errors?.facilitiesTypeCode}
                placeholder={"Chọn loại cơ sở vật chất"}
              />
            </div>
          </div>
          <div>
            <label
              className={clsx(
                `mb-3 block text-sm font-medium text-black dark:text-white`,
                {
                  "text-red": errors.count,
                },
              )}
            >
              Số lượng
            </label>
            <Input
              type="number"
              placeholder="Nhập số lượng cơ sở vật chất"
              errors={errors.count}
              isPending={isPending}
              register={register("count")}
            />
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Mô tả
            </label>
            <Input
              type="text"
              placeholder="Nhập mô tả phòng ..."
              errors={errors.description}
              isPending={isPending}
              register={register("description")}
              multiline={true}
              rows={6}
            />
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
