import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomTypeTable } from "@/components/Tables/RoomTypeTable";
import { ServicesTable } from "@/components/Tables/ServicesTable";
import { getCountRoomtypes, getFilterRoomTypes } from "@/data/room-type";
import { ROOMTYPE } from "@/types/room-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Managerment",
  description: "",
};
const RoomTypePage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;
  const roomTypes = (await getFilterRoomTypes(
    query,
    currentPage,
    entries,
  )) as ROOMTYPE[];
  const count = await getCountRoomtypes(query);
  return (
    <div>
      <Breadcrumb pageName="Services Managerment" />
      <RoomTypeTable roomTypes={roomTypes} count={Number(count)} />
    </div>
  );
};

export default RoomTypePage;
