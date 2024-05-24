import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CreateNewInvoice } from "@/components/Form/CreateNewInvoice";
import { getRoomsAllHaveStudents } from "@/data/room";
import { ROOM } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lập hóa đơn",
  description: "",
};

const CreateInvoicePage = async () => {
  const room = (await getRoomsAllHaveStudents()) as ROOM[];
  return (
    <div>
      <Breadcrumb pageName="Lập hóa đơn" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <CreateNewInvoice room={room} />
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
