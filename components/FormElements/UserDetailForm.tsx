"use client";

import { updateFacilityById } from "@/actions/facilities";
import { updateUserById } from "@/actions/user";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { FacilitiesSchema, UserSchema } from "@/schema";
import { FACILITIES } from "@/types/facilities";
import { USER } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Branch,
  FacilitiesType,
  StatusFacilities,
  UserRole,
} from "@prisma/client";
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
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            {...register("name")}
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
            Quyền
          </label>
          <Select.Root
            disabled={type === "detail" ? true : null || isPending}
            defaultValue={user.role}
            onValueChange={(e) => setValue("role", e as UserRole)}
          >
            <Select.Trigger
              className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              aria-label="userId"
            >
              <Select.Value placeholder="Choise status" />
              <Select.Icon className="text-black">
                <IoChevronDownCircleOutline />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="z-10 w-full overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                <Select.ScrollUpButton className="flex  cursor-default items-center justify-center bg-white text-black">
                  <IoChevronUpCircleOutline />
                </Select.ScrollUpButton>
                <Select.Viewport className=" p-[5px]">
                  <Select.Group className="z-10">
                    <Select.Item
                      value={UserRole.ADMIN}
                      className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                    >
                      <Select.ItemText>Quản trị viên</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value={UserRole.DIRECTOR}
                      className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                    >
                      <Select.ItemText>Giám đốc</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value={UserRole.STAFF}
                      className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                    >
                      <Select.ItemText>Nhân viên</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value={UserRole.USER}
                      className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                    >
                      <Select.ItemText>Người dùng</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
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
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            {...register("email")}
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
