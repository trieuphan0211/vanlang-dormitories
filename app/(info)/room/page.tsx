import { Metadata } from "next";
import { FaInternetExplorer } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { GiElectric } from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { IconBaseProps } from "react-icons/lib";
import { MdOutlineSecurity } from "react-icons/md";
import { TbWashDry3 } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Loại phòng",
  description: "",
};
interface ServiceItem {
  img: string;
  title: string;
  cost: string;
}
const serviceItems: ServiceItem[] = [
  {
    img: "",
    title: "Phòng 1 giường",
    cost: "1,000,000đ/tháng",
  },
];
const RoomPage = () => {
  return (
    <div className="h-screen w-full bg-[url(/images/background/ky_tuc_xa.jpg)] p-8 font-sans text-black">
      <h1 className="p-8 text-center text-4xl font-bold uppercase tracking-wider text-white">
        Các loại phòng
      </h1>
      <div className="grid w-full grid-cols-3 gap-9">
        {serviceItems.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 rounded-lg bg-white p-3 shadow-9 transition-all hover:z-10 hover:scale-110 hover:cursor-pointer hover:shadow-14"
          >
            <>{item.img}</>
            <div>
              <h2 className="mb-2 text-2xl font-semibold">{item.title}</h2>
              <p className="text-lg font-medium">{item.cost}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
