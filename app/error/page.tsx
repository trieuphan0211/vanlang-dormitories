import Link from "next/link";
import NotFound from "../not-found";

const ErrorPage = () => {
  return (
    <div className="felx flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">500</p>
        <h1 className="text-gray-900 mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Đã có lỗi trong quá trình đăng nhập
        </h1>
        {/* <p className="text-gray-600 mt-6 text-base leading-7">
          Sorry, we couldn’t find the page you’re looking for.
        </p> */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/auth/signin"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
