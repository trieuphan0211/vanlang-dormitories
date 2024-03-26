"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const HomePage = () => {
  const session = useSession();
  const logout = async () => {
    await signOut();
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p>{JSON.stringify(session.data?.user.email)}</p>
      <button
        onClick={logout}
        className="inline-flex items-center justify-center bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Log Out
      </button>
    </div>
  );
};

export default HomePage;
