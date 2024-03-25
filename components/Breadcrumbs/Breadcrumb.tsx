"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const pathname = usePathname();
  let link = "";

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {pathname.split("/").map((path, index) => {
            const replacePath = path.replace(/-/g, " ");
            if (path === "") return null;
            link += `/${path}`;
            return (
              <li key={index}>
                <Link
                  className={clsx("font-medium capitalize ", {
                    "font-medium text-primary":
                      index === pathname.split("/").length - 1,
                  })}
                  href={link}
                >
                  {replacePath}{" "}
                  {index === pathname.split("/").length - 1 ? "" : "/"}
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
