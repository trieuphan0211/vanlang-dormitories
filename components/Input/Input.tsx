import TextField from "@mui/material/TextField";
import clsx from "clsx";

export const Input = ({
  type,
  errors,
  placeholder,
  isPending,
  register,
  multiline,
  rows,
  required,
  value,
  disabled,
  size,
}: {
  type: string;
  errors?: { message?: string };
  placeholder?: string;
  isPending: boolean;
  register: any;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  size?: "small" | "medium";
}) => {
  return (
    <>
      <TextField
        type={type}
        variant="outlined"
        placeholder={placeholder}
        fullWidth
        value={value}
        error={errors ? true : false}
        {...register}
        required={required}
        multiline={multiline}
        rows={rows}
        size={size ? size : "medium"}
        disabled={disabled || isPending}
        sx={{
          background: "#f5f7f9",

          "& .MuiInputBase-root input,& .MuiInputBase-root textarea": {
            borderRadius: "5px",
            color: "#212529",
            "&:focus": {
              boxShadow: "0 0 0 .25rem rgba(13,110,253,.25)",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputBase-root": {
            padding: 0,
            "& textarea": {
              padding: "16px 14px",
            },
          },
        }}
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
