import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user.role === "ADMIN") {
    redirect("/admin");
  }
  if (session?.user.role === "USER") {
    redirect("/home");
  }
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <Link
        href="/auth/signin"
        className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Signin
      </Link>

      <Link
        href="/admin"
        className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Admin
      </Link>
    </main>
  );
}
