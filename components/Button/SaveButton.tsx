import React from "react";

export const SaveButton = ({
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
      onClick={() => onClick && onClick()}
      className="flex w-full justify-center rounded bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90"
      aria-label="Close"
    >
      {name}
    </button>
  );
};
