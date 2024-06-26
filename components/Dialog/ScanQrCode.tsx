"use client";
import { Dialog, DialogTitle } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { BiQrScan } from "react-icons/bi";

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
    setQr("");
  };
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="group relative flex h-10 w-44 cursor-pointer items-center rounded-lg border border-primary bg-primary text-white hover:bg-primary active:border-primary active:bg-primary"
      >
        <span className="text-gray-200 ml-8 transform font-semibold transition-all duration-300 group-hover:translate-x-20">
          Thêm CSVC
        </span>
        <span className="absolute right-0 flex h-full w-10 transform items-center justify-center rounded-lg bg-primary transition-all duration-300 group-hover:w-full group-hover:translate-x-0">
          <BiQrScan className="text-2xl" />
        </span>
      </button>

      {/* <button className="inline-flex items-center justify-center text-nowrap rounded-md bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
        <IoAdd className="text-2xl" />
        Thêm CSVC
      </button> */}

      {open && (
        <Dialog onClose={handleCloseModal} open={open}>
          <div className="fixed left-[50%] top-[50%] z-[2]   max-h-[85vh] max-w-[450px] translate-x-[-50%]  translate-y-[-50%] overflow-auto rounded-[6px] bg-white p-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow sm:w-[95vw] sm:max-w-[95vw] md:max-w-[80vw]">
            <div className="border-b border-stroke dark:border-strokedark">
              <DialogTitle className="font-medium text-black dark:text-white">
                Quét mã QR
              </DialogTitle>
            </div>

            <form>
              <div className="m-auto h-[400px] w-[400px] sm:w-full">
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
