"use client";
import { changeStatusInvoiceById } from "@/actions/invoice";
import { removeRoomOfStudent } from "@/actions/student";
import { changeStatusViolateById } from "@/actions/violate";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { Dialog, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";

export const CheckInvoice = ({
  isPending,
  title,
  invoiceId,
  violateId,
  studentId,
  startTransition,
  setState,
  type,
}: {
  isPending: boolean;
  title: string;
  invoiceId?: string;
  violateId?: string;
  studentId?: string;
  startTransition: Function;
  setState: Function;
  type?: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    setState(false);
  };
  const handleComfirm = () => {
    startTransition(() => {
      if (invoiceId) {
        changeStatusInvoiceById(invoiceId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
            // Show alert

            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Đã xác nhận hóa đơn đã thanh toán!",
                },
              }),
            );
          }
          if (res.error) {
            router.refresh();
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Đã xảy ra lỗi, vui lòng thử lại!",
                },
              }),
            );
          }
        });
      }
      if (violateId) {
        changeStatusViolateById(violateId).then((res) => {
          if (res.success) {
            // Refesh data
            router.refresh();
            setState(false);
            // Show alert

            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "success",
                  content: "Đã xác nhận vi phạm hoàn thành!",
                },
              }),
            );
          }
          if (res.error) {
            router.refresh();
            dispatch(
              alertManagerActions.setAlert({
                message: {
                  type: "error",
                  content: "Đã xảy ra lỗi, vui lòng thử lại!",
                },
              }),
            );
          }
        });
      }
      if (studentId) {
        switch (type) {
          case "removeRoom":
            removeRoomOfStudent(studentId).then((res) => {
              if (res.success) {
                // Refesh data
                router.refresh();
                setState(false);
                // Show alert
                dispatch(
                  alertManagerActions.setAlert({
                    message: {
                      type: "success",
                      content: "Đã xác nhận sinh viên rời phòng!",
                    },
                  }),
                );
              }
              if (res.error) {
                router.refresh();
                dispatch(
                  alertManagerActions.setAlert({
                    message: {
                      type: "error",
                      content: "Đã xảy ra lỗi, vui lòng thử lại!",
                    },
                  }),
                );
              }
            });
            break;
        }
      }
    });
  };
  return (
    <div className="w-full">
      <Dialog onClose={handleCloseModal} open={true}>
        <div className="fixed left-[50%] top-[50%]  z-50 max-h-[85vh]  max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <DialogTitle className="font-semibold text-black dark:text-white">
              {title || " Are you sure you want to delete ?"}
            </DialogTitle>
          </div>

          <p className="my-6 px-6.5 py-4">
            Hành động này sẽ xác nhận hóa đơn đã thanh toán và không thể hoàn
            tác. Bạn có chắc chắn muốn thực hiện hành động này không?
          </p>
          <div className="flex justify-end gap-[25px]">
            <button
              onClick={() => setState(false)}
              disabled={isPending}
              className="bg-gray-4 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none text-graydark outline-none hover:bg-gray-2 focus:shadow-[0_0_0_2px] focus:shadow-gray-3"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleComfirm}
              disabled={isPending}
              className="disabled:bg-slate- inline-flex h-[35px] items-center justify-center rounded-[4px] bg-rose-100 px-[15px] font-medium leading-none text-rose-600 outline-none hover:bg-rose-200 focus:shadow-[0_0_0_2px] focus:shadow-rose-200"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </Dialog>
      {/* )} */}
    </div>
  );
};
