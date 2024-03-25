import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ServicesTable } from "@/components/Tables/ServicesTable";
import { getCountServices, getFilterServices } from "@/data/services";
import { SERVICES } from "@/types/services";
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
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const services = (await getFilterServices(
    query,
    currentPage,
    entries,
  )) as SERVICES[];
  const count = await getCountServices(query);
  return (
    <div>
      <Breadcrumb pageName="Quản lý dịch vụ" />
      <ServicesTable services={services} count={Number(count)} />
    </div>
  );
};

export default ServicePage;
