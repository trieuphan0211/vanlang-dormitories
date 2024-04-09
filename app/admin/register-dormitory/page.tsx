import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Quản lý đăng ký ký túc xá",
  description: "",
};

const RegisterDormitoryPage = () => {
  return (
    <div>
      <Breadcrumb pageName="Quản lý đăng ký ký túc xá" />
    </div>
  );
};

export default RegisterDormitoryPage;
