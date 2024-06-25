import BarChart from "@/components/Charts/BarChart";
import { CardData } from "@/components/Dashboard/CardData";
import React, { useRef } from "react";
import { FiBox } from "react-icons/fi";
import { FormSelect } from "@/components/Input/Select";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { getBranchsAll } from "@/actions/branch";
import { BRANCH } from "@/types";
import Search from "./search";
import { yearsArr } from "@/prisma/testdata/MOCK_DATA";
import { getInvoiceForDashboard } from "../../../../../actions/invoice";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    branchName?: string;
    year?: string;
  };
}) => {
  const branchs = (await getBranchsAll()) as BRANCH[];
  const years = yearsArr as number[];
  const invoice = await getInvoiceForDashboard(
    searchParams?.branchName,
    searchParams?.year,
  );

  console.log(invoice);
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Search branchs={branchs} years={years} />
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="flex-1">
          <CardData
            title="Chưa thanh toán"
            total={String(invoice.all_quantity - invoice.paid_quantity)}
            // rate="0.43%"
            // levelUp
          >
            <FiBox className="text-2xl text-primary" />
          </CardData>
        </div>
        <div className="flex-1">
          <CardData
            title="Đã thanh toán"
            total={String(invoice.paid_quantity)}
            // rate="0.43%"
            // levelUp
          >
            <FiBox className="text-2xl text-primary" />
          </CardData>
        </div>
        <div className="flex-1">
          <CardData
            title="Tổng doanh thu"
            total={
              invoice.total
                .reduce((prev, curr) => prev + curr)
                .toLocaleString("de-DE") + " vnd"
            }
            // rate="0.43%"
            // levelUp
          >
            <FiBox className="text-2xl text-primary" />
          </CardData>
        </div>
      </div>
      <BarChart
        total={invoice.total}
        paid={invoice.paid}
        notpaid={invoice.notpaid}
        invoicesArr={invoice.invoicesArr}
      />
    </div>
  );
};

export default Page;
