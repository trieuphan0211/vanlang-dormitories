"use client";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";

export const DialogButton = ({
  open,
  setOpen,
  childrens,
}: {
  open: boolean;
  setOpen: Function;
  childrens: React.ReactNode;
}) => {
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <div className="">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-full items-center justify-center text-nowrap rounded-md bg-primary px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        <IoAdd className="text-2xl" />
        Thêm
      </button>

      {open && (
        <Dialog onClose={handleCloseModal} open={true}>
          {childrens}
        </Dialog>
      )}
    </div>
  );
};
