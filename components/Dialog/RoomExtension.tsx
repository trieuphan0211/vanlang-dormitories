"use client";
import { createExtensionRegister } from "@/actions/register";
import { getStudentFromEmail } from "@/actions/student";
import { useAppDispatch } from "@/hooks/redux";
import { Dialog, DialogTitle } from "@mui/material";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CancelButton, SaveButton } from "../Button";
import { FormSelect } from "../Input";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";

export const RoomExtension = ({
  isPending,
  startTransition,
  setState,
}: {
  isPending: boolean;
  startTransition: Function;
  setState: Function;
}) => {
  const user = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    setState(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    // resolver: zodResolver(BranchSchema),
    defaultValues: {
      year: 0.5,
    },
  });
  const onSubmit = async (value: any) => {
    startTransition(() => {
      getStudentFromEmail(user.data?.user.email as string).then((student) => {
        if (!student[0]?.expiredRoom) {
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "warning",
                content: "Có lỗi xảy ra, hãy tải lại trang!",
              },
            }),
          );
          return;
        }
        const date = new Date(student[0]?.expiredRoom).setMonth(
          new Date(student[0]?.expiredRoom).getMonth() + value.year * 12,
        );
        createExtensionRegister({
          roomId: student[0]?.Room?.id,
          year: value.year,
          allowRegister: new Date(date).toISOString(),
          email: user.data?.user.email,
        }).then((res) => {
          if (res.success) {
            router.refresh();
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Đăng ký phòng thành công!",
                },
              }),
            );
          }
          if (res.error) {
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Đăng ký gia hạn phòng thất bại!",
                },
              }),
            );
          }
        });
        return new Date(date).toISOString();
      });
    });
  };

  return (
    <div className="w-full">
      <Dialog onClose={handleCloseModal} open={true}>
        <div className="fixed left-[50%] top-[50%]  z-50 max-h-[85vh] w-[80vw] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
          <div className="border-b border-stroke dark:border-strokedark">
            <DialogTitle className="!font-bold text-black dark:text-white">
              Gia hạn phòng
            </DialogTitle>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-5.5 p-6.5">
              <label
                className={clsx(
                  "text-md mb-3 block text-nowrap font-medium text-black dark:text-white",
                  {
                    "text-red": errors?.year,
                  },
                )}
              >
                Gia hạn đến:
              </label>
              <div className="w-full">
                <FormSelect
                  name="year"
                  control={control}
                  isPending={isPending}
                  years={[0.5, 1, 2, 3]}
                  errors={errors?.year}
                  placeholder={"Chọn thời gian gia hạn"}
                  //   defaultValue={year}
                  disabled={false}
                />
              </div>
            </div>
            <div className="flex w-full gap-30 border-t border-stroke px-6.5 py-4">
              <CancelButton
                isPending={isPending}
                name="Hủy"
                onClick={handleCloseModal}
              />
              <SaveButton isPending={isPending} name="Gia hạn" />
            </div>
          </form>
        </div>
      </Dialog>
      {/* )} */}
    </div>
  );
};
