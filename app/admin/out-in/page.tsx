import { Metadata } from "next";
import React from "react";
import { InOutQR } from "./InOutQR";

export const metadata: Metadata = {
  title: "Quét QR ra/vào",
  description: "",
};

const InOutPage = () => {
  return (
    <div>
      <InOutQR />
    </div>
  );
};

export default InOutPage;
