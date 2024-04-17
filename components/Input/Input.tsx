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
        disabled={disabled || isPending}
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
