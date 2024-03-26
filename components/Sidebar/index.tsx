"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { MenuItem, MenuItemList } from "./MenuItem";
import { list } from "postcss";
import path from "path";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  // Begin: Handle UI
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  // End: Handle UI
  // Begin: Handle Logic
  const menu = [
    {
      icon: "/images/header-icon/dashboard.svg",
      title: "Bảng điều khiển",
      href: "/admin",
    },
    {
      icon: "/images/header-icon/branch.svg",
      title: "Quản lý thông tin",

      list: [
        {
          icon: "/images/header-icon/branch.svg",
          title: "Chi nhánh",
          href: "/admin/branch",
        },
        {
          icon: "/images/header-icon/service.svg",
          title: "Dịch vụ",
          href: "/admin/service",
        },
        {
          icon: "/images/header-icon/room-type.svg",
          title: "Loại phòng",
          href: "/admin/room-type",
        },
      ],
    },
    {
      icon: "/images/header-icon/branch.svg",
      title: "Người dùng",
      list: [
        {
          icon: "/images/header-icon/student.svg",
          title: "Sinh viên",
          href: "/admin/student",
        },
        {
          icon: "/images/header-icon/user.svg",
          title: "Người dùng",
          href: "/admin/user",
        },
      ],
    },
    {
      icon: "/images/header-icon/branch.svg",
      title: "Cơ sở vật chất",
      list: [
        {
          icon: "/images/header-icon/user.svg",
          title: "Cơ sở vật chất",
          href: "/admin/facilities",
        },
        {
          icon: "/images/header-icon/user.svg",
          title: "Loại cơ sở vật chất",
          href: "/admin/facilities-type",
        },
        {
          icon: "/images/header-icon/user.svg",
          title: "Bảo trì",
          href: "/admin/maintenance",
        },
      ],
    },
    {
      icon: "/images/header-icon/branch.svg",
      title: "Dịch vụ",
      list: [
        {
          icon: "/images/header-icon/user.svg",
          title: "Đăng ký Ký túc xá",
          href: "/admin/register-dormitory",
        },
      ],
    },
  ];
  // End: Handle Logic
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-1 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 pb-5.5 lg:pb-6.5">
        <Link href="/" className="flex h-22 items-center overflow-hidden">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.png"}
            alt="Logo"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" px-4 py-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {menu.map((item, index) => {
                if (item.list) {
                  return (
                    <MenuItemList
                      icon={item.icon}
                      title={item.title}
                      list={item.list}
                      index={index}
                    />
                  );
                }
                return (
                  <li key={index}>
                    <MenuItem
                      icon={item.icon}
                      title={item.title}
                      href={item.href}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
