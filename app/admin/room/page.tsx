import { getBranchsAll } from "@/actions/branch";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomTable } from "@/components/Tables/RoomTable";
import { getCountRoom, getFilterRooms } from "@/data/room";
import { getRoomTypesAll } from "@/data/room-type";
import { BRANCH } from "@/types/branch";
import { ROOM } from "@/types/room";
import { ROOMTYPE } from "@/types/room-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý phòng",
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
  const rooms = (await getFilterRooms(query, currentPage, entries)) as ROOM[];
  const branchs = (await getBranchsAll()) as BRANCH[];
  const roomTypes = (await getRoomTypesAll()) as ROOMTYPE[];
  const count = await getCountRoom(query);
  return (
    <div>
      <Breadcrumb pageName="Quản lý phòng" />
      <RoomTable
        rooms={rooms}
        count={Number(count)}
        branchs={branchs}
        roomTypes={roomTypes}
      />
    </div>
  );
};

export default RoomTypePage;
