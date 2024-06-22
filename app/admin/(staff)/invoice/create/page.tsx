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
      <Breadcrumb
        pageName="Lập hóa đơn"
        link={[
          { name: "Hóa đơn", link: "/admin/invoice" },
          { name: "Lập hóa đơn", link: "/admin/invoice/create" },
        ]}
      />
      <div className="dark:border-strokedark dark:bg-boxdark">
        <div className=" dark:border-strokedark">
          <CreateNewInvoice room={room} />
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
