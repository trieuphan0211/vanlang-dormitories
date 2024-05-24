"use client";
import NotFound from "@/app/not-found";
import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/css/jsvectormap.css";
import { useSession } from "next-auth/react";
import React from "react";

export default function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  if (
    session.data?.user?.role === "ADMIN" ||
    session.data?.user?.role === "DIRECTOR"
  ) {
    return <div>{children}</div>;
  }
  return <NotFound />;
}
