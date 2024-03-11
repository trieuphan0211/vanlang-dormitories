import Link from "next/link";

const ErrorPage = () => {
  return (
    <div>
      <Link href="/auth/signin">
        <button>Back to Sign in</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
