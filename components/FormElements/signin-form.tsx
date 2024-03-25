"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SigninForm = () => {
  const router = useRouter();
  // Authenticated by azure ad
  const onClick = (provider: string) => {
    try {
      signIn(provider, {
        callbackUrl: "/",
      });
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
        className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-rose-500 bg-rose-500 p-4 text-xl font-bold text-white hover:border-rose-600 hover:bg-rose-600 "
        onClick={(e) => {
          e.preventDefault();
          onClick("azure-ad");
        }}
      >
        {/* <div className="h-8 w-8">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <rect x={17} y={17} width={10} height={10} fill="#FEBA08" />
              <rect x={5} y={17} width={10} height={10} fill="#05A6F0" />
              <rect x={17} y={5} width={10} height={10} fill="#80BC06" />
              <rect x={5} y={5} width={10} height={10} fill="#F25325" />
            </g>
          </svg>
        </div> */}
        Đăng nhập
      </button>
    </div>
  );
};
