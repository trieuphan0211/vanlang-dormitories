"use client";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FormSelect } from "../Input";

export const Register = ({
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
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      roomCode: searchParams.get("roomCode")?.toString() || "",
      branchName: searchParams.get("branchName")?.toString() || "",
      year: searchParams.get("year")?.toString() || "",
      date: searchParams.get("date")?.toString() || "",
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
            Mã phòng
          </label>
          <TextField
            {...register("roomCode")}
            fullWidth
            size="small"
            // type="number"
          />
        </div>
        <div>
          <label className="mb-2 text-sm" htmlFor="">
            Thời hạn đăng ký
          </label>
          <FormSelect
            name="year"
            control={control}
            isPending={false}
            years={[0.5, 1, 2, 3]}
            errors={errors?.year}
            size="small"
            placeholder={"Chọn năm đăng ký"}
            //   defaultValue={year}
            disabled={false}
          />
        </div>
        <div className="col-span-2">
          <label className="mb-2 text-sm" htmlFor="">
            Tên chi nhánh
          </label>
          <TextField
            {...register("branchName")}
            fullWidth
            size="small"
            // type="number"
          />
        </div>
        {/* <div className="col-span-2">
          <label className="mb-2 text-sm" htmlFor="">
            Ngày
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
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
                onChange={(date) =>
                  setValue("date", date?.format("MM/DD/YYYY") || "")
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </div> */}
      </div>
      <div className="flex justify-end gap-5">
        <input type="submit" className="hidden" ref={submitRef} />
        <Button
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            handleReset("roomCode,branchName,year,date");
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
