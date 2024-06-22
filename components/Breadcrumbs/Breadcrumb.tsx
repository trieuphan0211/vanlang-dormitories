"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
interface BreadcrumbProps {
  pageName: string;
  link: Array<{ name: string; link: string }>;
}
const Breadcrumb = ({ pageName, link }: BreadcrumbProps) => {
  const pathname = usePathname();
  const [breadcrumb, setBreadcrumb] = useState<Array<String>>([]);
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
    <div className="mb-6 flex  items-center justify-between gap-3">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {link.map((path, index) => {
            return (
              <li key={index}>
                <Link
                  className={clsx("font-medium capitalize ", {
                    "font-medium text-primary": index === link.length - 1,
                  })}
                  href={path.link}
                >
                  {path.name}
                  {index === link.length - 1 ? "" : "/"}
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
