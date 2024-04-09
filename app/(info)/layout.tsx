import { auth } from "@/auth";
import { Footer } from "@/components/Footer/Footer";
import { InfoHeader } from "@/components/Header";
import "@/css/style.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Vanlang Dormitories",
    default: "Home | Vanlang Dormitories",
  },
  description: "Van Lang Dormitory Management System",
};

export default async function InfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white pt-16">
      <InfoHeader />
      {children}
      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
}
