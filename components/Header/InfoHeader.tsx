"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { Drawer, IconButton } from "@mui/material";
import { FaAngleRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

const menuData: Menu[] = [
  { id: 1, title: "Trang chủ", path: "/", newTab: false },
  { id: 2, title: "Giới thiệu", path: "/about", newTab: false },
  { id: 3, title: "Phòng ở", path: "/room", newTab: false },
  { id: 4, title: "Dịch vụ", path: "/services", newTab: false },
  { id: 5, title: "Nội quy", path: "/rules", newTab: false },
];

export const InfoHeader = () => {
  const size = useWindowSize();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const pathname = usePathname();

  const navbarToggleHandler = useCallback(() => {
    setNavbarOpen((prev) => !prev);
  }, []);

  const handleStickyNavbar = useCallback(() => {
    setSticky(window.scrollY >= 80);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, [handleStickyNavbar]);

  const handleSubmenu = useCallback((index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  }, []);
  useEffect(() => {
    if ((size.width as number) > 1024) {
      setNavbarOpen(false);
    }
  }, [size]);
  const menuItems = useMemo(
    () =>
      menuData.map((menuItem, index) => (
        <li key={menuItem.id} className="group relative ">
          {menuItem.path ? (
            <Link
              href={menuItem.path}
              className={clsx(
                "after: mr-0 inline-flex px-5 py-5 font-bold uppercase after:absolute after:bottom-0 after:left-0  after:right-full after:block after:border-b-4 after:border-[#d72134] after:transition-all hover:bg-[#d72134]/80 hover:!text-white group-hover:text-[#d72134] lg:w-full",
                {
                  "text-[#d72134] after:right-0": pathname === menuItem.path,
                  "text-black after:right-0": pathname !== menuItem.path,
                },
              )}
              onClick={() =>
                (size.width as number) < 1024 && setNavbarOpen(false)
              }
            >
              {menuItem.title}
            </Link>
          ) : (
            <>
              <a
                onClick={() => handleSubmenu(index)}
                className="flex cursor-pointer items-center justify-between py-2 text-base text-[#1D2144] group-hover:opacity-70 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
              >
                {menuItem.title}
                <span className="pl-3">
                  <svg width="15" height="14" viewBox="0 0 15 14">
                    <path
                      d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </a>
              <div
                className={clsx(
                  "submenu dark:bg-dark relative left-0 top-full rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full",
                  {
                    block: openIndex === index,
                    hidden: openIndex !== index,
                  },
                )}
              >
                {menuItem.submenu?.map((submenuItem) => (
                  <Link
                    href={submenuItem.path || "#"}
                    key={submenuItem.id}
                    className="block rounded py-2.5 text-sm text-[#1D2144] hover:opacity-70 dark:text-white lg:px-3"
                  >
                    {submenuItem.title}
                  </Link>
                ))}
              </div>
            </>
          )}
        </li>
      )),
    [pathname, openIndex, handleSubmenu],
  );

  return (
    <>
      <header
        className={clsx(
          "header absolute left-0 top-0 z-40 flex w-full items-center !bg-white/90",
          {
            "shadow-sticky !fixed !z-[9999] !bg-opacity-80 backdrop-blur-sm !transition":
              sticky,
          },
        )}
      >
        <div className="w-full px-2 ">
          <div className="relative flex items-center justify-between md:py-2">
            <div className="h-12 w-60 max-w-full px-4 xl:mr-12">
              <Link href="/" className="header-logo block h-full w-full">
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  width={10000}
                  height={10000}
                  className="h-full w-auto dark:hidden"
                />
              </Link>
            </div>
            <div className="flex items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="hidden rounded-lg px-3 py-[6px]  lg:block"
                >
                  <span
                    className={clsx(
                      "relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
                      {
                        "top-[7px] rotate-45": navbarOpen,
                      },
                    )}
                  />
                  <span
                    className={clsx(
                      "relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
                      {
                        "opacity-0": navbarOpen,
                      },
                    )}
                  />
                  <span
                    className={clsx(
                      "relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white",
                      {
                        "top-[-8px] -rotate-45": navbarOpen,
                      },
                    )}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={clsx(
                    "navbar border-body-color/50 static right-0 top-full z-30  w-full rounded  border-[.5px] border-none !bg-transparent bg-white p-0 px-6 opacity-100 duration-300  lg:hidden",
                  )}
                >
                  <ul className="flex ">{menuItems}</ul>
                </nav>
                <Drawer
                  anchor="right"
                  open={navbarOpen}
                  onClose={navbarToggleHandler}
                >
                  <div className="flex justify-between">
                    <div className="h-12 w-60 max-w-full px-4 xl:mr-12">
                      <Link
                        href="/"
                        className="header-logo block h-full w-full"
                      >
                        <Image
                          src="/images/logo/logo.png"
                          alt="logo"
                          width={10000}
                          height={10000}
                          className="h-full w-auto dark:hidden"
                        />
                      </Link>
                    </div>
                    <div className="flex items-center p-2">
                      <IconButton onClick={navbarToggleHandler}>
                        <IoClose />
                      </IconButton>
                    </div>
                  </div>
                  <ul className=" w-full">{menuItems}</ul>
                  <div className="hidden items-center justify-end px-4 md:flex ">
                    <Link
                      href="/auth/signin"
                      className="ease-in-up hover:shadow-signUp my-[10px] rounded border-2 border-[#d72134] px-8 py-2 text-base font-bold uppercase text-[#d72134] transition duration-300  hover:bg-[#d72134] hover:text-white md:w-full md:text-center"
                    >
                      Đăng nhập
                    </Link>
                    <div>{/* Theme toggler will go here */}</div>
                  </div>
                </Drawer>
              </div>
              <div className="flex items-center justify-end px-4 md:hidden">
                <Link
                  href="/auth/signin"
                  className="ease-in-up hover:shadow-signUp my-[10px] rounded border-2 border-[#d72134] px-8 py-2 text-base font-bold uppercase text-[#d72134] transition  duration-300 hover:bg-[#d72134] hover:text-white "
                >
                  Đăng nhập
                </Link>
                <div>{/* Theme toggler will go here */}</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
