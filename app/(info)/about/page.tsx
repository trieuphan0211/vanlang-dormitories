import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "",
};
const RoomPage = () => {
  return (
    <main className="">
      <div className="relative flex h-150 w-screen items-end bg-[url('/images/about/room-bg.webp')] before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:block before:bg-gradient-to-t before:from-rose-900 before:to-black before:opacity-50 before:blur-sm">
        <h1 className="z-1 p-10 text-center text-7xl font-bold italic leading-normal text-white">
          Ký túc xá Trường Đại học Văn Lang: Không gian sống lý tưởng dành cho
          tân sinh viên
        </h1>
      </div>
      <div className="p-10 text-lg text-black">
        <div className="m-auto max-w-[1300px]">
          <p className="font-semibold">
            Hiện nay, trường Đại học Văn Lang có 2 khu Ký túc xá dành cho sinh
            viên, đây là ngôi nhà chung ấm cúng, tiện nghi dành cho sinh viên
            đến từ nhiều tỉnh, thành đang học tập tại Trường. Không chỉ đáp ứng
            nhu cầu về chỗ ở, ký túc xá còn là nơi tạo dựng tinh thần đoàn kết,
            khơi nguồn cảm hứng và tạo động lực học tập cho sinh viên. Quãng
            thời gian sống ở ký túc xá sẽ là những kỷ niệm đáng nhớ trong hành
            trình 4 năm đại học.
          </p>
          <div className="py-10">
            <h2 className="pb-5  text-center text-3xl font-bold">
              Ký túc xá 61A-B Phan Huy Ích, Phường 14, Q. Gò Vấp, TP. Hồ Chí
              Minh
            </h2>
            <p className="font-medium">
              Đây là Khu ký túc xá đầu tiên của Trường Đại học Văn Lang với 6
              tầng và 82 phòng được xây dựng khang trang, đầy đủ đảm bảo chỗ ở,
              học tập và sinh hoạt thoải mái. Khu Ký túc xá được thiết kế xây
              dựng tạo không gian thông thoáng và sạch sẽ. Các phòng được bố trí
              giường tầng riêng tư tạo sự gọn gàng và tiết kiệm diện tích. Mỗi
              phòng ở ký túc xá có bố trí nhà vệ sinh riêng và hành lang rộng
              rãi, thông thoáng, được trang bị các thiết bị công nghệ tin hiện
              đại để phục vụ nhu cầu sinh hoạt và học tập. Ký túc xá dành toàn
              bộ khuôn viên lầu 1 làm canteen và khu vực sinh hoạt tập thể thoải
              mái, vui tươi cho người ở.
            </p>
            <div className="my-3 flex flex-col items-center">
              <Image
                src="/images/about/phong-phanhuyich.jpg"
                alt="Phòng ở Phan Huy Ích"
                width={1000}
                height={500}
              />
              <p className="text-center italic">
                Ký túc xá được bố trí giường tầng riêng tư, gọn gàng và tiết
                kiệm diện tích
              </p>
            </div>
            <p className="font-medium">
              Ký túc xá sẽ ưu tiên cho sinh viên năm nhất khi đăng ký chỗ ở. Các
              bạn sinh viên năm nhất trước khi đăng ký được Nhà trường tư vấn,
              bố trí xe đưa đón tham quan ký túc xá trước khi đăng ký với thủ
              tục đơn giản và nhanh chóng.
            </p>
          </div>
          <div className="py-10">
            <h2 className="pb-5  text-center text-3xl font-bold">
              Ký túc xá tại Cơ sở chính Trường Đại học Văn Lang - 69/68 Đặng
              Thùy Trâm, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh
            </h2>
            <p className="font-medium">
              Khu ký túc xá sinh viên dự kiến được đưa vào sử dụng từ tháng
              11/2023. Đây sẽ là tòa nhà tiếp theo thành hình trong khuôn viên
              khu phức hợp giáo dục Văn Lang, góp phần hoàn thiện hệ sinh thái
              toàn diện phục vụ người học và các hoạt động của nhà trường. Nằm
              ngay trong khuôn viên Cơ sở chính, khu ký túc xá còn kết nối các
              cung đường đến các tòa nhà học, giúp sinh viên thuận tiện và tiết
              kiệm thời gian di chuyển đến lớp, thư viện, hồ bơi, khu thực hành,
              tạo điều kiện thuận lợi cho việc học tập và phát triển cá nhân.
            </p>
            <div className="my-3 flex flex-col items-center">
              <Image
                src="/images/about/room-bg.jpg"
                alt="Phòng ở Phan Huy Ích"
                width={1000}
                height={500}
              />
              <p className="text-center italic">
                Với cơ sở hạ tầng hiện đại, kiến trúc tiên tiến, khối ký túc xá
                mới của Trường Đại học Văn Lang gồm 1.026 chỗ ở dành cho sinh
                viên.
              </p>
            </div>
            <p className="font-medium">
              Khối ký túc xá này gồm 1.026 chỗ ở dành cho sinh viên. Các phòng ở
              rộng rãi, thoáng mát. Mỗi phòng đều có ban công rộng, thoáng để
              đón ánh sáng tự nhiên, được trang bị đầy đủ nội thất sang trọng
              như máy lạnh, tủ lạnh mini, phòng vệ sinh hiện đại, máy nước nóng
              - lạnh, bàn học, kệ sách, tủ đồ, giường cá nhân riêng biệt.
            </p>
            <div className="my-3 flex flex-col items-center">
              <Image
                src="/images/about/space-learning.jpg"
                alt="Phòng ở Phan Huy Ích"
                width={1000}
                height={500}
              />
              <p className="text-center italic">
                Không gian học tập cực &ldquo;chill&quot; của sinh viên Văn Lang
                tại ký túc xá mới
              </p>
            </div>
            <div className="my-3 flex flex-col items-center">
              <Image
                src="/images/about/clean-spacing.jpg"
                alt="Phòng ở Phan Huy Ích"
                width={1000}
                height={500}
              />
              <p className="text-center italic">
                Không gian chăm sóc và vệ sinh cá nhân
              </p>
            </div>
            <p className="font-medium">
              Sinh viên Văn Lang sống tại ký túc xá được thụ hưởng nhiều dịch vụ
              tiện ích đẳng cấp như phòng tự học, canteen, phòng giặt ủi, khu
              thể thao đa năng, sân chơi lớn hơn 1000m2, ăn uống, coffee, khu
              giải trí, rạp chiếu phim… sẽ vận hành trong thời gian sắp tới. Hệ
              thống thang máy hiện đại 3s/tầng tiết kiệm thời gian di chuyển. An
              ninh mỗi tầng được đảm bảo nghiêm ngặt với camera giám sát và đội
              ngũ bảo vệ trực tiếp, đảm bảo môi trường sống an toàn cho các bạn
              sinh viên khi đi học xa nhà.
            </p>
            <p>
              Tất cả tiện ích đã tạo nên một địa điểm sống lý tưởng, vừa giúp
              sinh viên hòa nhập cuộc sống cộng đồng lành mạnh, vừa đủ không
              gian riêng tư, thoải mái, thư giãn sau những giờ học tại giảng
              đường.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RoomPage;
