import { getBranchsAll } from "@/actions/branch";
import { getRegisterForDashboard } from "@/actions/register";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StatisticsTable } from "@/components/Tables/StatisticsTable";
import { yearsArr } from "@/prisma/testdata/MOCK_DATA";
import { BRANCH } from "@/types";
import Search from "../revenue/search";

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
  const registers = (await getRegisterForDashboard(
    branchName,
    startDate,
    finishDate,
  )) as {
    month: string;
    branch: string;
    status: {
      CREATED: number;
      APPROVED: number;
      CANCEL: number;
      EXTENSION: number;
    };
  }[];

  console.log(registers);
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
        registers={registers}
        headers={[
          "Chi nhánh",
          "Thời gian",
          "Đang chờ",
          "Đã duyệt",
          "Hủy",
          "Gia hạn",
        ]}
        title={`Từ ${startDate ? new Date(startDate).toLocaleDateString("vi-VN") : "ban đầu"} đến ${finishDate ? new Date(finishDate).toLocaleDateString("vi-VN") : new Date().toLocaleDateString("vi-VN")}`}
      />
    </div>
  );
};

export default RegisterPage;
