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
    <div className="flex h-screen items-center justify-center bg-[url('/images/background/h1.jpg')] bg-cover bg-center before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:block before:bg-gradient-to-t before:from-[#2d334d] before:to-[rgba(0,0,0,0.5)]  before:blur-sm">
      <div className="z-1 flex flex-col items-center gap-5">
        <h1 className=" max-w-[600px] text-center text-4xl font-bold italic leading-normal text-white">
          Chào mừng đến với <br /> ký túc xá đại học Văn Lang
        </h1>
        <SigninForm />
        <p className="text-md text-white">
          © 2024 - Bản Quyền Thuộc Phòng Đào Tạo, Trường Đại Học Văn Lang.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
