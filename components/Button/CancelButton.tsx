import React from "react";

export const CancelButton = ({
  isPending,
  name,
  onClick,
}: {
  isPending: boolean;
  name: string;
  onClick?: Function;
}) => {
  return (
    <button
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      className="flex w-full justify-center rounded bg-red p-3 font-medium text-gray hover:bg-opacity-90"
      aria-label="Close"
    >
      {name}
    </button>
  );
};
