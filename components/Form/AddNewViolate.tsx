"use client";
import { addRoomType } from "@/actions/roomType";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { DialogTitle } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CancelButton, SaveButton } from "../Button";
import { FormSelect, Input } from "../Input";
import { getStudentsAll } from "@/actions/student";
import { useEffect, useState } from "react";
import { STUDENT } from "@/types";
import { addviolate } from "@/actions/violate";
import { ViolateSchema } from "@/schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const AddNewViolate = ({
  isPending,
  startTransition,
  setOpen,
}: {
  isPending: boolean;
  startTransition: Function;
  setOpen: Function;
}) => {
  const router = useRouter();
  const [students, setStudents] = useState<STUDENT[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    startTransition(() => {
      getStudentsAll().then((res) => {
        setStudents(res as STUDENT[]);
      });
    });
  }, []);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof ViolateSchema>>({
    resolver: zodResolver(ViolateSchema),
    defaultValues: {
      violateName: "",
      description: "",
      studentId: "",
    },
  });
  const onSubmit = (value: z.infer<typeof ViolateSchema>) => {
    startTransition(() => {
      addviolate(value).then((res) => {
        if (res?.success) {
          router.refresh();
          handleCloseModal();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Vi phạm đã được thêm thành công!",
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
          Thêm vi phạm
        </DialogTitle>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.violateName,
                },
              )}
            >
              Tên vi phạm
            </label>
            <Input
              type="text"
              placeholder="Nhập tên vi phạm"
              errors={errors.violateName}
              isPending={isPending}
              register={register("violateName")}
            />
          </div>
          <div>
            <label
              className={clsx(
                `mb-3 block text-sm font-medium text-black dark:text-white`,
                {
                  "text-red": errors.studentId,
                },
              )}
            >
              Thành viên vi phạm
            </label>
            <FormSelect
              name="studentId"
              control={control}
              isPending={isPending}
              students={students}
              errors={errors?.studentId}
              placeholder={"Chọn chi nhánh"}
            />
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
