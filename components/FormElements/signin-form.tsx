"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SigninForm = () => {
  const router = useRouter();
  // Authenticated by azure ad
  const onClick = (provider: string) => {
    try {
      signIn(provider, { callbackUrl: "/auth/signin" });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col items-center gap-10 rounded-lg bg-[rgba(0,0,0,0.6)] p-5">
      <Image
        className="cursor-pointer"
        src="/images/logo/vanlanglogo.png"
        alt=""
        width={150}
        height={150}
        onClick={() => router.push("/")}
      />
      <p className="text-3xl font-bold text-white">
        Đăng nhập với tài khoản Văn Lang
      </p>
      <button
        className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-[#d72134] bg-[#d72134] p-4 text-xl font-bold text-white hover:border-rose-600 hover:bg-rose-600 "
        onClick={(e) => {
          e.preventDefault();
          onClick("microsoft-entra-id");
        }}
      >
        Đăng nhập
      </button>
    </div>
  );
};
