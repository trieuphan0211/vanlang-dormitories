import { getBranchsAll } from "@/actions/branch";
import BarChart from "@/components/Charts/BarChart";
import { yearsArr } from "@/prisma/testdata/MOCK_DATA";
import { BRANCH } from "@/types";
import { getInvoiceForDashboard } from "../../../../../actions/invoice";
import Search from "./search";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StatisticsTable } from "@/components/Tables/StatisticsTable";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    branchName?: string;
    startDate?: string;
    finishDate?: string;
  };
}) => {
  const branchs = (await getBranchsAll()) as BRANCH[];
  const years = yearsArr as number[];
  const branchName = searchParams?.branchName || "";
  const startDate = searchParams?.startDate || "";
  const finishDate = searchParams?.finishDate || "";
  const invoice = await getInvoiceForDashboard(
    branchName,
    startDate,
    finishDate,
  );
  console.log(invoice);
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb
        pageName="Thống kê doanh thu"
        link={[{ name: "Doanh thu", link: "/admin/statistics/revenue" }]}
      />
      <div>
        <Search branchs={branchs} years={years} />
      </div>
      <StatisticsTable
        // total={invoice.total}
        invoicesArr={invoice}
        headers={["Thời gian", "Doanh thu"]}
        title={`Từ ${startDate ? new Date(startDate).toLocaleDateString("vi-VN") : "ban đầu"} đến ${finishDate ? new Date(finishDate).toLocaleDateString("vi-VN") : new Date().toLocaleDateString("vi-VN")}`}
      />
    </div>
  );
};

export default Page;
