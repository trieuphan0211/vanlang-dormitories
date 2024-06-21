"use client";
import { addRooms } from "@/actions/room";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { RoomSchema } from "@/schema";
import { BRANCH, ROOMTYPE, SERVICES } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import DialogTitle from "@mui/material/DialogTitle";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormSelect, FormSelectMultiple, Input } from "@/components/Input";
import { useEffect, useState } from "react";

export const AddNewRoom = ({
  branchs,
  roomTypes,
  services,
  isPending,
  startTransition,
  setOpen,
}: {
  branchs: BRANCH[];
  roomTypes: ROOMTYPE[];
  services: SERVICES[];
  isPending: boolean;
  startTransition: Function;
  setOpen: Function;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [branch, setBranch] = useState<BRANCH | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
  } = useForm<z.infer<typeof RoomSchema>>({
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      branchId: "",
      description: "",
      roomTypeCode: "",
      services: [],
    },
  });
  const onSubmit = (value: z.infer<typeof RoomSchema>) => {
    startTransition(() => {
      console.log(value);
      addRooms(value).then((res) => {
        if (res?.success) {
          handleCloseModal();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Phòng đã được thêm thành công!",
              },
            }),
          );
          router.refresh();
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
  const { branchId } = watch();
  useEffect(() => {
    setBranch(branchs.filter((item) => item.id === branchId)[0]);
  }, [branchs, branchId]);
  return (
    <div className="fixed left-[50%] top-[50%]  z-50 max-h-[85vh]  w-[90vw]  translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
      <div className="border-b border-stroke dark:border-strokedark">
        <DialogTitle className="font-medium text-black dark:text-white">
          Thêm phòng
        </DialogTitle>
      </div>

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
                    "text-red": errors.roomTypeCode,
                  },
                )}
              >
                Loại phòng
              </label>
              <FormSelect
                name="roomTypeCode"
                control={control}
                isPending={isPending}
                roomTypes={roomTypes}
                errors={errors?.roomTypeCode}
                placeholder={"Chọn chi nhánh"}
              />
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
              <FormSelect
                name="floor"
                control={control}
                isPending={isPending}
                number={branch?.floorNumber || 1}
                placeholder="Nhập số tầng"
                errors={errors.floor}
              />
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
                Số lượng
              </label>
              <Input
                type="number"
                placeholder="Nhập số lượng phòng"
                errors={errors.count}
                isPending={isPending}
                register={register("count")}
              />
            </div>
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
              Dịch vụ
            </label>
            <FormSelectMultiple
              register={register("services")}
              isPending={isPending}
              services={services}
              errors={errors?.services}
              placeholder={"Chọn chi nhánh"}
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
    </div>
  );
};
