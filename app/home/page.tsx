import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Log Out
      </Link>
    </div>
  );
};

export default HomePage;
