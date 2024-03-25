import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomTypeTable } from "@/components/Tables/RoomTypeTable";
import { getCountRoomtypes, getFilterRoomTypes } from "@/data/room-type";
import { ROOMTYPE } from "@/types/room-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý loại phòng",
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
      <Breadcrumb pageName="Quản lý loại phòng" />
      <RoomTypeTable roomTypes={roomTypes} count={Number(count)} />
    </div>
  );
};

export default RoomTypePage;
