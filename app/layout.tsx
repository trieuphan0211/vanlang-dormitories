import { StoreProvider } from "@/app/StoreProvider";
import { auth } from "@/auth";
import "@/css/style.css";
import { inter } from "@/fonts/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

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
            <SpeedInsights />
          </body>
        </html>
      </StoreProvider>
    </SessionProvider>
  );
}
