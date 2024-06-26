"use client";
import { getBranchsAll } from "@/actions/branch";
import BarChart from "@/components/Charts/BarChart";
import { CardData } from "@/components/Dashboard/CardData";
import { FormSelect } from "@/components/Input";
import { BRANCH } from "@/types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiBox } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ branchs, years }: { branchs: BRANCH[]; years: any[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const submitRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback(
    ({
      term,
      branchName,
      startDate,
      finishDate,
    }: {
      term?: string;
      branchName?: string;
      startDate?: string;
      finishDate?: string;
    }) => {
      const params = new URLSearchParams(searchParams);
      term ? params.set("query", term) : params.delete("query");
      branchName
        ? params.set("branchName", branchName)
        : params.delete("branchName");
      startDate
        ? params.set("startDate", startDate)
        : params.delete("startDate");
      finishDate
        ? params.set("finishDate", finishDate)
        : params.delete("finishDate");
      replace(`${pathname}?${params.toString()}`);
    },
    500,
  );

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      branchName: searchParams.get("branchName")?.toString() || "",
      startDate: searchParams.get("startDate")?.toString() || "",
      finishDate: searchParams.get("finishDate")?.toString() || "",
    },
  });
  const { branchName, startDate, finishDate } = watch();

  useEffect(() => {
    handleSearch({
      term: searchParams.get("query")?.toString(),
      branchName,
      startDate: startDate,
      finishDate: finishDate,
    });
  }, [branchName, startDate, handleSearch, searchParams, finishDate]);

  const onSubmit = (data: any) => {
    handleSearch({ ...data, term: searchParams.get("query")?.toString() });
  };

  const handleSubmitForm = () => {
    submitRef.current?.click();
  };

  return (
    <form
      className="flex flex-row gap-4 bg-white p-3 text-black"
      action=""
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-1">
        <label>Chọn chi nhánh:</label>
        <div className="pt-2">
          <FormSelect
            name={"branchName"}
            isPending={false}
            branchs={branchs}
            control={control}
            size="small"
          />
        </div>
      </div>
      <div className="flex-1">
        <label>Ngày bắt đầu:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <Controller
              name="startDate"
              control={control}
              // rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: "40px",
                      "& input": {
                        padding: "8.5px 14px",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": { height: "45px" },
                  }}
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    console.log(date);
                    field.onChange(date);
                  }}
                />
              )}
            />{" "}
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="flex-1">
        <label>Ngày kết thúc:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <Controller
              name="finishDate"
              control={control}
              // rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: "40px",
                      "& input": {
                        padding: "8.5px 14px",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": { height: "45px" },
                  }}
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    console.log(date);
                    field.onChange(date);
                  }}
                />
              )}
            />{" "}
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </form>
  );
};

export default Search;
