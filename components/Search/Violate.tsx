"use client";
import { Button, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export const Violate = ({
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
      studentName: searchParams.get("studentName")?.toString() || "",
      studentCode: searchParams.get("studentCode")?.toString() || "",
      email: searchParams.get("email")?.toString() || "",
    },
  });
  const onSubmit = (data: {
    studentName?: String;
    studentCode?: String;
    email?: String;
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
            Tên sinh viên
          </label>
          <TextField {...register("studentName")} fullWidth size="small" />
        </div>
        <div>
          <label className="mb-2 text-sm" htmlFor="">
            Mã sinh viên
          </label>
          <TextField
            {...register("studentCode")}
            fullWidth
            // type="number"
            size="small"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-2 text-sm" htmlFor="">
            Email
          </label>
          <TextField
            {...register("email")}
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
            handleReset("studentName,studentCode,email");
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
