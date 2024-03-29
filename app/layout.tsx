import { StoreProvider } from "@/app/StoreProvider";
import { auth } from "@/auth";
import "@/css/style.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

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
          <body
            className={`${inter.className} h-screen w-screen overflow-x-hidden`}
          >
            {children}
          </body>
        </html>
      </StoreProvider>
    </SessionProvider>
  );
}
