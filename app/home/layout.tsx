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
import { useAppSelector } from "@/hooks/redux";
import { alertSeletor } from "@/lib/features/alert/alert-selector";
import { Alert } from "@/components/common/Alert";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();
  const { status } = useAppSelector(alertSeletor);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  if (session.data?.user?.role == "USER") {
    if (session.data.user.verifiedInfo) {
      return (
        <main className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
          <Alert />
          {status && (
            <div className="absolute bottom-0 left-0 right-0 top-0 z-99">
              <Loader />
            </div>
          )}
        </main>
      );
    } else {
      return (
        <>
          <VerifiedInfo />
          <Alert />
        </>
      );
    }
  }
  return <NotFound />;
}
