"use client";
import { addService } from "@/actions/service";
import { Input } from "@/components/Input";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { ServiceSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CancelButton, SaveButton } from "../Button";
import { DialogTitle, Switch } from "@mui/material";
import { useEffect } from "react";

export const AddNewService = ({
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
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<z.infer<typeof ServiceSchema>>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      serviceName: "",
      description: "",
      cost: "",
      unit: "tháng",
      allow: false,
    },
  });
  const { allow } = watch();
  useEffect(() => {
    if (!allow) {
      setValue("unit", "tháng");
    }
  }, [allow, setValue]);
  const onSubmit = (value: z.infer<typeof ServiceSchema>) => {
    startTransition(() => {
      addService(value).then((res) => {
        if (res?.success) {
          router.refresh();
          handleCloseModal();
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "success",
                content: "Dịch vụ đã được thêm thành công!",
              },
            }),
          );
        }
        if (res?.error) {
          dispatch(
            alertManagerActions.setAlert({
              message: {
                type: "error",
                content: "Có lỗi xảy ra! Vui lòng thử lại sau!",
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
    <div className="fixed left-[50%] top-[50%] z-50 max-h-[85vh]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
      <div className="border-b border-stroke py-4 dark:border-strokedark">
        <DialogTitle className="!font-bold text-black dark:text-white">
          Thêm dịch vụ
        </DialogTitle>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label
              className={clsx(
                "mb-3 block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.serviceName,
                },
              )}
            >
              Tên dịch vụ
            </label>
            <Input
              type="text"
              placeholder="Nhập tên dịch vụ"
              errors={errors.serviceName}
              isPending={isPending}
              register={register("serviceName")}
            />
          </div>
          <div className="mb-3 flex items-center gap-10">
            <label
              className={clsx(
                " block text-sm font-medium text-black dark:text-white",
                {
                  "text-red": errors.serviceName,
                },
              )}
            >
              Cho phép nhập số lượng khi tạo hóa đơn
            </label>
            <Switch {...register("allow")} checked={!!allow as boolean} />
          </div>
          <div>
            <label
              className={clsx(
                `mb-3 block text-sm font-medium text-black dark:text-white`,
                {
                  "text-red": errors.cost,
                },
              )}
            >
              Chi phí
            </label>
            <div className="flex w-full items-center gap-3">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nhập chi phí"
                  errors={errors.cost}
                  isPending={isPending}
                  register={register("cost")}
                />
              </div>
              <p className="mb-3 text-2xl">/</p>
              <div>
                <Input
                  type="text"
                  placeholder="Nhập đơn vị"
                  errors={errors.unit}
                  isPending={isPending || !allow}
                  register={register("unit")}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Mô tả
            </label>
            <Input
              type="text"
              placeholder="Nhập mô tả dịch vụ ..."
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
