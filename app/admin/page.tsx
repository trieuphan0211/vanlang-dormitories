import { getInvoiceForDashboard } from "@/actions/invoice";
import Dashboard from "@/components/Dashboard/E-commerce";
import { getCountBranchs } from "@/data/branch";
import { getCountFacilities } from "@/data/facilities";
import { getRoomsAllHaveStudents } from "@/data/room";
import { getCountServices } from "@/data/services";
import { getCountStudents } from "@/data/student";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "This is managerment all service, room type, branch, ...",
};

export default async function Home() {
  const branchCount = (await getCountBranchs("", "", 0, "")) || 0;
  const servicesCount = (await getCountServices("", 0, "", "")) || 0;
  const roomCount = ((await getRoomsAllHaveStudents("count")) as number) || 0;
  const facilitiesCount = (await getCountFacilities()) || 0;
  const studentCount = (await getCountStudents()) || 0;
  return (
    <Dashboard
      branchCount={branchCount}
      servicesCount={servicesCount}
      roomCount={roomCount}
      facilitiesCount={facilitiesCount}
      studentCount={studentCount}
    />
  );
}
