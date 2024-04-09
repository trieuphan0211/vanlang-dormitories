"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { useSession } from "next-auth/react";
import NotFound from "../not-found";
import VerifiedInfo from "@/components/FormElements/VerifiedInfo";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  if (session.data?.user?.role == "USER") {
    if (session.data.user.verifiedInfo) {
      return (
        <main className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </main>
      );
    } else {
      return <VerifiedInfo />;
    }
  }
  return <NotFound />;
}
