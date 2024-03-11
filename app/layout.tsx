import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/css/style.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | VanlangDorms",
    default: "Home | VanlangDorms",
  },
  description: "Van Lang Dormitory Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${inter.className} h-screen w-screen`}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
