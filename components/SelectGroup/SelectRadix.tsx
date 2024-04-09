import * as Select from "@radix-ui/react-select";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";

export const SelectRadix = ({
  items,
}: {
  items: { id: string; name: string }[];
}) => {
  return (
    <Select.Root>
      <Select.Trigger
        className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        aria-label="branchId"
      >
        <Select.Value placeholder="Chọn chi nhánh" />
        <Select.Icon className="text-black">
          <IoChevronDownCircleOutline />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-10 w-full overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex  cursor-default items-center justify-center bg-white text-black">
            <IoChevronUpCircleOutline />
          </Select.ScrollUpButton>
          <Select.Viewport className=" p-[5px]">
            <Select.Group className="z-10">
              {items.map((item, index) => (
                <Select.Item
                  value={item.id}
                  className="px-5 py-3 hover:cursor-pointer hover:bg-gray"
                  key={index}
                >
                  <Select.ItemText>{item.name}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
