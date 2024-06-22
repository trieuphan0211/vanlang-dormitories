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
import { resendMail } from "@/actions/invoice";

export const ResendMail = ({
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
      resendMail().then((res) => {
        console.log(res);
      });
    });
  };

  return (
    <div className="w-full">
      <Dialog onClose={handleCloseModal} open={true}>
        <div className="fixed left-[50%] top-[50%]  z-50 max-h-[85vh] w-[80vw] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
          <div className="border-b border-stroke dark:border-strokedark">
            <DialogTitle className="!font-bold text-black dark:text-white">
              Gửi lại mail
            </DialogTitle>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="my-6 px-6.5 py-4 text-lg">
              Bạn có chắc chắn muốn gửi lại mail cho những hóa đơn đã hết hạn?
            </p>

            <div className="flex w-full gap-30 border-t border-stroke px-6.5 py-4">
              <CancelButton
                isPending={isPending}
                name="Hủy"
                onClick={handleCloseModal}
              />
              <SaveButton isPending={isPending} name="Gửi lại" />
            </div>
          </form>
        </div>
      </Dialog>
      {/* )} */}
    </div>
  );
};
