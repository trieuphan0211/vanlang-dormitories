import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BranchTable } from "@/components/Tables/BranchTable";
import { getFilterBranchs, getCountBranchs } from "@/data/branch";
import { BRANCH } from "@/types/branch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branch Managerment",
  description: "",
};

const BranchPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const branchs = (await getFilterBranchs(
    query,
    currentPage,
    entries,
  )) as BRANCH[];
  const count = await getCountBranchs(query);

  return (
    <div>
      <Breadcrumb pageName="Branch Managerment" />
      <BranchTable branchs={branchs} count={Number(count)} />
    </div>
  );
};

export default BranchPage;
