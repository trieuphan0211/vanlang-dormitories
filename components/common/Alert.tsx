"use client";
import React, { useEffect } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { alertSeletor } from "@/lib/features/alert/alert-selector";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

export const Alert = () => {
  const { message } = useAppSelector(alertSeletor);
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(
      alertManagerActions.setAlert({
        message: {
          type: null,
          content: "",
        },
      }),
    );
  }
  return (
    <AlertDialog.Root open={message.type ? true : false}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-9999 bg-[rgba(0,0,0,0.4)]   data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed left-[50%] top-[50%] z-9999 max-h-[85vh]   w-[500px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <div className=" flex justify-center">
            {message.type === "success" && (
              <IoCheckmarkCircleOutline className="text-[80px] text-green-600" />
            )}
            {message.type === "error" && (
              <MdOutlineErrorOutline className="text-[80px] text-rose-600" />
            )}
            {message.type === "warning" && (
              <IoWarningOutline className="text-[80px] text-yellow-600" />
            )}
          </div>

          <AlertDialog.Description className="mb-2 text-center text-2xl font-bold">
            {message.type === "success" && "Thành công!"}
            {message.type === "error" && "Lỗi!"}
            {message.type === "warning" && "Cảnh báo!"}
          </AlertDialog.Description>
          <p className="mb-5 text-center text-xl">{message.content}</p>
          <AlertDialog.Cancel asChild>
            <button
              className="mx-auto flex w-[40%] justify-center rounded bg-primary px-5 py-2 font-medium text-gray hover:bg-opacity-90"
              aria-label="Close"
              onClick={handleDelete}
            >
              OK
            </button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
