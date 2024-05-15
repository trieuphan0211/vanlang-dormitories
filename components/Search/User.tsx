"use client";
import { Button, FormControl, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FormSelect } from "../Input";

export const User = ({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      role: searchParams.get("role")?.toString() || "",
      email: searchParams.get("email")?.toString() || "",
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
        <div className="">
          <label className="mb-2 text-sm" htmlFor="">
            Email
          </label>
          <TextField {...register("email")} fullWidth size="small" />
        </div>
        <div>
          <label className="mb-2 text-sm" htmlFor="">
            Quyền
          </label>
          <FormSelect
            name="role"
            control={control}
            isPending={false}
            facilifiesStatus={["ADMIN", "DIRECTOR", "STAFF", "USER"]}
            errors={errors?.role}
            placeholder={"Chọn vai trò"}
            disabled={false}
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
            handleReset("role,email");
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
