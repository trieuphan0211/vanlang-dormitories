import clsx from "clsx";
import React from "react";

export const SaveButton = ({
  isPending,
  name,
  onClick,
  disabled,
}: {
  isPending: boolean;
  name: string;
  onClick?: Function;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={isPending}
      onClick={() => onClick && onClick()}
      className={clsx(
        "flex w-full justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90",
        {
          "pointer-events-none !bg-[rgba(0,0,0,0.5)]": disabled,
        },
      )}
      aria-label="Close"
    >
      {name}
    </button>
  );
};
