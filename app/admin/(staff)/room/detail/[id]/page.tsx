import { getBranchsAll } from "@/actions/branch";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomDetailForm } from "@/components/Form/RoomDetailForm";
import { getRoomById } from "@/data/room";
import { getRoomTypesAll } from "@/data/room-type";
import { getServicesAll } from "@/data/services";
import { BRANCH, ROOM, ROOMTYPE, SERVICES } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết phòng",
  description: "",
};
export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const room = (await getRoomById(params.id)) as ROOM;
  const branchs = (await getBranchsAll()) as BRANCH[];
  const roomTypes = (await getRoomTypesAll()) as ROOMTYPE[];
  const services = (await getServicesAll()) as SERVICES[];
  return (
    <div>
      <Breadcrumb
        pageName={`Chi tiết phòng`}
        link={[
          { name: "Phòng", link: "/admin/room" },
          { name: "Chi tiết", link: `/admin/room/detail/${params.id}` },
        ]}
      />
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
              services={services}
              type="detail"
            />
          )}
        </div>
      </div>
    </div>
  );
}
