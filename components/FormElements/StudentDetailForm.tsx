"use client";

import { updateBranchById } from "@/actions/branch";
import { useAppDispatch } from "@/hooks/redux";
import { alertManagerActions } from "@/lib/features/alert/alert-slice";
import { BranchSchema } from "@/schema";
import { BRANCH } from "@/types/branch";
import { STUDENT } from "@/types/student";
import { USER } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const StudentDetailForm = ({
  student,
  user,
}: {
  student: STUDENT;
  user?: USER;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <>
      {user?.image && (
        <div className="flex justify-center">
          <Image
            className="rounded-full border-2 border-[rgba(0,0,0,0.5)]"
            src={user?.image}
            width={200}
            height={200}
            alt="User"
          />
        </div>
      )}
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Họ và tên
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            placeholder="Họ và tên"
            value={student?.fullName}
            disabled
          />
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Email
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            placeholder="Email"
            value={student?.email}
            disabled
          />
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="mb-5.5 flex w-full flex-col gap-5.5 sm:flex-row">
          <div className="w-full ">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="branchName"
            >
              Giới tính
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              id="branchName"
              placeholder="Giới tính"
              value={student?.gender}
              disabled
            />
          </div>
        </div>{" "}
        <div className="mb-5.5 flex w-full flex-col gap-5.5 sm:flex-row">
          <div className="w-full ">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="branchName"
            >
              Ngày sinh
            </label>
            <input
              className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              id="branchName"
              placeholder="Ngày sinh"
              value={student?.birthDate?.toLocaleDateString()}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex w-full flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Khoa
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            placeholder="Khoa"
            value={student?.major}
            disabled
          />
        </div>
      </div>
      <div className="mb-5.5 flex w-full flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Niên khóa
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            placeholder="Niên khóa"
            value={student?.schoolYear}
            disabled
          />
        </div>
      </div>
      <div className="mb-5.5 flex w-full flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Địa chỉ
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            placeholder="Địa chỉ"
            value={student?.address}
            disabled
          />
        </div>
      </div>
      <div className="mb-5.5 flex w-full flex-col gap-5.5 sm:flex-row">
        <div className="w-full ">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="branchName"
          >
            Số điện thoại
          </label>
          <input
            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            id="branchName"
            placeholder="Số điện thoại"
            value={student?.phone}
            disabled
          />
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/student");
          }}
          className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          type="submit"
        >
          Quay lại
        </button>
      </div>
    </>
  );
};
