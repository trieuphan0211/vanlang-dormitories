import { getBranchsAll } from "@/actions/branch";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomDetailForm } from "@/components/FormElements/RoomDetailForm";
import { getRoomById } from "@/data/room";
import { getRoomTypesAll } from "@/data/room-type";
import { ROOM } from "@/types/room";
import { ROOMTYPE } from "@/types/room-type";
import { Branch } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cập nhật phòng",
  description: "",
};
export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const room = (await getRoomById(params.id)) as ROOM;
  const branchs = (await getBranchsAll()) as Branch[];
  const roomTypes = (await getRoomTypesAll()) as ROOMTYPE[];
  return (
    <div>
      <Breadcrumb pageName={`Cập nhật phòng`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Mã phòng: {room?.code}
          </h3>
        </div>
        <div className="p-7">
          {room && (
            <RoomDetailForm
              room={room}
              roomTypes={roomTypes}
              branchs={branchs}
            />
          )}
        </div>
      </div>
    </div>
  );
}
