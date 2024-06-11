"use client";

import { addCheckInOut } from "@/actions/inOut";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { alertSeletor } from "@/lib/features/alert/alert-selector";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { checkKeyIn, checkKeyOut } from "@/lib/generateKeyInOut";
import { Student } from "@prisma/client";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const CheckIn = ({ student }: { student: Student }) => {
  const [qr, setQr] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { message } = useAppSelector(alertSeletor);
  useEffect(() => {
    if (qr === "") return;
    if (message.type) return;
    startTransition(async () => {
      try {
        const qrs = JSON.parse(qr);
        console.log(qrs);
        if (qrs.type === "in") {
          checkKeyIn(qrs.key).then(async (res) => {
            if (res?.success) {
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
  }, [qr, isPending, student, router, dispatch, startTransition]);

  return (
    <div className="relative">
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
    </div>
  );
};
