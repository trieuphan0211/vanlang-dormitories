"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useDebouncedCallback } from "use-debounce";
import { Branch } from "./Branch";
import { Service } from "./Service";
import { Room } from "./Room";
import { RoomType } from "./RoomType";
import { Student } from "./Student";
import { User } from "./User";
import { FacilitiesType } from "./FacilitiesType";
import { Facilities } from "./Facilities";
import { Register } from "./Register";
import { Invoice } from "./Invoice";
import { Violate } from "./Violate";

export const SearchTable = ({
  placeholder,
  type,
}: {
  placeholder: string;
  type: string;
}) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback(
    ({
      term,
      address,
      numberFloors,
      description,
      cost,
      unit,
      roomType,
      branchName,
      members,
      roomTypeCode,
      email,
      gender,
      major,
      schoolYear,
      studentCode,
      role,
      facilitiesTypeCode,
      facilitiesTypeName,
      facilitiesCode,
      status,
      roomCode,
      year,
      date,
      studentName,
    }: {
      term?: string;
      address?: string;
      numberFloors?: number;
      description?: string;
      cost?: string;
      unit?: string;
      roomType?: string;
      branchName?: string;
      members?: string;
      roomTypeCode?: string;
      studentCode?: string;
      email?: string;
      gender?: string;
      major?: string;
      schoolYear?: string;
      role?: string;
      facilitiesTypeCode?: string;
      facilitiesTypeName?: string;
      facilitiesCode?: string;
      status?: string;
      roomCode?: string;
      year?: string;
      date?: string;
      studentName?: string;
    }) => {
      const params = new URLSearchParams(searchParams);

      term ? params.set("query", term) : params.delete("query");
      address ? params.set("address", address) : params.delete("address");
      numberFloors
        ? params.set("numberFloors", String(numberFloors))
        : params.delete("numberFloors");
      description
        ? params.set("description", description)
        : params.delete("description");
      cost ? params.set("cost", cost) : params.delete("cost");
      unit ? params.set("unit", unit) : params.delete("unit");
      roomType ? params.set("roomType", roomType) : params.delete("roomType");
      roomTypeCode
        ? params.set("roomTypeCode", roomTypeCode)
        : params.delete("roomTypeCode");
      members ? params.set("members", members) : params.delete("members");
      role ? params.set("role", role) : params.delete("role");
      studentCode
        ? params.set("studentCode", studentCode)
        : params.delete("studentCode");
      email ? params.set("email", email) : params.delete("email");
      gender ? params.set("gender", gender) : params.delete("gender");
      major ? params.set("major", major) : params.delete("major");
      schoolYear
        ? params.set("schoolYear", schoolYear)
        : params.delete("schoolYear");
      branchName
        ? params.set("branchName", branchName)
        : params.delete("branchName");
      facilitiesTypeCode
        ? params.set("facilitiesTypeCode", facilitiesTypeCode)
        : params.delete("facilitiesTypeCode");
      facilitiesCode
        ? params.set("facilitiesCode", facilitiesCode)
        : params.delete("facilitiesCode");
      facilitiesTypeName
        ? params.set("facilitiesTypeName", facilitiesTypeName)
        : params.delete("facilitiesTypeName");
      status ? params.set("status", status) : params.delete("status");
      roomCode ? params.set("roomCode", roomCode) : params.delete("roomCode");
      year ? params.set("year", year) : params.delete("year");
      date ? params.set("date", date) : params.delete("date");
      studentName
        ? params.set("studentName", studentName)
        : params.delete("studentName");
      replace(`${pathname}?${params.toString()}`);
    },
    500,
  );
  const handleReset = (types: string) => {
    const params = new URLSearchParams(searchParams);
    types.split(",").map((type) => {
      params.delete(type);
    });
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="relative flex w-1/2 rounded-full border border-stroke bg-transparent px-5 py-2.5 sm:w-full">
      <input
        className="w-full outline-none focus:border-primary"
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleSearch({ term: e.target.value })}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <button
        className={clsx("transition-all", {
          "rotate-180 text-primary": open,
        })}
        onClick={() => setOpen(!open)}
      >
        <FaAngleDown className="mt-1" />
      </button>
      {open && (
        <div
          className={clsx(
            "absolute left-0 top-[50px] w-full rounded-xl bg-white p-5 shadow-14",
            {
              hidden: !open,
              "animate-bottomtop": open,
            },
          )}
        >
          {type === "branch" && (
            <Branch
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "service" && (
            <Service
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "room" && (
            <Room
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "roomType" && (
            <RoomType
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "student" && (
            <Student
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "user" && (
            <User
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "facilitiesType" && (
            <FacilitiesType
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "facilities" && (
            <Facilities
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "register" && (
            <Register
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "invoces" && (
            <Invoice
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
          {type === "violate" && (
            <Violate
              setOpen={setOpen}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          )}
        </div>
      )}
    </div>
  );
};
