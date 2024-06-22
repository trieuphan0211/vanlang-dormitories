import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { RoomTypeDetailForm } from "@/components/Form/RoomTypeDetailForm";
import { getRoomTypeById } from "@/data/room-type";
import { ROOMTYPE } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cập nhật loại phòng",
  description: "",
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const roomType = (await getRoomTypeById(params.id)) as ROOMTYPE;
  return (
    <div>
      <Breadcrumb
        pageName={`Cập nhật loại phòng`}
        link={[
          { name: "Loại phòng", link: "/admin/room-type" },
          { name: "Cập nhật", link: `/admin/room-type/${params.id}` },
        ]}
      />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Loại phòng: {roomType?.name}
          </h3>
        </div>
        <div className="p-7">
          {roomType && <RoomTypeDetailForm roomType={roomType} />}
        </div>
      </div>
    </div>
  );
}
