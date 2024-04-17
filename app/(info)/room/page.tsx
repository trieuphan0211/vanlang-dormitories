import { Metadata } from "next";
import Image from "next/image";

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
    img: "/images/room/double-room.webp",
    title: "Phòng đôi",
    cost: "2,000,000đ/tháng",
  },
  {
    img: "/images/room/four-room.webp",
    title: "Phòng 4 người",
    cost: "1,500,000đ/tháng",
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
            className=" flex flex-col items-center rounded-lg bg-white p-3 shadow-9 transition-all hover:z-10 hover:scale-110 hover:cursor-pointer hover:shadow-14"
          >
            <Image src={item.img} alt={item.title} width={300} height={200} />
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
