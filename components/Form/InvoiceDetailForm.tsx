"use client";

import { useAppDispatch } from "@/hooks/redux";
import { INVOICE } from "@/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Input } from "../Input";

export const InvoiceDetailForm = ({
  invoice,
  type,
  user,
}: {
  invoice: INVOICE;
  type?: string;
  user?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();
  console.log();
  return (
    <form className="rounded-lg bg-white p-4">
      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="emailAddress"
        >
          Phòng
        </label>
        <Input
          type="text"
          placeholder="Nhập giá tiền"
          isPending={isPending}
          register={{}}
          disabled={true}
          value={invoice?.Room?.code + " - " + invoice.Room?.RoomType?.name}
        />
      </div>
      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="emailAddress"
        >
          Chi nhánh
        </label>
        <Input
          type="text"
          placeholder="Nhập giá tiền"
          isPending={isPending}
          register={{}}
          disabled={true}
          value={invoice?.Room?.Branch?.name}
        />
      </div>
      <div className="mb-5.5">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="emailAddress"
        >
          Trạng thái
        </label>
        <Input
          type="text"
          placeholder="Nhập giá tiền"
          isPending={isPending}
          register={{}}
          disabled={true}
          value={invoice.status === 1 ? "Đã thanh toán" : "Chưa thanh toán"}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                #
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Tên dịch vụ
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Chi phí
              </th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(invoice.detail)?.detail.map(
              (
                detail: {
                  serviceName: string;
                  cost: number;
                  serviceId: number;
                },
                key: number,
              ) => (
                <tr key={key}>
                  {" "}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{key + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {detail.serviceName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {detail.cost.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      đ
                    </p>
                  </td>
                </tr>
              ),
            )}{" "}
            <tr>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white"></p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">Tổng cộng</p>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p className="text-black dark:text-white">
                  {invoice.total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                  đ
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-4.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            user === "user"
              ? router.push("/home/invoice")
              : router.push("/admin/invoice");
          }}
          className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          type="submit"
          disabled={isPending}
        >
          Quay lại
        </button>
      </div>
    </form>
  );
};
