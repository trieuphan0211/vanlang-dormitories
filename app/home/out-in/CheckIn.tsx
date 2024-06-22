"use client";

import { addCheckInOut } from "@/actions/inOut";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { alertSeletor } from "@/lib/features/alert/alert-selector";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { checkKeyIn, checkKeyOut } from "@/lib/generateKeyInOut";
import { Dialog, DialogTitle } from "@mui/material";
import { Student } from "@prisma/client";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const CheckIn = ({
  student,
  open,
  setOpen,
}: {
  student: Student;
  open: boolean;
  setOpen: Function;
}) => {
  const [qr, setQr] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isPending, startTransition] = useTransition();
  const { message } = useAppSelector(alertSeletor);
  useEffect(() => {
    if (qr === "") return;
    if (message.type) return;
    startTransition(async () => {
      try {
        const qrs = JSON.parse(qr);
        if (qrs.type === "in") {
          checkKeyIn(qrs.key).then(async (res) => {
            if (res?.success) {
              console.log({
                studentId: student.id,
                status: "IN",
              });
              await addCheckInOut({
                studentId: student.id,
                status: "IN",
              });
              router.refresh();

              dispatch(
                alertManagerActions.setAlert({
                  message: {
                    type: "success",
                    content: "Đã Check in thành công!",
                  },
                }),
              );
            } else {
              dispatch(
                alertManagerActions.setAlert({
                  message: {
                    type: "error",
                    content: "Có lỗi xảy ra! Vui lòng thử lại!",
                  },
                }),
              );
            }
          });
          await new Promise(() => {
            setTimeout(() => {
              setQr("");
            }, 1000);
          });
        }
        if (qrs.type === "out") {
          checkKeyOut(qrs.key).then(async (res) => {
            if (res) {
              await addCheckInOut({
                studentId: student.id,
                status: "OUT",
              });
              router.refresh();
              // handleCloseModal();
              dispatch(
                alertManagerActions.setAlert({
                  message: {
                    type: "success",
                    content: "Đã Check out thành công!",
                  },
                }),
              );
            } else {
              dispatch(
                alertManagerActions.setAlert({
                  message: {
                    type: "error",
                    content: "Có lỗi xảy ra! Vui lòng thử lại!",
                  },
                }),
              );
            }
          });
          await new Promise(() => {
            setTimeout(() => {
              setQr("");
            }, 1000);
          });
        }
      } catch (error) {
        dispatch(
          alertManagerActions.setAlert({
            message: {
              type: "error",
              content: "Có lỗi xảy ra! Vui lòng thử lại123!",
            },
          }),
        );
        setQr("");
      }
    });
  }, [qr, isPending, student, router, dispatch, startTransition, message.type]);
  const handleCloseModal = () => {
    setOpen(false);
    setQr("");
  };
  return (
    <div>
      {open && (
        <Dialog onClose={handleCloseModal} open={open}>
          <div className="fixed left-[50%]  top-[50%] z-[2] max-h-[85vh]  max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
            <div className="border-b border-stroke dark:border-strokedark">
              <DialogTitle className="font-medium text-black dark:text-white">
                Quét mã QR
              </DialogTitle>
            </div>

            <form>
              <div
                style={{
                  width: 400,
                  height: 400,
                  margin: "auto",
                }}
              >
                <Scanner
                  onResult={(text, result) => {
                    if (!text) return;
                    console.log("text:", text);
                    setQr(text);
                  }}
                  components={{
                    // count: true,
                    // audio: true,
                    // tracker: true,
                    // torch: true,
                    onOff: true,
                  }}
                  options={{
                    deviceId: "",
                    // delayBetweenScanAttempts: 100,
                    // delayBetweenScanSuccess: 100,
                    constraints: {
                      facingMode: "environment",
                    },
                  }}
                  onError={(error) => console.log(error?.message)}
                />
              </div>
              <div className="border-t border-stroke px-6.5 py-4">
                <button
                  onClick={() => setOpen(false)}
                  className="flex w-full justify-center rounded bg-graydark p-3 font-medium text-gray hover:bg-opacity-90"
                  aria-label="Close"
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
};
