"use client";

import { updateUserById } from "@/actions/user";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { UserSchema } from "@/schema";
import { USER } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import * as z from "zod";
import { FormSelect, Input } from "../Input";

export const UserDetailForm = ({
  user,
  type,
}: {
  user: USER;
  type?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      role: user.role,
    },
  });
  const onSubmit = (value: z.infer<typeof UserSchema>) => {
    console.log(value);

    startTransition(() => {
      updateUserById(user.id, value).then((res) => {
        console.log(res);
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Người dùng đã được cập nhật thành công!",
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
        router.refresh();
      });
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5.5">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Tên người dùng
          </label>
          <Input
            type="text"
            placeholder="Nhập mã phòng"
            errors={errors.name}
            isPending={isPending}
            register={register("name")}
            disabled={type === "detail" ? true : null || isPending}
          />
        </div>
      </div>
      <div className="mb-5.5">
        <div className="w-full">
          <label
            className={clsx(
              "mb-3 block text-sm font-medium text-black dark:text-white",
              {
                "text-red": errors.role,
              },
            )}
          >
            Vai trò
          </label>
          <FormSelect
            register={register("role")}
            isPending={isPending}
            facilifiesStatus={["ADMIN", "DIRECTOR", "STAFF", "USER"]}
            errors={errors?.role}
            placeholder={"Chọn vai trò"}
            defaultValue={user.role}
            disabled={type === "detail" ? true : null || isPending}
          />

          <p
            className={clsx(
              `font-smblock mt-1 text-sm text-black dark:text-white`,
              {
                "text-red": errors.role,
              },
            )}
          >
            {errors.name?.message}
          </p>
        </div>
      </div>
      <div className="mb-5.5">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Email
          </label>
          <Input
            type="text"
            placeholder="Nhập mã phòng"
            errors={errors.name}
            isPending={isPending}
            register={register("name")}
            disabled={true}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/user");
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
          Cập nhật
        </button>
      </div>
    </form>
  );
};
