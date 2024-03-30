"use client";

import { updateFacilityById } from "@/actions/facilities";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { FacilitiesSchema, RoomSchema } from "@/schema";
import { FACILITIES } from "@/types/facilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { Branch, FacilitiesType, StatusFacilities } from "@prisma/client";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useQRCode } from "next-qrcode";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import * as z from "zod";
import { ROOM } from "@/types/room";
import { ROOMTYPE } from "@/types/room-type";
import { updateRoomById } from "@/actions/room";

export const RoomDetailForm = ({
  room,
  type,
  roomTypes,
  branchs,
}: {
  room: ROOM;
  type?: string;
  roomTypes: ROOMTYPE[];
  branchs: Branch[];
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof RoomSchema>>({
    resolver: zodResolver(RoomSchema),
    defaultValues: {
      branchId: room.branchId || "",
      description: room.description || "",
      roomTypeCode: room.roomTypeCode || "",
      floor: String(room.floor) || "",
      code: room.code || "",
    },
  });
  console.log(errors);
  const onSubmit = (value: z.infer<typeof RoomSchema>) => {
    startTransition(() => {
      updateRoomById(room.id, value).then((res) => {
        console.log(res);
        if (res?.success) {
          router.refresh();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Phòng đã được cập nhật thành công!",
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
        router.refresh();
      });
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5.5 flex flex-col gap-4 ">
        <div className="w-full">
          <label
            className={clsx(
              `mb-3 block text-sm font-medium text-black dark:text-white`,
              {
                "text-red": errors.code,
              },
            )}
          >
            Mã phòng
          </label>
          <input
            type="text"
            placeholder="Nhập số lượng cơ sở vật chất"
            className={clsx(
              "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
              {
                "focus:border-red": errors.code,
              },
            )}
            disabled={type === "detail" ? true : null || isPending}
            {...register("code")}
          />
          <p
            className={clsx(`font-smblock text-sm text-black dark:text-white`, {
              "text-red": errors.code,
            })}
          >
            {errors.code?.message}
          </p>
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
            <Select.Root
              {...register("branchId")}
              onValueChange={(e) => setValue("branchId", e)}
              defaultValue={room.branchId}
              disabled={type === "detail" ? true : null || isPending}
            >
              <Select.Trigger
                className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                aria-label="branchId"
              >
                <Select.Value placeholder="Chọn chi nhánh" />
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
                      {branchs.map((branch, index) => (
                        <Select.Item
                          value={branch.id}
                          className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                          key={index}
                        >
                          <Select.ItemText>{branch.name}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <p
              className={clsx(
                `font-smblock mt-1 text-sm text-black dark:text-white`,
                {
                  "text-red": errors.branchId,
                },
              )}
            >
              {errors.branchId?.message}
            </p>
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
            <Select.Root
              {...register("roomTypeCode")}
              onValueChange={(e) => setValue("roomTypeCode", e)}
              defaultValue={room.roomTypeCode}
              disabled={type === "detail" ? true : null || isPending}
            >
              <Select.Trigger
                className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                aria-label="branchId"
              >
                <Select.Value placeholder="Chọn phòng" />
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
                      {roomTypes.map((type, index) => (
                        <Select.Item
                          value={type.code}
                          className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                          key={index}
                        >
                          <Select.ItemText>{type.name}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <p
              className={clsx(
                `font-smblock mt-1 text-sm text-black dark:text-white`,
                {
                  "text-red": errors.roomTypeCode,
                },
              )}
            >
              {errors.roomTypeCode?.message}
            </p>
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
            <input
              type="number"
              placeholder="Nhập số lượng cơ sở vật chất"
              className={clsx(
                "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                {
                  "focus:border-red": errors.floor,
                },
              )}
              disabled={type === "detail" ? true : null || isPending}
              {...register("floor")}
            />
            <p
              className={clsx(
                `font-smblock text-sm text-black dark:text-white`,
                {
                  "text-red": errors.floor,
                },
              )}
            >
              {errors.floor?.message}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="description"
        >
          Mô tả
        </label>
        <div className="relative">
          <textarea
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            id="description"
            placeholder="Nhập mô tả cơ sở vật chất ..."
            {...register("description")}
            rows={6}
            disabled={type === "detail" ? true : null || isPending}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/room");
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
