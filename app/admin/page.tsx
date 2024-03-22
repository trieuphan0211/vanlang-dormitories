import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "This is managerment all service, room type, branch, ...",
};

export default function Home() {
  return <ECommerce />;
}
