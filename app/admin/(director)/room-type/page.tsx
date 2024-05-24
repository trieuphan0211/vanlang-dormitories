import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomTypeTable } from "@/components/Tables/RoomTypeTable";
import { getCountRoomtypes, getFilterRoomTypes } from "@/data/room-type";
import { ROOMTYPE } from "@/types";
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
    members?: string;
    roomTypeCode?: string;
    cost?: string;
    description?: string;
    page?: string;
    entries?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const members = Number(searchParams?.members?.trim()) || 0;
  const roomTypeCode = searchParams?.roomTypeCode?.trim() || "";
  const cost = Number(searchParams?.cost?.trim()) || 0;
  const description = searchParams?.description?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries) || 10;

  const roomTypes = (await getFilterRoomTypes(
    query,
    members,
    roomTypeCode,
    cost,
    description,
    currentPage,
    entries,
  )) as ROOMTYPE[];
  const count = await getCountRoomtypes(
    query,
    members,
    roomTypeCode,
    cost,
    description,
  );
  return (
    <div>
      <Breadcrumb pageName="Quản lý loại phòng" />
      <RoomTypeTable roomTypes={roomTypes} count={Number(count)} />
    </div>
  );
};

export default RoomTypePage;
