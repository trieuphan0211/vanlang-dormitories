"use client";

import { useAppDispatch } from "@/hooks/redux";
import { BRANCH, REGISTER, ROOM, ROOMTYPE, USER } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { StudentDetailForm } from "../FormElements/StudentDetailForm";
import { Input } from "postcss";
import clsx from "clsx";
import { FormSelect } from "../Input";
import { updateStudentInRoomById } from "@/actions/student";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";

export const RegisterDetailForm = ({
  registers,
  type,
  user,
  branchs,
  roomTypes,
  rooms,
  role,
}: {
  registers: REGISTER;
  type?: string;
  user?: USER;
  branchs: BRANCH[];
  roomTypes: ROOMTYPE[];
  rooms: ROOM[];
  role?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      roomId: registers.roomId || "",
      branchId: registers.Room?.branchId || "",
      roomTypesCode: registers.Room?.roomTypeCode || "",
    },
  });
  const onSubmit = (value: {
    roomTypesCode: string;
    branchId: string;
    roomId: string;
  }) => {
    console.log(value);
    startTransition(() => {
      updateStudentInRoomById(
        registers.Student.id,
        value.roomId,
        registers.id,
      ).then((res) => {
        if (res?.success) {
          router.push("/admin/register-dormitory");
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Đơn đăng ký đã được duyệt thành công!",
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
  const { roomId, roomTypesCode, branchId } = watch();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (roomTypesCode) {
      params.set("roomTypesCode", roomTypesCode);
    }
    if (branchId) {
      params.set("branchId", branchId);
    }
    replace(`${pathname}?${params.toString()}`);
  }, [roomTypesCode, branchId]);
  return (
    <div>
      <button
        disabled={isPending}
        onClick={() => setOpen(!open)}
        className="mb-3 flex justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
        aria-label="Close"
      >
        {open ? "Ẩn thông tin sinh viên" : "Hiển thị thông tin sinh viên"}
      </button>
      {open && (
        <div className="rounded-xl border border-[rgba(0,0,0,0.3)] p-3">
          <StudentDetailForm
            student={registers.Student}
            user={user}
            type="detail"
            removeButton={true}
          />
        </div>
      )}{" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div className="w-full">
            <label
              className={clsx(
                `mb-3 block text-sm font-medium text-black dark:text-white`,
              )}
              htmlFor="emailAddress"
            >
              Chi Nhánh
            </label>
            <FormSelect
              name="branchId"
              control={control}
              isPending={isPending}
              branchs={branchs}
              errors={errors?.branchId}
              // defaultValue={registers.room?.branchId || ""}
              defaultValue={branchId || ""}
              placeholder={"Chọn chi nhánh"}
              disabled={type === "detail" ? true : null || isPending}
            />
          </div>
          <div className="w-full">
            <label
              className={clsx(
                `mb-3 block text-sm font-medium text-black dark:text-white`,
              )}
              htmlFor="emailAddress"
            >
              Loại phòng
            </label>
            <FormSelect
              name="roomTypesCode"
              control={control}
              isPending={isPending}
              roomTypes={roomTypes}
              errors={errors?.roomTypesCode}
              placeholder={"Chọn loại phòng"}
              defaultValue={roomTypesCode || ""}
              disabled={type === "detail" ? true : null || isPending}
            />
          </div>
        </div>
        <div className="my-5.5">
          <label
            className={clsx(
              `mb-3 block text-sm font-medium text-black dark:text-white`,
            )}
            htmlFor="emailAddress"
          >
            Phòng
          </label>
          <FormSelect
            name="roomId"
            control={control}
            isPending={isPending}
            rooms={rooms}
            errors={errors?.roomId}
            defaultValue={roomId || ""}
            placeholder={"Chọn loại phòng"}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
        <div className="flex justify-end gap-4.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(user?.role);
              role === "user"
                ? router.push("/home/register-dormitory")
                : router.push("/admin/register-dormitory");
            }}
            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
            disabled={isPending}
          >
            Quay lại
          </button>
          <button
            className={clsx(
              "flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90",
              {
                hidden: type === "detail",
              },
            )}
            type="submit"
            disabled={isPending}
          >
            Duyệt
          </button>
        </div>
      </form>
    </div>
  );
};
