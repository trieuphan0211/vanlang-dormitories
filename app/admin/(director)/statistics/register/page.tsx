import { getBranchsAll } from "@/actions/branch";
import BarChart from "@/components/Charts/BarChart";
import { yearsArr } from "@/prisma/testdata/MOCK_DATA";
import { BRANCH } from "@/types";
import { getInvoiceForDashboard } from "../../../../../actions/invoice";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StatisticsTable } from "@/components/Tables/StatisticsTable";
import Search from "../revenue/search";
import { getRegisterForDashboard } from "@/actions/register";

const RegisterPage = async ({
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
  const registerCount = (await getRegisterForDashboard(
    branchName,
    startDate,
    finishDate,
  )) as {
    pedding: number;
    approved: number;
    canceled: number;
    extension: number;
  };
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb
        pageName="Thống kê Đăng ký"
        link={[{ name: "Đăng ký", link: "/admin/statistics/register" }]}
      />
      <div>
        <Search branchs={branchs} years={years} />
      </div>
      <StatisticsTable
        registerCount={registerCount}
        headers={["Trạng thái đăng ký", "Số lượng"]}
        title={`Từ ${new Date(startDate).toLocaleDateString("vi-VN")} đến ${new Date(finishDate).toLocaleDateString("vi-VN")}`}
      />
    </div>
  );
};

export default RegisterPage;
