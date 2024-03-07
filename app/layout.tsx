import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/css/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | VanlangDorms",
    default: "Home | VanlangDorms",
  },
  description: "Van Lang Dormitory Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
