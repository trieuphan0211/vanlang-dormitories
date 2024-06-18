import { Footer } from "@/components/Footer/Footer";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="absolute left-0 right-0 top-0 min-h-screen w-screen overflow-hidden">
      <div className="absolute left-0 right-0 top-0 h-[1050px] w-screen overflow-hidden bg-[url('/images/background/ktx_i.jpeg')] bg-cover bg-fixed "></div>
      <div className="mt-[1050px] flex items-center justify-center gap-20 p-10 lg:flex-col lg:gap-5">
        <iframe
          className="aspect-video h-[450px]  rounded-2xl lg:h-full  lg:w-full"
          src="https://www.youtube.com/embed/wgb22CwNDTs"
        ></iframe>
        <div className="relative flex h-[450px]  items-end sm:flex-col lg:h-auto">
          <div className="p absolute -left-50 top-20 inline-block w-[700px] bg-[#2d334d]  p-10 sm:relative sm:!right-auto sm:!top-auto sm:!w-full sm:text-center md:w-4/5 lg:-top-22 lg:left-auto lg:right-0 lg:py-3">
            <h1 className="text-3xl font-bold text-[#f57b20] md:text-2xl">
              Sống nâng tầm khơi nguồn cảm hứng
            </h1>
          </div>
          <div className="mb-25 max-w-[500px] text-justify text-lg lg:max-w-full">
            <p className="text-black">
              Ký túc xá Trường đại học Văn Lang với sứ mệnh không chỉ đáp ứng
              nơi học tập sinh hoạt phù hợp, mà còn là nơi &ldquo;hội tụ&rdquo;
              những đặc trưng đầy
              <strong className="uppercase text-[#f57b20]">cảm hứng</strong> và
              bản sắc
              <strong className="uppercase text-[#f57b20]">tự hào</strong>, tạo
              bước đệm cho sự phát triển toàn diện của sinh viên Văn Lang
            </p>
          </div>
        </div>
      </div>
      <Image
        src={"/images/background/bg_3.jpg"}
        width={10000}
        height={10000}
        alt="bg_3.jpg"
      />
      {/* <div className="flex h-[1000px] items-end bg-[url('/images/background/bg_room.png')] bg-cover">
        <div className="max-w-[450px] space-y-11 p-10 text-white">
          <h1 className="text-center text-5xl font-bold uppercase leading-tight">
            Không gian <br />{" "}
            <strong className="in text-7xl font-bold"> tái tạo</strong> <br />{" "}
            năng lượng
          </h1>
          <p className="text-justify">
            Tập trung và yếu tố tái tạo năng lượng, mỗi phòng được thiết kế tối
            ưu không gian sống và sinh hoạt. Tất cả các phòng đều sỡ hữu ban
            công kinh, tận dụng ánh sáng và gió tự nhiên, kết hợp cùng nội thất
            tinh giản để chuyển hóa thành nguồn năng lương phấn khởi và tràn đầy
            sinh khí.
          </p>
          <div className="rounded-r-full bg-[rgba(255,255,255,0.5)] px-10 py-3 text-3xl font-bold">
            ~ 30m<sup>2</sup>/4 sinh viên
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center rounded-b-full bg-gradient-to-r from-[#5ec6e1] to-[#93c7d5] p-1">
              <h1 className="text-3xl font-bold">04</h1>{" "}
              <p className="text-xs font-bold">Giường tầng</p>
              <LiaBedSolid className="text-7xl" />
            </div>
            <div className="flex flex-col items-center rounded-b-full bg-gradient-to-r from-[#5ec6e1] to-[#93c7d5] p-1">
              <h1 className="text-3xl font-bold">04</h1>{" "}
              <p className="text-xs font-bold">Bộ bàn ghế</p>
              <MdOutlineTableRestaurant className="text-7xl" />
            </div>
            <div className="flex flex-col items-center rounded-b-full bg-gradient-to-r from-[#5ec6e1] to-[#93c7d5] p-1">
              <h1 className="text-3xl font-bold">04</h1>{" "}
              <p className="text-xs font-bold">TỦ quần áo</p>
              <BiCabinet className="text-7xl" />
            </div>
            <div className="flex flex-col items-center rounded-b-full bg-gradient-to-r from-[#5ec6e1] to-[#93c7d5] p-1">
              <h1 className="text-3xl font-bold">01</h1>{" "}
              <p className="text-xs font-bold">Toilet</p>
              <PiToiletBold className="text-7xl" />
            </div>
            <div className="flex flex-col items-center rounded-b-full bg-gradient-to-r from-[#5ec6e1] to-[#93c7d5] p-1">
              <h1 className="text-3xl font-bold">01</h1>{" "}
              <p className="text-xs font-bold">Phòng tắm</p>
              <LuBath className="text-7xl" />
            </div>
            <div className="flex flex-col items-center rounded-b-full bg-gradient-to-r from-[#5ec6e1] to-[#93c7d5] p-1">
              <h1 className="text-3xl font-bold">01</h1>{" "}
              <p className="text-xs font-bold">Ban công</p>
              <MdOutlineBalcony className="text-7xl" />
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col items-center gap-10 p-10">
        <div className="flex items-center gap-5 md:flex-col">
          <Image
            src="/images/bath_room.png"
            alt="Cooking room"
            width={600}
            height={300}
            className="rounded-xl"
          />
          <div className="max-w-[600px] space-y-6 text-[#2d334d]">
            <h1 className="text-4xl font-bold">Khu vực giặt - sấy hiện đại</h1>
            <p className="text-justify text-xl">
              Khu vực giặt - sấy hiện đại đem lại co sinh viên sự thuận tiện
              trong nếp sống, bất kể thười tiết nắng mưa vẫn tự tin sạch sẽ,
              thơm mát mỗi ngày.
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center gap-5 md:flex-col">
          <Image
            src="/images/cook_room.png"
            alt="Cooking room"
            width={600}
            height={300}
            className="rounded-xl"
          />
          <div className="max-w-[600px] space-y-6 text-[#2d334d]">
            <h1 className="text-4xl font-bold">Khu bếp chung</h1>
            <p className="text-justify text-xl">
              Khu bếp chung với lối thiết kế chỉnh chu, gọn gàng, tinh tế, trang
              bị đầy đủ các thiết bị phục vụ cho nhu cầu chuẩn bị bữa ăn ngon.
              Bên cạnh đó, không gian bàn ăn thoải mái tạo điều kiện lý tưởng
              giúp bạn thưởng thức món ăn trọn vị.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 md:flex-col">
          <Image
            src="/images/fitness_room.png"
            alt="Cooking room"
            width={600}
            height={300}
            className="rounded-xl"
          />
          <div className="max-w-[600px] space-y-6 text-[#2d334d]">
            <h1 className="text-4xl font-bold">Trải nghiệm vô vàn tiện ích</h1>
            <p className="text-justify text-xl">
              Trải nghiệm các tiện ích không thể bỏ lỡ được mở ra trong chính
              không gian sống của bạn.
            </p>
          </div>
        </div>
      </div>
      <Image
        src={"/images/background/bg_4.jpg"}
        width={10000}
        height={10000}
        alt="bg_4.jpg"
      />
      {/* <div
        className="relative flex h-[1000px] items-end bg-[url('/images/background/working.png')]
      bg-cover after:absolute after:bottom-0 after:top-0 after:w-11 after:bg-gradient-to-b after:from-[rgb(245,123,32,0.2)] after:to-[rgb(255,255,255,0.2)]"
      >
        <div className="absolute left-[150px] top-[100px] z-1 flex flex-col items-center justify-center gap-2 rounded-b-full border-[25px] border-[rgba(255,252,252,0.7)] px-5 pb-15 pt-5 text-white">
          <h1 className="text-7xl font-bold uppercase tracking-tighter">
            Quản lý
          </h1>
          <h1 className="text-7xl font-bold uppercase tracking-tighter">
            tân tiến
          </h1>
          <h1 className="text-7xl font-bold uppercase tracking-tighter">
            trăn trở
          </h1>
          <h1 className="text-7xl font-bold uppercase tracking-tighter">
            tan biến
          </h1>
        </div>

        <div className=" absolute right-0 top-0 z-1 max-w-[600px] space-y-4 rounded-bl-[50px] bg-gradient-to-r from-[rgba(255,166,65,0.8)] to-[rgba(0,0,0,0.5)] p-6 text-white">
          <h1 className="font-satoshi text-8xl font-semibold uppercase">
            &ldquo;3 an&rdquo;:
          </h1>
          <div className="flex gap-3">
            <div className="mt-2 h-8 w-7 min-w-7 rounded-b-full bg-white"></div>
            <div className="">
              <h3 className="text-xl font-medium">
                &ldquo;<strong> AN NINH</strong> là ưu tiên, không phân biệt bạn
                ở khu vực nào&rdquo;
              </h3>
              <p className=" text-sm font-light">
                Trang bị hệ thống Camera giám sát và đội ngũ quản lý chuyên
                nghiệp túc trực 24/7.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-2 h-8 w-7 min-w-7 rounded-b-full bg-white"></div>
            <div>
              <h3 className="text-xl font-medium">
                &ldquo;Đảm bảo <strong> AN TOÀN</strong> cho bạn và tài sản cá
                nhân&rdquo;
              </h3>

              <p className=" text-sm font-light">
                Bố trí hệ thống phòng cháy chữa cháy theo tiêu chuẩn cao cấp &
                bảo dưỡng hệ thống điện định kỳ.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-2 h-8 w-7 min-w-7 rounded-b-full bg-white"></div>
            <div>
              <h3 className="text-xl font-medium">
                &ldquo;<strong>AN TÂM</strong> sống và tận hưởng hành trình của
                bạn&rdquo;
              </h3>

              <p className=" text-sm font-light">
                Cung cấp không gian phục vụ toàn diện nhu cầu sống - lĩnh hội -
                phát triển cuộc sống sinh viên mà không cần lo lắng về vấn đề an
                ninh và an toàn.
              </p>
            </div>
          </div>
          <h1 className="text-4xl font-bold uppercase">
            <strong className="text-6xl">internet</strong>
            <br />
            phủ từng milinet
          </h1>
          <h3 className="text-xl font-medium">
            Trang bị đầy đủ wifi toàn bộ hệ thống Ký túc xá
          </h3>
          <div className="inline-block rounded-r-full bg-white px-5 py-2 font-bold text-[#f57b20]">
            Thời gian ra vào KTX: 05:00 - 23:00
          </div>
        </div>
      </div> */}
      <Footer />
    </main>
  );
}
