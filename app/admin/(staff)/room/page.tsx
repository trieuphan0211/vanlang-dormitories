import { getBranchsAll } from "@/actions/branch";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomTable } from "@/components/Tables/RoomTable";
import { getCountRoom, getFilterRooms } from "@/data/room";
import { getRoomTypesAll } from "@/data/room-type";
import { getServicesAll } from "@/data/services";
import { BRANCH, SERVICES } from "@/types";
import { ROOM } from "@/types";
import { ROOMTYPE } from "@/types";
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
    numberFloors?: string;
    roomType?: string;
    branchName?: string;
    description?: string;
  };
}) => {
  const query = searchParams?.query?.trim() || "";
  const currentPage = Number(searchParams?.page) || 1;
  const entries = Number(searchParams?.entries?.trim()) || 10;
  const numberFloors = Number(searchParams?.numberFloors?.trim()) || 0;
  const roomType = searchParams?.roomType?.trim() || "";
  const branchName = searchParams?.branchName?.trim() || "";
  const description = searchParams?.description?.trim() || "";

  const rooms = (await getFilterRooms(
    query,
    numberFloors,
    roomType,
    branchName,
    description,
    currentPage,
    entries,
  )) as ROOM[];
  const branchs = (await getBranchsAll()) as BRANCH[];
  const roomTypes = (await getRoomTypesAll()) as ROOMTYPE[];
  const services = (await getServicesAll()) as SERVICES[];
  const count = await getCountRoom(
    query,
    numberFloors,
    roomType,
    branchName,
    description,
  );
  return (
    <div>
      <Breadcrumb pageName="Quản lý phòng" />
      <RoomTable
        rooms={rooms}
        count={Number(count)}
        branchs={branchs}
        roomTypes={roomTypes}
        services={services}
      />
    </div>
  );
};

export default RoomTypePage;
