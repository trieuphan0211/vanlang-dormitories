"use client";
import { addviolate } from "@/actions/violate";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { ViolateTypeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle, Switch } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CancelButton, SaveButton } from "../Button";
import { Input } from "../Input";
import { addViolateType } from "@/actions/violateType";

export const AddNewViolateType = ({
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
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<z.infer<typeof ViolateTypeSchema>>({
    resolver: zodResolver(ViolateTypeSchema),
    defaultValues: {
      violateTypeName: "",
      point: "",
      description: "",
      allow: false,
    },
  });
  const { allow } = watch();
  const onSubmit = (value: z.infer<typeof ViolateTypeSchema>) => {
    startTransition(() => {
      addViolateType(value).then((res) => {
        if (res?.success) {
          router.refresh();
          handleCloseModal();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Loại vi phạm đã được thêm thành công!",
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
    <div className="fixed left-[50%] top-[50%]  z-50 max-h-[85vh]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
      <div className="border-b border-stroke dark:border-strokedark">
        <DialogTitle className="!font-bold text-black dark:text-white">
          Thêm loại vi phạm
        </DialogTitle>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.violateTypeName,
                },
              )}
            >
              Tên loại vi phạm
            </label>
            <Input
              type="text"
              placeholder="Nhập tên loại vi phạm"
              errors={errors.violateTypeName}
              isPending={isPending}
              register={register("violateTypeName")}
            />
          </div>
          <div>
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.point,
                },
              )}
            >
              Điểm vi phạm
            </label>
            <Input
              type="number"
              placeholder="Nhập điểm trừ khi sinh viên vi phạm"
              errors={errors.point}
              isPending={isPending}
              register={register("point")}
            />
          </div>
          <div className="mb-3 flex items-center gap-10">
            <label
              className={clsx(
                " block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.allow,
                },
              )}
            >
              Cho phép lập hóa đơn
            </label>
            <Switch {...register("allow")} checked={!!allow as boolean} />
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Mô tả
            </label>
            <Input
              type="text"
              placeholder="Nhập mô tả loại phòng ..."
              isPending={isPending}
              register={register("description")}
              errors={errors.description}
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
