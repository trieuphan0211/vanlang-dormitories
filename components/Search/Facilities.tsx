"use client";
import { Button, FormControl, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Branch } from "./Branch";
import { FormSelect } from "../Input";

export const Facilities = ({
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
      facilitiesCode: searchParams.get("facilitiesCode")?.toString() || "",
      branchName: searchParams.get("branchName")?.toString() || "",
      facilitiesTypeCode:
        searchParams.get("facilitiesTypeCode")?.toString() || "",
      facilitiesTypeName:
        searchParams.get("facilitiesTypeName")?.toString() || "",
      status: searchParams.get("status")?.toString() || "",
      description: searchParams.get("description")?.toString() || "",
    },
  });
  const onSubmit = (data: {
    facilitiesTypeCode?: String;
    description?: String;
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
        <div className="">
          <label className="mb-2 text-sm" htmlFor="">
            Mã cơ sở vật chất
          </label>
          <TextField {...register("facilitiesCode")} fullWidth size="small" />
        </div>
        <div className="">
          <label className="mb-2 text-sm" htmlFor="">
            Trạng thái
          </label>
          <FormSelect
            name="status"
            control={control}
            isPending={false}
            facilifiesStatus={[
              "ACTIVE",
              "INACTIVE",
              "MAINTENANCE",
              "LIQUIDATION",
            ]}
            placeholder={"Chọn chi nhánh"}
            size="small"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-2 text-sm" htmlFor="">
            Chi nhánh
          </label>
          <TextField {...register("branchName")} fullWidth size="small" />
        </div>
        <div className="">
          <label className="mb-2 text-sm" htmlFor="">
            Mã loại cơ sở vật chất
          </label>
          <TextField
            {...register("facilitiesTypeCode")}
            fullWidth
            size="small"
          />
        </div>{" "}
        <div className="">
          <label className="mb-2 text-sm" htmlFor="">
            Tên loại cơ sở vật chất
          </label>
          <TextField
            {...register("facilitiesTypeName")}
            fullWidth
            size="small"
          />
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
            handleReset(
              "facilitiesCode,branchName,facilitiesTypeCode,facilitiesTypeName,status,description",
            );
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
