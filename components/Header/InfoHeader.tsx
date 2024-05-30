"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

const menuData: Menu[] = [
  {
    id: 1,
    title: "Trang chủ",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Giới thiệu",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Phòng ở",
    path: "/room",
    newTab: false,
  },
  {
    id: 3,
    title: "Dịch vụ",
    path: "/services",
    newTab: false,
  },
  {
    id: 3,
    title: "Nội quy",
    path: "/rules",
    newTab: false,
  },
];
export const InfoHeader = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState<Number>(-1);
  const handleSubmenu = (index: Number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const pathname = usePathname();
  return (
    <>
      <header
        className={clsx(
          `header absolute left-0 top-0 z-40 flex w-full items-center !bg-[#2d334d]`,
          {
            "shadow-sticky !fixed !z-[9999]  !bg-opacity-80 backdrop-blur-sm !transition ":
              sticky,
          },
        )}
      >
        <div className="container mx-auto px-2 py-4">
          <div className="relative flex items-center justify-between">
            <div className="h-12 w-60 max-w-full px-4 xl:mr-12">
              <Link href="/" className={`header-logo block h-full w-full`}>
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  width={10000}
                  height={10000}
                  className="h-full w-auto dark:hidden"
                />
              </Link>
            </div>
            <div className="flex  items-center justify-between gap-10 px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar border-body-color/50 dark:border-body-color/20 dark:bg-dark absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-white px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={menuItem.id} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={clsx(
                              `after: flex py-2  font-bold  uppercase after:absolute after:bottom-0 after:left-0 after:right-full after:block  after:border-b-4 after:border-[#d72134] after:transition-all group-hover:text-[#d72134] group-hover:after:right-0  lg:mr-0 lg:inline-flex lg:px-0`,
                              {
                                "text-[#d72134] after:right-0":
                                  pathname === menuItem.path,
                                "text-white after:right-0":
                                  pathname !== menuItem.path,
                              },
                            )}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <a
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-[#1D2144] group-hover:opacity-70  lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
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
                              className={`submenu dark:bg-dark relative left-0 top-full rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem?.submenu?.map((submenuItem) => (
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
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <Link
                  href="/auth/signin"
                  className="ease-in-up hover:shadow-signUp hidden rounded  border-2 border-[#d72134] px-8 py-2 text-base font-bold uppercase text-[#d72134] transition transition-all duration-300 hover:bg-[#d72134] hover:text-white md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Đăng nhập
                </Link>
                <div>{/* <ThemeToggler /> */}</div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
