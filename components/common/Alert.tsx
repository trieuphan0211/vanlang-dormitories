"use client";
import React, { useEffect } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { alertSeletor } from "@/lib/features/alert/alert-selector";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";

export const Alert = () => {
  const { status, message } = useAppSelector(alertSeletor);
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
        <AlertDialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.4)]   data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
          <AlertDialog.Title className=" text-center font-medium text-black dark:text-white">
            {message.type === "success" ? "Success" : "Error"}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-center">
            {message.content}
          </AlertDialog.Description>
          <AlertDialog.Cancel asChild>
            <button
              className="mx-auto flex justify-center rounded bg-primary px-5 py-2 font-medium text-gray hover:bg-opacity-90"
              aria-label="Close"
              onClick={handleDelete}
            >
              Save
            </button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
