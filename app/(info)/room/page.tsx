import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { dancingScript } from "@/fonts/fonts";
import { FaChevronRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Loại phòng",
  description: "",
};
interface ServiceItem {
  img: string;
  title: string;
  link: string;
  description: string;
}
const serviceItems: ServiceItem[] = [
  {
    img: "/images/room/single_room.jpeg",
    title: "Phòng đơn",
    link: "/room/detail?type=single_room",
    description:
      "Phòng nhỏ dành cho một người, có giường đơn và tiện nghi cơ bản như bàn làm việc và phòng tắm riêng.",
  },
  {
    img: "/images/room/double_room.webp",
    title: "Phòng đôi",
    link: "/room/detail?type=double_room",
    description:
      "Phòng lớn hơn, có hai giường đơn hoặc một giường lớn, phù hợp cho cặp đôi hoặc nhóm hai người.",
  },
  {
    img: "/images/room/four_room.webp",
    title: "Phòng bốn ",
    link: "/room/detail?type=four_room",
    description:
      "Phòng dành cho nhóm bốn người, có bốn giường đơn hoặc hai giường đôi, cung cấp không gian rộng rãi và tiện ích.",
  },
  {
    img: "/images/room/eight_room.jpg",
    title: "Phòng tám ",
    link: "/room/detail?type=eight_room",
    description:
      "Phòng dành cho nhóm lớn, có tám giường đơn hoặc bốn giường đôi, cung cấp không gian rộng lớn và tiện nghi đầy đủ.",
  },
];
const RoomPage = () => {
  return (
    <div className=" w-full text-black">
      <div className="relative flex h-[700px] w-screen items-end overflow-hidden bg-[url('/images/room/general.webp')] bg-center bg-no-repeat before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:block before:bg-gradient-to-t before:from-[#2d334d] before:to-[rgba(0,0,0,0.5)] sm:flex-col sm:px-4">
        <h1 className="absolute left-[130px] top-[20%] z-1 max-w-[450px] border-l-6 border-red text-left text-6xl font-bold italic leading-normal text-white sm:relative sm:left-auto sm:top-auto sm:my-10 sm:text-5xl">
          Các loại phòng tại Văn Lang
        </h1>
        <p className="absolute bottom-11 right-[130px] z-1 max-w-125 text-justify text-xl text-white sm:relative sm:bottom-auto sm:right-auto">
          Tại ký túc xá Trường Đại học Văn Lang, chúng tôi cung cấp một loạt các
          loại phòng đa dạng để phục vụ nhu cầu và sở thích của sinh viên.Với sự
          đa dạng trong các loại phòng, sinh viên tại ký túc xá của chúng tôi có
          thể lựa chọn loại phòng phù hợp nhất với nhu cầu và phong cách sống
          của mình, đồng thời tận hưởng một môi trường sống thoải mái và tiện
          nghi.
        </p>
      </div>
      <div className="flex flex-col items-center bg-[#2d334d] p-4">
        <h1
          className={`${dancingScript.className} text-7xl leading-normal text-primary`}
        >
          Loại Phòng
        </h1>
        <p className="text-lg italic tracking-widest text-white">
          Đỉnh Cao Cuộc Sống Sinh Viên
        </p>
        <div className="mt-10 flex justify-center gap-10 md:flex-wrap">
          {serviceItems.map((item, index) => (
            <div
              key={index}
              className=" flex max-w-[300px] flex-col items-start justify-between gap-3 text-justify text-white"
            >
              <div className="group">
                <div className="flex max-h-[200px] items-center overflow-hidden lg:h-[200px]">
                  <Image
                    src={item.img}
                    width={1000}
                    height={1000}
                    alt={item.title}
                    className="h-full w-full bg-cover bg-center transition-all group-hover:scale-110"
                  />
                </div>

                <h2
                  className={`${dancingScript.className} text-2xl text-primary `}
                >
                  {item.title}
                </h2>
                <p>{item.description}</p>
              </div>
              <Link
                href={item.link}
                className="group/more flex cursor-pointer items-center gap-3 font-semibold text-primary hover:text-[#d72134]"
              >
                Xem thêm
                <div className="rounded-r-2xl bg-[#d72134] px-2 py-1 text-white transition-all group-hover/more:translate-x-4">
                  <FaChevronRight />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
