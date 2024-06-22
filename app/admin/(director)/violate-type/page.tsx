import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ViolateTypeTable } from "@/components/Tables/ViolateTypeTable";
import {
  getCountViolatetypes,
  getFilterViolateTypes,
} from "@/data/violate-type";
import { ViolateType } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý loại vi phạm",
  description: "",
};

const ViolatePage = async ({
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
  //   get List Violate Type
  const violateTypes = (await getFilterViolateTypes(
    query,
    currentPage,
    entries,
  )) as ViolateType[];
  const count = await getCountViolatetypes(query);
  return (
    <div>
      <Breadcrumb
        pageName="Quản lý loại vi phạm"
        link={[{ name: "Loại vi phạm", link: "/admin/violate-type" }]}
      />
      <ViolateTypeTable violateTypes={violateTypes} count={Number(count)} />
    </div>
  );
};

export default ViolatePage;
