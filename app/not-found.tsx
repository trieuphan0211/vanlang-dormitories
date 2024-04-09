"use client";
import "@/css/style.css";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NotFound() {
  const session = useSession();
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="text-gray-900 mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Trang không được tìm thấy
        </h1>
        <p className="text-gray-600 mt-6 text-base leading-7">
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {session.data?.user?.role == "USER" && (
            <Link
              href="/home"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay lại trang sinh viên
            </Link>
          )}
          {session.data?.user?.role !== "USER" &&
            session.data?.user?.role !== undefined && (
              <Link
                href="/admin"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Quay lại trang quản trị
              </Link>
            )}
          {session.data?.user?.role == undefined && (
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay lại trang chủ
            </Link>
          )}
          {/* <Link href="#" className="text-gray-900 text-sm font-semibold">
            Contact support <span aria-hidden="true">→</span>
          </Link> */}
        </div>
      </div>
    </main>
  );
}
