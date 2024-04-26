"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const HomePage = () => {
  const session = useSession();
  const logout = async () => {
    await signOut();
  };
  return (
    <div className="flex  items-center justify-center">
      <h1 className="font-mono text-4xl">
        Chào mừng bạn để với trang web của chúng tôi !!
      </h1>
    </div>
  );
};

export default HomePage;
