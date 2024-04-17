"use client";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchTable } from "@/components/Search/SearchTable";
import { INVOICE } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { RemoveItem } from "../Dialog/RemoveItem";
import { FaCheck } from "react-icons/fa6";
import { CheckInvoice } from "../Dialog/CheckInvoice";

export const InvoiceTable = ({
  invoices,
  count,
}: {
  invoices: INVOICE[];
  count?: number;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex w-full  gap-3">
        <SearchTable placeholder="Tìm kiếm loại cơ sở vật chất ..." />
        <button
          onClick={() => router.push("/admin/invoice/create")}
          className="inline-flex h-[45px] items-center justify-center text-nowrap rounded-md bg-primary px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <IoAdd className="text-2xl" />
          Lập hóa đơn
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                #
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Phòng
              </th>

              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Chi nhánh
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Tháng
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Tổng tiền
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Trạng thái
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Hoạt động
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, key) => {
              return (
                <tr
                  key={key}
                  className="border-b border-stroke dark:border-strokedark"
                >
                  <td className="px-4 py-4 text-black dark:text-white">
                    {key + 1}
                  </td>
                  <td className="px-4 py-4 text-black dark:text-white">
                    {invoice.room.code}
                  </td>
                  <td className="px-4 py-4 text-black dark:text-white">
                    {invoice.room.branch.name}
                  </td>
                  <td className="px-4 py-4 text-black dark:text-white">
                    {invoice.invoiceDate}
                  </td>
                  <td className="px-4 py-4 text-black dark:text-white">
                    {invoice.total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    đ
                  </td>
                  <td className="px-4 py-4 text-black dark:text-white">
                    {invoice.status === 1 ? "Đã thanh toán" : "Chưa thanh toán"}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="rounded-xl p-2 text-green-600 shadow-14 hover:bg-gray-3 focus:outline-none"
                        onClick={() =>
                          router.push(`/admin/invoice/detail/${invoice.id}`)
                        }
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      {invoice.status === 0 && (
                        <CheckInvoice
                          title={
                            "Bạn có chắc chắn muốn xác nhận hóa đơn này không ?"
                          }
                          startTransition={startTransition}
                          isPending={isPending}
                          invoiceId={invoice.id}
                        />
                      )}
                      <RemoveItem
                        isPending={isPending}
                        startTransition={startTransition}
                        invoiceId={invoice.id}
                        title={"Bạn có chắc chắn muốn xóa hóa đơn này không?"}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {invoices.length > 0 && <Pagination count={count as number} />}
    </div>
  );
};