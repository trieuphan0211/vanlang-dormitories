"use client";
import { ExportToExcel } from "@/app/admin/(director)/statistics/revenue/ExportToExcel";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
interface RegisterPageProps {
  month: string;
  status: { CREATED: number; INPROGRESS: number; FINISHED: number };
}
interface ViolatePageProps {
  month: string;
  violateType: string;
  status: { CREATED: number; INPROGRESS: number; FINISHED: number };
}
export const StatisticsTable = ({
  invoicesArr,
  headers,
  maintenanceArr,
  title,
  violateArr,
  registers,
}: {
  invoicesArr?: { year: number; invoicesArr: number[] }[];
  headers: string[];
  maintenanceArr?: RegisterPageProps[];
  violateArr?: ViolatePageProps[];
  title: string;
  registers?: {
    month: string;
    branch: string;
    status: {
      CREATED: number;
      APPROVED: number;
      CANCEL: number;
      EXTENSION: number;
    };
  }[];
}) => {
  return (
    <div className=" rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex w-full justify-between gap-3 sm:flex-col">
        <div></div>

        <ExportToExcel
          totalArr={invoicesArr}
          registers={registers}
          maintenanceArr={maintenanceArr}
          violateArr={violateArr}
          fileName="THONG_KE_DOANH_THU"
          title={title}
        />
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
            {registers &&
              registers.map((register, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {register.branch}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {register.month}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {register.status.CREATED}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {register.status.APPROVED}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {register.status.CANCEL}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {register.status.EXTENSION}
                    </p>
                  </td>
                </tr>
              ))}
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
            {violateArr?.map((e, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{e.violateType}</p>
                </td>
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
