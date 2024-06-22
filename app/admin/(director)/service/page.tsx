import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ServicesTable } from "@/components/Tables/ServicesTable";
import { getCountServices, getFilterServices } from "@/data/services";
import { SERVICES } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý dịch vụ",
  description: "",
};
const ServicePage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    cost?: string;
    unit?: string;
    description?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const cost = Number(searchParams?.cost?.trim()) || 0;
  const unit = searchParams?.unit?.trim() || "";
  const description = searchParams?.description?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const services = (await getFilterServices(
    query,
    cost,
    unit,
    description,
    currentPage,
    entries,
  )) as SERVICES[];
  const count = await getCountServices(query, cost, unit, description);
  console.log("services count: ", count);
  return (
    <div>
      <Breadcrumb
        pageName="Quản lý dịch vụ"
        link={[{ name: "Dịch vụ", link: "/admin/service" }]}
      />
      <ServicesTable services={services} count={Number(count)} />
    </div>
  );
};

export default ServicePage;
