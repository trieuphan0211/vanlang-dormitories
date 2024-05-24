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
    roomCode?: string;
    branchName?: string;
    status?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const roomCode = searchParams?.roomCode?.trim() || "";
  const branchName = searchParams?.branchName?.trim() || "";
  const status = Number(searchParams?.status?.trim());
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const invoices = (await getFilterInvoices(
    query,
    roomCode,
    branchName,
    status,
    currentPage,
    entries,
    new Date("2021-01-01"),
    new Date(),
  )) as INVOICE[];
  const count = await getCountInvoices(query, roomCode, branchName, status);

  return (
    <div>
      <Breadcrumb pageName="Quản lý hóa đơn" />
      <InvoiceTable invoices={invoices} count={count} />
    </div>
  );
};

export default InvoicePage;
