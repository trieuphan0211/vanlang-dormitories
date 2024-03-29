import { auth } from "@/auth";
import { SigninForm } from "@/components/FormElements/signin-form";
import "@/css/satoshi.css";
import "@/css/style.css";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
  description: "",
};

const SignInPage = async () => {
  const session = await auth();
  if (session?.user.role === "ADMIN") {
    redirect("/admin");
  }
  if (session?.user.role === "USER") {
    redirect("/home");
  }
  return (
    <div className="flex h-screen items-center justify-center bg-[url('/images/background/h1.jpg')] bg-cover bg-center">
      <div className="flex flex-col items-center gap-5">
        <SigninForm />
        <p className="text-xl text-white">
          © 2024 - Bản Quyền Thuộc Phòng Đào Tạo, Trường Đại Học Văn Lang.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
