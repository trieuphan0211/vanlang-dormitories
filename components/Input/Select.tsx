import { BRANCH, FACILITIESTYPE, ROOM, ROOMTYPE, SERVICES } from "@/types";
import { Box, Chip, OutlinedInput } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import clsx from "clsx";
import { useState } from "react";

export const FormSelect = ({
  errors,
  placeholder,
  isPending,
  register,
  branchs,
  roomTypes,
  facilitiesType,
  services,
  facilifiesStatus,
  rooms,
  month,
  defaultValue,
  disabled,
}: {
  errors?: { message?: string };
  placeholder?: string;
  isPending: boolean;
  register: any;
  branchs?: BRANCH[];
  roomTypes?: ROOMTYPE[];
  services?: SERVICES[];
  facilitiesType?: FACILITIESTYPE[];
  facilifiesStatus?: string[];
  rooms?: ROOM[];
  month?: string[];
  defaultValue?: string;
  disabled?: boolean;
}) => {
  return (
    <>
      <Select
        {...register}
        fullWidth
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={isPending || disabled}
        error={errors?.message}
      >
        {branchs &&
          branchs.map((branch, key) => (
            <MenuItem key={key} value={branch.id}>
              {branch.name}
            </MenuItem>
          ))}

        {roomTypes &&
          roomTypes.map((roomType, key) => (
            <MenuItem key={key} value={roomType.code}>
              {roomType.name}
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
