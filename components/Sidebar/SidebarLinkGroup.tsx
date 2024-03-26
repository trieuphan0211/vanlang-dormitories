"use client";
import { ReactNode, useState } from "react";

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition: boolean;
  key: number;
}

const SidebarLinkGroup = ({
  children,
  activeCondition,
  key,
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li key={key}>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
