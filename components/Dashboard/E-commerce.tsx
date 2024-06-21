"use client";
import { getInvoiceForDashboard } from "@/actions/invoice";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import {
  MdMiscellaneousServices,
  MdOutlineBedroomParent,
} from "react-icons/md";
import { LineChart, PieChart } from "../Charts";
import { CardData } from "./CardData";

const Dashboard = ({
  branchCount,
  servicesCount,
  roomCount,
  facilitiesCount,
  studentCount,
}: {
  branchCount: number;
  servicesCount: number;
  roomCount: number;
  facilitiesCount: number;
  studentCount: number;
}) => {
  const [invoice, setInvoice] = useState<any>([]);

  const getChart = async () => {
    const invoice = await getInvoiceForDashboard();
    setInvoice(invoice);
  };
  useEffect(() => {
    getChart();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 gap-7.5 md:grid-cols-2 md:gap-6 xl:grid-cols-1">
        <CardData
          title="Dịch vụ"
          total={String(servicesCount)}
          // rate="0.43%"
          // levelUp
        >
          <MdMiscellaneousServices className="fill-primary text-2xl" />
        </CardData>
        <CardData
          title="Phòng đã cho thuê"
          total={String(roomCount)}
          // rate="0.43%"
          // levelUp
        >
          <MdOutlineBedroomParent className="fill-primary text-2xl" />
        </CardData>
        <CardData
          title="Cơ sở vật chất"
          total={String(facilitiesCount)}
          // rate="0.43%"
          // levelUp
        >
          <FiBox className="text-2xl text-primary" />
        </CardData>
        <CardData
          title="Sinh viên"
          total={String(studentCount)}
          // rate="0.43%"
          // levelUp
        >
          <FaRegUser className="text-2xl text-primary" />
        </CardData>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <LineChart invoiceForLineChart={invoice} />
        <PieChart />
        {/* <ChartTwo /> */}
        {/* <MapOne /> */}

        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default Dashboard;
