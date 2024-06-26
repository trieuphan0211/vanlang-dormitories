"use client";
import { ExportToExcel } from "@/app/admin/(director)/statistics/revenue/ExportToExcel";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
interface RegisterPageProps {
  month: string;
  status: { CREATED: number; INPROGRESS: number; FINISHED: number };
}
export const StatisticsTable = ({
  invoicesArr,
  headers,
  maintenanceArr,
  title,
  registerCount,
}: {
  invoicesArr?: { year: string; invoicesArr: number[] }[];
  headers: string[];
  maintenanceArr?: RegisterPageProps[];
  title: string;
  registerCount?: {
    pedding: number;
    approved: number;
    canceled: number;
    extension: number;
  };
}) => {
  return (
    <div className=" rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex w-full justify-between gap-3 sm:flex-col">
        <div></div>
        {invoicesArr && (
          <ExportToExcel
            totalArr={invoicesArr}
            fileName="DoanhThuKTX"
            title={title}
          />
        )}
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {headers?.map((header, key) => (
                <th
                  key={key}
                  className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoicesArr?.map((e, key) =>
              e?.invoicesArr?.map((item, index) =>
                item ? (
                  <tr key={index}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {index + 1}/{e.year}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.toLocaleString("en-US")}
                        {` VND`}
                      </p>
                    </td>
                  </tr>
                ) : (
                  <></>
                ),
              ),
            )}
            {registerCount && (
              <>
                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">Đang chờ</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {registerCount?.pedding}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">Đã duyệt</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {registerCount?.approved}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">Đã hủy</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {registerCount?.canceled}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">Đã gia hạn</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {registerCount?.extension}
                    </p>
                  </td>
                </tr>
              </>
            )}
            {maintenanceArr?.map((e, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{e.month}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {e.status.CREATED}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {e.status.INPROGRESS}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {e.status.FINISHED}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
