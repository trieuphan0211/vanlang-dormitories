import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AddNewRegister } from "@/components/Form/AddNewRegister";
import { getAllBranchs } from "@/data/branch";
import { getRoomTypesAll } from "@/data/room-type";
import { BRANCH, ROOMTYPE } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo đăng ký ký túc xá",
  description: "",
};

const CreatePage = async () => {
  const branchs = (await getAllBranchs()) as BRANCH[];
  const roomTypes = (await getRoomTypesAll()) as ROOMTYPE[];
  return (
    <div>
      <Breadcrumb pageName="Tạo đăng ký ký túc xá" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <AddNewRegister branchs={branchs} roomTypes={roomTypes} />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
