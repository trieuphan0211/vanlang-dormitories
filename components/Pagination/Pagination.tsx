"use client";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination as Pag } from "@mui/material";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";

export const Pagination = ({ count }: { count: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pageNumber =
    Math.ceil(count / Number(searchParams.get("entries") || 10)) || 1;
  function handlePage(page?: string, entries?: string) {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page);
    }
    if (entries) {
      params.set("page", "1");
      params.set("entries", entries);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="my-5 flex w-full justify-between">
      <div className="flex">
        <Pag
          count={pageNumber}
          variant="outlined"
          color="secondary"
          defaultPage={Number(searchParams.get("page") || 1)}
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            handlePage(String(value))
          }
        />
        {/* {Array.from({ length: pageNumber }).map((_, index) => (
          <button
            className={clsx(
              "mx-1 flex cursor-pointer items-center justify-center rounded-md  p-1 px-3  hover:bg-primary hover:text-white",
              {
                "bg-primary text-white":
                  searchParams.get("page") === String(index + 1) ||
                  (searchParams.get("page") === null && index + 1 === 1),
              },
            )}
            onClick={() => handlePage(String(index + 1))}
            key={index}
            disabled={
              searchParams.get("page") === String(index + 1) ||
              (searchParams.get("page") === null && index + 1 === 1)
            }
          >
            {index + 1}
          </button>
        ))} */}
      </div>
      <div className="flex items-center gap-2">
        <Select.Root
          defaultValue={"10"}
          onValueChange={(e) => handlePage("", e)}
        >
          <Select.Trigger
            className=" data-[placeholder]:text-violet9 inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none "
            aria-label="Entries"
          >
            <Select.Value />
            <Select.Icon className="text-violet11">
              <IoChevronDownCircleOutline />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
              <Select.ScrollUpButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
                <IoChevronUpCircleOutline />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-[5px]">
                <Select.Group>
                  <Select.Item
                    className="cursor-pointer px-2 hover:bg-gray"
                    value="10"
                  >
                    <Select.ItemText>10</Select.ItemText>
                  </Select.Item>

                  <Select.Item
                    className="cursor-pointer px-2 hover:bg-gray"
                    value="25"
                  >
                    <Select.ItemText>25</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    className="cursor-pointer px-2 hover:bg-gray"
                    value="50"
                  >
                    <Select.ItemText>50</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    className="cursor-pointer px-2 hover:bg-gray"
                    value="100"
                  >
                    <Select.ItemText>100</Select.ItemText>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <p className="font-medium">
          Hiển thị {searchParams.get("page") || 1} trên {pageNumber} trang
        </p>
      </div>
    </div>
  );
};
