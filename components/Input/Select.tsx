import {
  BRANCH,
  FACILITIESTYPE,
  ROOM,
  ROOMTYPE,
  SERVICES,
  STUDENT,
} from "@/types";
import { Box, Chip, OutlinedInput } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import clsx from "clsx";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const FormSelect = ({
  errors,
  control,
  placeholder,
  isPending,
  name,
  branchs,
  roomTypes,
  facilitiesType,
  services,
  facilifiesStatus,
  rooms,
  month,
  number,
  registerStatus,
  years,
  defaultValue,
  students,
  disabled,
  size,
}: {
  errors?: { message?: string };
  control?: any;
  placeholder?: string;
  isPending: boolean;
  name: string;
  branchs?: BRANCH[];
  roomTypes?: ROOMTYPE[];
  services?: SERVICES[];
  facilitiesType?: FACILITIESTYPE[];
  facilifiesStatus?: string[];
  rooms?: ROOM[];
  month?: string[];
  registerStatus?: string[];
  years?: number[];
  number?: number;
  defaultValue?: string;
  students?: STUDENT[];
  disabled?: boolean;
  size?: "small" | "medium";
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            fullWidth
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={isPending || disabled}
            error={errors?.message ? true : false}
            sx={{ fontSize: "16px" }}
            size={size ? size : "medium"}
          >
            {branchs &&
              branchs.map((branch, key) => (
                <MenuItem key={key} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            {number &&
              Array.from(Array(number).keys()).map((item, key) => (
                <MenuItem key={key} value={item + 1}>
                  {item + 1}
                </MenuItem>
              ))}
            {students &&
              students.map((student, key) => (
                <MenuItem key={key} value={student.id}>
                  {student.fullName}
                </MenuItem>
              ))}
            {roomTypes &&
              roomTypes.map((roomType, key) => (
                <MenuItem key={key} value={roomType.code}>
                  {roomType.name}
                </MenuItem>
              ))}
            {registerStatus &&
              registerStatus.map((registerStatus, key) => (
                <MenuItem key={key} value={registerStatus}>
                  {registerStatus === "0" && "Đang chờ"}
                  {registerStatus === "1" && "Đã duyệt"}
                  {registerStatus === "2" && "Đã hủy"}
                </MenuItem>
              ))}
            {facilifiesStatus &&
              facilifiesStatus.map((facilifiesStatus, key) => (
                <MenuItem key={key} value={facilifiesStatus}>
                  {facilifiesStatus === "ACTIVE" && "Hoạt động"}
                  {facilifiesStatus === "INACTIVE" && "Ngưng hoạt động"}
                  {facilifiesStatus === "MAINTENANCE" && "Bảo trì"}
                  {facilifiesStatus === "LIQUIDATION" && "Thanh lý"}
                  {facilifiesStatus === "CREATED" && "Đã tạo"}
                  {facilifiesStatus === "INPROGRESS" && "Đang xử lý"}
                  {facilifiesStatus === "FINISHED" && "Hoàn thành"}
                  {facilifiesStatus === "ADMIN" && "Quản trị viên"}
                  {facilifiesStatus === "DIRECTOR" && "Giám đốc"}
                  {facilifiesStatus === "STAFF" && "Nhân viên"}
                  {facilifiesStatus === "USER" && "Người dùng"}
                  {facilifiesStatus === "0" && "Chưa thanh toán"}
                  {facilifiesStatus === "1" && "Đã thanh toán"}
                  {facilifiesStatus === "2" && "Đã hủy"}
                </MenuItem>
              ))}
            {month &&
              month.map((month, key) => (
                <MenuItem key={key} value={month}>
                  {"Tháng " + month}
                </MenuItem>
              ))}
            {facilitiesType &&
              facilitiesType.map((facilitiesType, key) => (
                <MenuItem key={key} value={facilitiesType.code}>
                  {facilitiesType.name}
                </MenuItem>
              ))}
            {services &&
              services.map((service, key) => (
                <MenuItem key={key} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            {rooms &&
              rooms.map((room, key) => (
                <MenuItem key={key} value={room.id}>
                  {room?.roomType?.name} - {room.code}
                </MenuItem>
              ))}
            {years &&
              years.map((year, key) => (
                <MenuItem key={key} value={year}>
                  {year} năm
                </MenuItem>
              ))}
          </Select>
        )}
      />

      <p
        className={clsx(
          `font-smblock mt-1 text-sm text-black dark:text-white`,
          {
            "text-red": errors?.message,
          },
        )}
      >
        {errors?.message}
      </p>
    </>
  );
};
export const FormSelectMultiple = ({
  errors,
  placeholder,
  isPending,
  register,
  services,
  defaultValue,
  disabled,
}: {
  errors?: { message?: string };
  placeholder?: string;
  isPending: boolean;
  register: any;
  services: SERVICES[];
  defaultValue?: string[];
  disabled?: boolean;
}) => {
  const [personName, setPersonName] = useState<string[]>(defaultValue || []);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };
  return (
    <>
      <Select
        {...register}
        fullWidth
        multiple
        placeholder={placeholder}
        disabled={isPending || disabled}
        value={personName}
        error={errors?.message}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected: String[]) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value, index) => (
              <Chip
                key={index}
                label={services.filter((e) => e.id === value)[0].name}
              />
            ))}
          </Box>
        )}
      >
        {services &&
          services.map((service, key) => (
            <MenuItem key={key} value={service.id}>
              {service.name}
            </MenuItem>
          ))}
      </Select>
      <p
        className={clsx(
          `font-smblock mt-1 text-sm text-black dark:text-white`,
          {
            "text-red": errors?.message,
          },
        )}
      >
        {errors?.message}
      </p>
    </>
  );
};
