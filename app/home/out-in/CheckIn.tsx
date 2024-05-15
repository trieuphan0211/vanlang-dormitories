"use client";

import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { checkKeyIn, checkKeyOut } from "@/lib/generateKeyInOut";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { TfiReload } from "react-icons/tfi";

export const CheckIn = () => {
  const [qr, setQr] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (qr === "") return;
    startTransition(() => {
      try {
        const qrs = JSON.parse(qr);
        console.log(qrs);
        if (qrs.type === "in") {
          checkKeyIn(qrs.key).then((res) => {
            if (res?.success) {
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
          setQr("");
        }
        if (qrs.type === "out") {
          checkKeyOut(qrs.key).then((res) => {
            if (res) {
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
          setQr("");
        }
      } catch (error) {
        dispatch(
          alertManagerActions.setAlert({
            message: {
              type: "error",
              content: "Có lỗi xảy ra! Vui lòng thử lại!",
            },
          }),
        );
        setQr("");
      }
    });
  }, [qr]);
  const handleOpen = () => {
    setOpen(false);
    setTimeout(() => {
      setOpen(true);
    }, 2000);
  };
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
