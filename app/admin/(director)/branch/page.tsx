import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BranchTable } from "@/components/Tables/BranchTable";
import { getCountBranchs, getFilterBranchs } from "@/data/branch";
import { BRANCH } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý chi nhánh",
  description: "",
};

const BranchPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    address?: string;
    numberFloors?: string;
    description?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const address = searchParams?.address?.trim() || "";
  const numberFloors = Number(searchParams?.numberFloors?.trim()) || 0;
  const description = searchParams?.description?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const branchs = (await getFilterBranchs(
    query,
    address,
    numberFloors,
    description,
    currentPage,
    entries,
  )) as BRANCH[];
  const count = await getCountBranchs(
    query,
    address,
    numberFloors,
    description,
  );

  return (
    <div>
      <Breadcrumb
        pageName="Quản lý chi nhánh"
        link={[{ name: "Chi Nhánh", link: "/admin/branch" }]}
      />
      <BranchTable branchs={branchs} count={Number(count)} />
    </div>
  );
};

export default BranchPage;
