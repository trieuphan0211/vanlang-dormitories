"use client";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
        <button
          className={clsx(
            "flex  items-center justify-center rounded-md p-1 px-2 ",
            {
              "cursor-pointer hover:bg-primary hover:text-white":
                searchParams.get("page") !== "1",
            },
          )}
          disabled={searchParams.get("page") === "1"}
          onClick={() =>
            handlePage(String(Number(searchParams.get("page")) - 1))
          }
        >
          <svg
            className="fill-current"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z"
              fill=""
            />
          </svg>
        </button>
        {Array.from({ length: pageNumber }).map((_, index) => (
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
        ))}

        <button
          className={clsx(
            "flex  items-center justify-center rounded-md p-1 px-2 ",
            {
              "cursor-pointer hover:bg-primary hover:text-white":
                searchParams.get("page") !== String(pageNumber),
            },
          )}
          onClick={() =>
            handlePage(String(Number(searchParams.get("page")) + 1))
          }
          disabled={searchParams.get("page") === String(pageNumber)}
        >
          <svg
            className="fill-current"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z"
              fill=""
            />
          </svg>
        </button>
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
                    value="5"
                  >
                    <Select.ItemText>5</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    className="cursor-pointer px-2 hover:bg-gray"
                    value="10"
                  >
                    <Select.ItemText>10</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    className="cursor-pointer px-2 hover:bg-gray"
                    value="15"
                  >
                    <Select.ItemText>15</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    className="cursor-pointer px-2 hover:bg-gray"
                    value="20"
                  >
                    <Select.ItemText>20</Select.ItemText>
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
