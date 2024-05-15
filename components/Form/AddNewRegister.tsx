"use client";

import { getRoomByBranchIdAndRoomTypeCode } from "@/actions/room";
import { FormSelect } from "@/components/Input";
import { BRANCH, ROOM, ROOMTYPE } from "@/types";
import clsx from "clsx";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaUserGraduate } from "react-icons/fa";
import { CancelButton, SaveButton } from "../Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createRegister } from "@/actions/register";

export const AddNewRegister = ({
  branchs,
  roomTypes,
}: {
  branchs: BRANCH[];
  roomTypes: ROOMTYPE[];
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [room, setRoom] = useState<ROOM[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    setValue,
  } = useForm({
    // resolver: zodResolver(RoomSchema),
    defaultValues: {
      branchId: "",
      roomTypeCode: "",
      roomId: "",
      year: 0.5,
    },
  });
  const user = useSession();
  const { branchId, roomTypeCode, roomId } = watch();
  const onSubmit = (value: any) => {
    startTransition(() => {
      const data = {
        roomId: value.roomId,
        year: value.year,
        email: user.data?.user.email,
      };
      console.log(data);
      createRegister(data).then((res) => {
        if (res.success) {
          router.push("/home/register-dormitory");
        }
      });
    });
  };
  useEffect(() => {
    startTransition(() => {
      if (branchId && roomTypeCode) {
        getRoomByBranchIdAndRoomTypeCode(branchId, roomTypeCode).then(
          (rooms) => {
            setRoom(rooms as ROOM[]);
          },
        );
      }
    });
  }, [branchId, roomTypeCode]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-10">
        <div className="w-full">
          <label
            className={clsx(
              "mb-3 block text-sm font-medium text-black dark:text-white",
              {
                "text-red": errors.branchId,
              },
            )}
          >
            Thời hạn đăng ký
          </label>
          <FormSelect
            name="year"
            control={control}
            isPending={isPending}
            years={[0.5, 1, 2, 3]}
            errors={errors?.year}
            placeholder={"Chọn năm đăng ký"}
            //   defaultValue={year}
            disabled={false}
          />
        </div>
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
            defaultValue={branchId}
            disabled={false}
          />
        </div>
      </div>
      <div className="w-full">
        <label
          className={clsx(
            "mb-3 mt-6 block text-sm font-medium text-black dark:text-white",
            {
              "text-red": errors.branchId,
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
          placeholder={"Chọn loại phòng"}
          defaultValue={roomTypeCode}
        />
      </div>
      <div className="flex items-center gap-10 p-3">
        <p className="flex gap-3 text-red">
          <FaUserGraduate />
          <span>Chỗ đã có sinh viên</span>
        </p>
        <p className="flex gap-3 text-graydark">
          <FaUserGraduate />
          <span>Chỗ chưa có sinh viên đăng ký</span>
        </p>
        <p className="flex gap-3 text-blue-500">
          <FaUserGraduate />
          <span>Chỗ đã có sinh viên đăng ký</span>
        </p>
      </div>
      <div>
        {/* Get room folowing floor */}
        {Array.from({ length: room[room.length - 1]?.floor || 0 }).map(
          (data, index) =>
            room.filter((item) => item.floor === index + 1).length > 0 && (
              <div key={index} className="relative my-10 rounded-xl border p-5">
                <div className="absolute -top-7 inline-block rounded-t-xl border border-b-0 px-5 text-lg font-semibold">
                  <h1>Tầng {index + 1}</h1>
                </div>
                <div className="flex w-full flex-wrap gap-3">
                  {room
                    .filter((item) => item.floor === index + 1)
                    .map((item, key) => {
                      const roomCurrent =
                        (item?.roomType?.members || 0) -
                        (item?.Student?.length || 0) -
                        (item?.Register?.filter((e) => e.status === 0).length ||
                          0);
                      return (
                        <div
                          key={key}
                          className={clsx("w-1/5 ", {
                            "hover:cursor-pointer": roomCurrent > 0,
                          })}
                        >
                          <div
                            className={clsx(
                              "flex flex-wrap gap-5 rounded border-2 p-5",
                              {
                                "border-blue-500": item.id === roomId,
                              },
                            )}
                            onClick={() =>
                              roomCurrent > 0
                                ? setValue("roomId", item.id)
                                : null
                            }
                          >
                            {item.Student &&
                              item.Student.map((student, key) => (
                                <FaUserGraduate
                                  className="text-red"
                                  key={key}
                                />
                              ))}
                            {item.Register &&
                              item.Register.filter((e) => e.status === 0).map(
                                (register, key) => (
                                  <FaUserGraduate
                                    className="text-blue-500"
                                    key={key}
                                  />
                                ),
                              )}
                            {Array.from({
                              length: roomCurrent,
                            }).map((data, key) => (
                              <FaUserGraduate key={key} />
                            ))}
                          </div>{" "}
                          <p
                            className={clsx("text-center font-semibold", {
                              "text-blue-500": item.id === roomId,
                            })}
                          >
                            Phòng {item.code}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            ),
        )}
      </div>
      <div className="flex w-full gap-30 border-t border-stroke px-6.5 py-4">
        <CancelButton
          isPending={isPending}
          name="Hủy"
          onClick={() => router.push("/home/register-dormitory")}
        />
        <SaveButton
          isPending={isPending}
          name="Đăng ký"
          disabled={roomId ? false : true}
        />
      </div>
    </form>
  );
};
