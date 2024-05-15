"use client";
import { Button, FormControl, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

export const Service = ({
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
      cost: searchParams.get("cost")?.toString() || "",
      unit: searchParams.get("unit")?.toString() || "",
      description: searchParams.get("description")?.toString() || "",
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
            Giá
          </label>
          <TextField
            {...register("cost")}
            fullWidth
            size="small"
            type="number"
          />
        </div>
        <div>
          <label className="mb-2 text-sm" htmlFor="">
            Đơn vị
          </label>
          <TextField {...register("unit")} fullWidth size="small" />
        </div>
        <div className="col-span-2">
          <label className="mb-2 text-sm" htmlFor="">
            Mô tả
          </label>
          <TextField
            multiline
            rows={3}
            {...register("description")}
            fullWidth
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
            handleReset("cost,unit,description");
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
