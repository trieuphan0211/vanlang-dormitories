import { Metadata } from "next";
import { IoWaterOutline } from "react-icons/io5";
import { IconBaseProps } from "react-icons/lib";
import { GiElectric } from "react-icons/gi";
import { FaInternetExplorer } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { TbWashDry3 } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Dịch vụ",
  description: "",
};
interface ServiceItem {
  img: IconBaseProps;
  title: string;
  cost: string;
}
const serviceItems: ServiceItem[] = [
  {
    img: (
      <GiElectric
        className="h-16 w-16
text-[#f57b20]"
      />
    ),
    title: "Điện",
    cost: "4,000đ/1kwh",
  },
  {
    img: (
      <IoWaterOutline
        className="h-20 w-20
text-[#f57b20]"
      />
    ),
    title: "Nước",
    cost: "4,000đ/1m3",
  },
  {
    img: (
      <FaInternetExplorer
        className="h-20 w-20
text-[#f57b20]"
      />
    ),
    title: "Internet",
    cost: "100,000đ/tháng",
  },
  {
    img: (
      <FiTrash2
        className="h-20 w-20
text-[#f57b20]"
      />
    ),
    title: "Rác",
    cost: "50,000đ/tháng",
  },
  {
    img: (
      <TbWashDry3
        className="h-20 w-20
text-[#f57b20]"
      />
    ),
    title: "Giặt ủi",
    cost: "20,000đ/kg",
  },
  {
    img: (
      <MdOutlineSecurity
        className="h-20 w-20
text-[#f57b20]"
      />
    ),
    title: "An ninh",
    cost: "200,000đ/tháng",
  },
];
const ServicesPage = () => {
  return (
    <div className="h-screen w-full bg-[url(/images/background/ky_tuc_xa.jpg)] p-8 font-sans text-black">
      <h1 className="p-8 text-center text-4xl font-bold uppercase tracking-wider text-white">
        Các loại dịch vụ
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

export default ServicesPage;
