"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Alert } from "@/components/common/Alert";
import { useAppSelector } from "@/hooks/redux";
import { alertSeletor } from "@/lib/features/alert/alert-selector";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();
  const { status } = useAppSelector(alertSeletor);
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);
  if (session.data?.user?.role !== "USER") {
    return (
      <main className=" dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? <Loader /> : <DefaultLayout>{children}</DefaultLayout>}
        <Alert />

        {status && (
          <div className="absolute bottom-0 left-0 right-0 top-0 z-99">
            <Loader />
          </div>
        )}
      </main>
    );
  }
  return (
    <div>
      <Link href="/auth/signin">
        <button>Back to Sign in</button>
      </Link>
    </div>
  );
}
