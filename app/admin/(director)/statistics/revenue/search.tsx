"use client";
import { getBranchsAll } from "@/actions/branch";
import BarChart from "@/components/Charts/BarChart";
import { CardData } from "@/components/Dashboard/CardData";
import { FormSelect } from "@/components/Input";
import { BRANCH } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FiBox } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ branchs, years }: { branchs: BRANCH[]; years: any[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const submitRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback(
    ({
      term,
      branchName,
      year,
    }: {
      term?: string;
      branchName?: string;
      year?: number;
    }) => {
      const params = new URLSearchParams(searchParams);
      term ? params.set("query", term) : params.delete("query");
      branchName
        ? params.set("branchName", branchName)
        : params.delete("branchName");
      year ? params.set("year", year.toString()) : params.delete("year");
      console.log(year);
      replace(`${pathname}?${params.toString()}`);
    },
    500,
  );

  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      branchName: searchParams.get("branchName")?.toString() || "",
      year: searchParams.get("year")?.toString() || "",
    },
  });
  const { branchName, year } = watch();

  useEffect(() => {
    handleSearch({
      term: searchParams.get("query")?.toString(),
      branchName,
      year: Number(year),
    });
  }, [branchName, year, handleSearch, searchParams]);

  const onSubmit = (data: any) => {
    handleSearch({ ...data, term: searchParams.get("query")?.toString() });
  };

  const handleSubmitForm = () => {
    submitRef.current?.click();
  };

  return (
    <form
      className="flex flex-row gap-4 bg-white p-3"
      action=""
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-1">
        <label>Chọn chi nhánh:</label>
        <FormSelect
          name={"branchName"}
          isPending={false}
          branchs={branchs}
          control={control}
        />
      </div>
      <div className="flex-1">
        <label>Chọn năm:</label>
        <FormSelect
          name={"year"}
          isPending={false}
          yearsArr={years}
          control={control}
        />
      </div>
    </form>
  );
};

export default Search;
