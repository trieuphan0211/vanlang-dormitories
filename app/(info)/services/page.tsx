import { Metadata } from "next";
import { IoShirt, IoWaterOutline } from "react-icons/io5";
import { IconBaseProps } from "react-icons/lib";
import { GiBroom, GiElectric, GiWeightLiftingUp } from "react-icons/gi";
import { FaInternetExplorer } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { TbWashDry3 } from "react-icons/tb";
import { dancingScript } from "@/fonts/fonts";
import { FaWifi } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";

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
    <div className=" w-full text-black">
      <div className="relative flex h-[700px] w-screen items-end overflow-hidden bg-[url('/images/room/general.webp')] bg-center bg-no-repeat before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:block before:bg-gradient-to-t before:from-[#2d334d] before:to-[rgba(0,0,0,0.5)]  ">
        <h1 className="absolute left-[130px] top-[20%] z-1 max-w-[550px] border-l-6 border-red text-left text-6xl font-bold italic leading-normal text-white ">
          Dịch vụ & tiện ích tại Văn Lang
        </h1>
        <p className="absolute bottom-11 right-[130px] z-1 max-w-125 text-justify text-xl text-white ">
          Tại ký túc xá của Trường Đại học Văn Lang, chúng tôi cung cấp một loạt
          các dịch vụ và tiện ích nhằm tạo điều kiện sống thoải mái và hỗ trợ
          cho sinh viên. Các dịch vụ bao gồm phòng ở tiện nghi với Wi-Fi miễn
          phí và an ninh 24/7, cùng với các tiện ích như phòng tập thể, dịch vụ
          vệ sinh và giặt ủi. Ngoài ra, ký túc xá còn có khu vực ăn uống và tổ
          chức các hoạt động xã hội và sự kiện để tạo ra một môi trường sống
          tích cực và phát triển cho sinh viên.
        </p>
      </div>

      <div className="flex flex-col items-center bg-[#2d334d] p-4">
        <h1
          className={`${dancingScript.className} text-7xl leading-normal text-primary`}
        >
          Dịch vụ & tiện ích
        </h1>
        <p className="text-lg italic tracking-widest text-white">
          Hội tụ ngàn tiện ích “All in one” đẳng cấp
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 py-5">
          <div className="flex w-[400px] flex-col items-center gap-2 bg-[#1c223e] p-5 text-white shadow-12">
            <FaWifi className="text-8xl text-primary" />
            <h3 className={`${dancingScript.className} text-4xl`}>
              Wifi & Internet
            </h3>
            <p className="text-center text-base italic">
              Dịch vụ cung cấp kết nối và internet tốc độ cao
            </p>
          </div>
          <div className="flex w-[400px] flex-col items-center gap-2 bg-[#1c223e] p-5 text-white shadow-12">
            <FaLightbulb className="text-8xl text-primary" />
            <h3 className={`${dancingScript.className} text-4xl`}>
              Điện & Nước
            </h3>
            <p className="text-center text-base italic">
              Cung cấp dịch vụ điện và nước ổn định, an toàn
            </p>
          </div>
          <div className="flex w-[400px] flex-col items-center gap-2 bg-[#1c223e] p-5 text-white shadow-12">
            <GiBroom className="text-8xl text-primary" />
            <h3 className={`${dancingScript.className} text-4xl`}>Dọn phòng</h3>
            <p className="text-center text-base italic">
              Đảm bảo vệ sinh, dọn dẹp phòng ở hàng ngày
            </p>
          </div>
          <div className="flex w-[400px] flex-col items-center gap-2 bg-[#1c223e] p-5 text-white shadow-12">
            <IoShirt className="text-8xl text-primary" />
            <h3 className={`${dancingScript.className} text-4xl`}>Giặt ủi</h3>
            <p className="text-center text-base italic">
              Dịch vụ giặt ủi nhanh chóng, tiện lợi
            </p>
          </div>
          <div className="flex w-[400px] flex-col items-center gap-2 bg-[#1c223e] p-5 text-white shadow-12">
            <RiEBikeFill className="text-8xl text-primary" />
            <h3 className={`${dancingScript.className} text-4xl`}>Giữ xe</h3>
            <p className="text-center text-base italic">
              Dịch vụ giữ xe an toàn, tiện lợi cho sinh viên
            </p>
          </div>
          <div className="flex w-[400px] flex-col items-center gap-2 bg-[#1c223e] p-5 text-white shadow-12">
            <GiWeightLiftingUp className="text-8xl text-primary" />
            <h3 className={`${dancingScript.className} text-4xl`}>Phòng Gym</h3>
            <p className="text-center text-base italic">
              Trang bị phòng gym hiện đại, tiện nghi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
