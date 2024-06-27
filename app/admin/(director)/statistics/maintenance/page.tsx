import { getBranchsAll } from "@/actions/branch";
import { getMaintainanceForDashboard } from "@/actions/mantainance";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StatisticsTable } from "@/components/Tables/StatisticsTable";
import { yearsArr } from "@/prisma/testdata/MOCK_DATA";
import { BRANCH } from "@/types";
import Search from "../revenue/search";

interface RegisterPageProps {
  month: string;
  status: { CREATED: number; INPROGRESS: number; FINISHED: number };
}
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
  const maintenance = (await getMaintainanceForDashboard(
    branchName,
    startDate,
    finishDate,
  )) as RegisterPageProps[];
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb
        pageName="Thống kê Bảo trì"
        link={[{ name: "Bảo trì", link: "/admin/statistics/maintenance" }]}
      />
      <div>
        <Search branchs={branchs} years={years} />
      </div>
      <StatisticsTable
        // registerCount={registerCount}
        maintenanceArr={maintenance}
        headers={["Thời gian", "Đang chờ xử lý", "Đang xử lý", "Đã hoàn thành"]}
        title={`Từ ${startDate ? new Date(startDate).toLocaleDateString("vi-VN") : "ban đầu"} đến ${finishDate ? new Date(finishDate).toLocaleDateString("vi-VN") : new Date().toLocaleDateString("vi-VN")}`}
      />
    </div>
  );
};

export default RegisterPage;
