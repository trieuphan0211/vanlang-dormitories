"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Result } from "@zxing/library";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { QrReader } from "../scanner/Scanner";

export const ScanQrCode = ({
  setQr,
  open,
  setOpen,
}: {
  setQr: Function;
  open: boolean;
  setOpen: Function;
}) => {
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center text-nowrap rounded-md bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <IoAdd className="text-2xl" />
          Thêm
        </button>
      </Dialog.Trigger>
      {open && (
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 bg-[rgba(0,0,0,0.4)]   data-[state=open]:animate-overlayShow"
            onClick={handleCloseModal}
          />
          <Dialog.Content className="fixed left-[50%]  top-[50%] z-[2] max-h-[85vh]  max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow md:max-w-[80vw]">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <Dialog.Title className="font-medium text-black dark:text-white">
                Quét mã QR
              </Dialog.Title>
            </div>

            <Dialog.Description className=""></Dialog.Description>
            <form>
              <QrReader
                onResult={(
                  result: Result | undefined | null,
                  error: Error | undefined | null,
                ) => {
                  if (!!result) {
                    if (Object.keys(result).length > 0) {
                      setQr(result.getText());
                      setOpen(false);
                    }
                  }

                  if (!!error) {
                  }
                }}
                scanDelay={1000}
                // style={{ width: "100%" }}
              />
              <div className="border-t border-stroke px-6.5 py-4">
                <button
                  //   disabled={isPending}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  aria-label="Close"
                >
                  Lưu
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};
