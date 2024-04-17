import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/InvoiceTable";
import { getCountInvoices, getFilterInvoices } from "@/data/invoice";
import { INVOICE } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý hóa đơn",
  description: "",
};

const InvoicePage = async ({
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
  const invoices = (await getFilterInvoices(
    query,
    currentPage,
    entries,
  )) as INVOICE[];
  const count = await getCountInvoices(query);

  return (
    <div>
      <Breadcrumb pageName="Quản lý hóa đơn" />
      <InvoiceTable invoices={invoices} count={count} />
    </div>
  );
};

export default InvoicePage;
