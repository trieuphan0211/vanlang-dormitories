import { auth } from "@/auth";
import { InfoHeader } from "@/components/Header";
import "@/css/style.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "Van Lang Dormitory Management System",
};

export default async function InfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <InfoHeader />
      {children}
      {/* <Footer /> */}
    </main>
  );
}
