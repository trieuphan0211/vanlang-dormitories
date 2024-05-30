"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const pathname = usePathname();
  const [breadcrumb, setBreadcrumb] = useState<Array<String>>([]);
  console.log(pathname);
  useEffect(() => {
    switch (pathname) {
      case "/home":
        setBreadcrumb(["Thông tin cá nhân"]);
        break;
      case "/home/violate":
        setBreadcrumb(["Vi phạm"]);
    }
  }, [pathname]);
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {breadcrumb.map((path, index) => {
            const replacePath = pathname.split("/");
            return (
              <li key={index}>
                <Link
                  className={clsx("font-medium capitalize ", {
                    "font-medium text-primary":
                      index === pathname.split("/").length - 2,
                  })}
                  href={""}
                >
                  {path}
                  {index === pathname.split("/").length - 2 ? "" : "/"}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
