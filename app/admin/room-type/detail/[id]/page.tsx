import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomTypeDetailForm } from "@/components/FormElements/RoomTypeDetailForm";
import { getRoomTypeById } from "@/data/room-type";
import { ROOMTYPE } from "@/types/room-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết loại phòng",
  description: "",
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const roomType = (await getRoomTypeById(params.id)) as ROOMTYPE;
  console.log(roomType);
  return (
    <div>
      <Breadcrumb pageName={`Chi tiết loại phòng`} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Loại phòng: {roomType?.name}
          </h3>
        </div>
        <div className="p-7">
          {" "}
          {roomType && (
            <RoomTypeDetailForm roomType={roomType} type={"detail"} />
          )}
        </div>
      </div>
    </div>
  );
}
