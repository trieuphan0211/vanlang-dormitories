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

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);
  if (session.data?.user?.role !== "USER") {
    return (
      <main className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? <Loader /> : <DefaultLayout>{children}</DefaultLayout>}
        <Alert />
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
