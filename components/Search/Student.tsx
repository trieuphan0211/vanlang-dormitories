"use client";
import { Button, FormControl, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

export const Student = ({
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

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      studentCode: searchParams.get("studentCode")?.toString() || "",
      email: searchParams.get("email")?.toString() || "",
      gender: searchParams.get("gender")?.toString() || "",
      major: searchParams.get("major")?.toString() || "",
      schoolYear: searchParams.get("schoolYear")?.toString() || "",
    },
  });
  const onSubmit = (data: any) => {
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
            MSSV
          </label>
          <TextField {...register("studentCode")} fullWidth size="small" />
        </div>
        <div>
          <label className="mb-2 text-sm" htmlFor="">
            Giới tính
          </label>
          <TextField {...register("gender")} fullWidth size="small" />
        </div>
        <div className="">
          <label className="mb-2 text-sm" htmlFor="">
            Khoa
          </label>
          <TextField {...register("major")} fullWidth size="small" />
        </div>
        <div className="">
          <label className="mb-2 text-sm" htmlFor="">
            SV năm
          </label>
          <TextField
            {...register("schoolYear")}
            fullWidth
            size="small"
            type="number"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-2 text-sm" htmlFor="">
            Email
          </label>
          <TextField {...register("email")} fullWidth size="small" />
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <input type="submit" className="hidden" ref={submitRef} />
        <Button
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            handleReset("roomTypeCode,members,cost,description");
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
