"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { FaAngleDown } from "react-icons/fa6";
import { AdvancedSearch } from "../Dialog/AdvancedSearch";
import { useState } from "react";
import clsx from "clsx";

export const SearchTable = ({ placeholder }: { placeholder: string }) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <div className="relative flex w-1/2 rounded-md border border-stroke bg-transparent px-5 py-2.5">
      <input
        className="w-full outline-none focus:border-primary"
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <button
        className={clsx("transition-all", {
          "rotate-180 text-primary": open,
        })}
        onClick={() => setOpen(!open)}
      >
        <FaAngleDown />
      </button>
      <div
        className={clsx(
          "absolute left-0 top-[50px] w-full rounded-xl bg-white p-5 shadow-14",
          {
            hidden: !open,
            "animate-bottomtop": open,
          },
        )}
      >
        <AdvancedSearch />
      </div>
    </div>
  );
};
