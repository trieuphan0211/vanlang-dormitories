import { Metadata } from "next";
import Detail from "./Detail";

export const metadata: Metadata = {
  title: "Chi tiết phòng",
  description: "",
};

const listImagesSingle = [
  {
    src: "/images/room/single_room.jpeg",
    alt: "Ảnh phòng đơn 1",
  },
  {
    src: "/images/room/single-room/p1.jpeg",
    alt: "Ảnh phòng đơn 2",
  },
  {
    src: "/images/room/single-room/p2.jpeg",
    alt: "Ảnh phòng đơn 3",
  },
  {
    src: "/images/room/single-room/p3.jpeg",
    alt: "Ảnh phòng đơn 4",
  },
  {
    src: "/images/room/single-room/p4.jpg",
    alt: "Ảnh phòng đơn 4",
  },
];

const listImagesDouble = [
  {
    src: "/images/room/single_room.jpeg",
    alt: "Ảnh phòng đơn 1",
  },
  {
    src: "/images/room/single-room/p1.jpeg",
    alt: "Ảnh phòng đơn 2",
  },
  {
    src: "/images/room/single-room/p2.jpeg",
    alt: "Ảnh phòng đơn 3",
  },
  {
    src: "/images/room/single-room/p3.jpeg",
    alt: "Ảnh phòng đơn 4",
  },
  {
    src: "/images/room/single-room/p4.jpg",
    alt: "Ảnh phòng đơn 4",
  },
];

const infoSignle = {
  name: "Phòng đơn",
  price: 1500000,
  desc: "Phòng đơn tại Trường Đại học Văn Lang là không gian tiện nghi và thoải mái, với giường, bàn làm việc, tủ đồ, và các tiện ích chia sẻ như phòng tắm và nhà bếp. Đảm bảo internet, điện và an ninh, phòng đơn là nơi lý tưởng cho sinh viên trải nghiệm cuộc sống đại học.",
  service: [],
  detail: [],
};
const infoDouble = {
  name: "Phòng đôi",
  price: 1000000,
  desc: "Phòng đôi tại ký túc xá Đại học Văn Lang được thiết kế hiện đại và tiện nghi với giường tầng riêng tư, bàn học, kệ sách, máy lạnh, tủ lạnh mini và phòng vệ sinh hiện đại. Mỗi phòng có ban công rộng thoáng để đón ánh sáng tự nhiên. Ký túc xá có hệ thống an ninh chặt chẽ với camera giám sát và thẻ ra vào, cùng với nhiều tiện ích như phòng tự học, canteen, khu thể thao đa năng và rạp chiếu phim. ",
  service: [],
  detail: [],
};
const infoFour = {
  name: "Phòng bốn",
  price: 1000000,
  desc: "Phòng bốn của ký túc xá Trường Đại học Văn Lang được thiết kế rộng rãi và thoáng mát, đảm bảo tiện nghi và không gian sống thoải mái cho sinh viên. Mỗi phòng có diện tích phù hợp để bố trí giường tầng, bàn học, kệ sách, tủ quần áo, và được trang bị đầy đủ các thiết bị hiện đại như máy lạnh, tủ lạnh mini, máy nước nóng-lạnh và phòng vệ sinh riêng biệt. ",
  service: [],
  detail: [],
};
const infoEight = {
  name: "Phòng tám",
  price: 1000000,
  desc: "Phòng tám của ký túc xá Trường Đại học Văn Lang được thiết kế hiện đại và tiện nghi để đáp ứng nhu cầu sinh hoạt và học tập của sinh viên. Mỗi phòng đều có giường tầng nhằm tiết kiệm diện tích, tạo không gian riêng tư cho mỗi sinh viên. Nội thất trong phòng bao gồm bàn học, kệ sách, tủ đồ và giường cá nhân riêng biệt. Phòng còn được trang bị các thiết bị như máy lạnh, tủ lạnh mini, và phòng vệ sinh hiện đại với máy nước nóng-lạnh.",
  service: [],
  detail: [],
};
const DetailPage = ({
  searchParams,
}: {
  searchParams?: {
    type?: string;
  };
}) => {
  let listImages = listImagesSingle;
  let info = infoSignle;
  if (searchParams?.type === "double_room") {
    listImages = listImagesDouble;
    info = infoDouble;
  } else if (searchParams?.type === "four_room") {
    listImages = listImagesDouble;
    info = infoFour;
  } else if (searchParams?.type === "eight_room") {
    listImages = listImagesDouble;
    info = infoEight;
  }
  return <Detail listImages={listImages} info={info} />;
};

export default DetailPage;
