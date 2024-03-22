import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/css/style.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { StoreProvider } from "@/app/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Vanlang Dormitories",
    default: "Home | Vanlang Dormitories",
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
      <StoreProvider>
        <html lang="en">
          <body className={`${inter.className} h-screen w-screen`}>
            {children}
          </body>
        </html>
      </StoreProvider>
    </SessionProvider>
  );
}
