import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceDetailForm } from "@/components/Form/InvoiceDetailForm";
import { getIvoiceById } from "@/data/invoice";
import { INVOICE } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Chi tiết loại phòng",
  description: "",
};

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const invoice = (await getIvoiceById(params.id)) as INVOICE;
  console.log(invoice);
  return (
    <div>
      <Breadcrumb pageName={`Chi tiết hóa đơn`} />
      {invoice && <InvoiceDetailForm invoice={invoice} type={"detail"} />}
    </div>
  );
};

export default DetailPage;
