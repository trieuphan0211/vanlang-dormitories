import { getBranchsAll } from "@/actions/branch";
import { getMaintainanceForDashboard } from "@/actions/mantainance";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StatisticsTable } from "@/components/Tables/StatisticsTable";
import { yearsArr } from "@/prisma/testdata/MOCK_DATA";
import { BRANCH } from "@/types";
import Search from "../revenue/search";
import { getViolateForDashboard } from "@/actions/violate";

interface ViolatePageProps {
  month: string;
  violateType: string;
  status: { CREATED: number; INPROGRESS: number; FINISHED: number };
}
const ViolatePage = async ({
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
  const violate = (await getViolateForDashboard(
    branchName,
    startDate,
    finishDate,
  )) as ViolatePageProps[];
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb
        pageName="Thống kê Vi phạm"
        link={[{ name: "Vi phạm", link: "/admin/statistics/violate" }]}
      />
      <div>
        <Search branchs={branchs} years={years} />
      </div>
      <StatisticsTable
        // registerCount={registerCount}
        // maintenanceArr={maintenance}
        violateArr={violate}
        headers={[
          "Loại vi phạm",
          "Thời gian",
          "Đang chờ xử lý",
          "Đang xử lý",
          "Đã hoàn thành",
        ]}
        title={`Từ ${startDate ? new Date(startDate).toLocaleDateString("vi-VN") : "ban đầu"} đến ${finishDate ? new Date(finishDate).toLocaleDateString("vi-VN") : new Date().toLocaleDateString("vi-VN")}`}
      />
    </div>
  );
};

export default ViolatePage;
