"use client";
import { Button, FormControl, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FormSelect } from "../Input";

export const Invoice = ({
  setOpen,
  handleSearch,
  handleReset,
}: {
  setOpen: Function;
  handleSearch: Function;
  handleReset: Function;
}) => {
  const submitRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      roomCode: searchParams.get("roomCode")?.toString() || "",
      branchName: searchParams.get("branchName")?.toString() || "",
      status: searchParams.get("status")?.toString() || "",
    },
  });
  const onSubmit = (data: {
    roomCode?: String;
    branchName?: String;
    status?: String;
  }) => {
    handleSearch({ ...data, term: searchParams.get("query")?.toString() });
    setOpen(false);
  };

  const handleSubmitForm = () => {
    submitRef.current?.click();
  };
  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h4 className="font-medium">Tìm kiếm nâng cao</h4>
      <div className="my-5 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 text-sm" htmlFor="">
            Mã phòng
          </label>
          <TextField {...register("roomCode")} fullWidth size="small" />
        </div>
        <div>
          <label className="mb-2 text-sm" htmlFor="">
            Trạng thái
          </label>
          <FormSelect
            name="status"
            control={control}
            isPending={false}
            facilifiesStatus={["0", "1", "2"]}
            size="small"
            // errors={errors?.status}
            placeholder={"Chọn trạng thái"}
            // disabled={type === "detail" ? true : null || isPending}
          />
        </div>
        <div className="col-span-2">
          <label className="mb-2 text-sm" htmlFor="">
            Tên chi nhánh
          </label>
          <TextField
            {...register("branchName")}
            fullWidth
            // type="number"
            size="small"
          />
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <input type="submit" className="hidden" ref={submitRef} />
        <Button
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            handleReset("roomCode,branchName,status");
            reset();
            setOpen(false);
          }}
        >
          hủy
        </Button>
        <Button variant="contained" onClick={handleSubmitForm}>
          tìm kiếm
        </Button>
      </div>
    </form>
  );
};
