import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();
interface Branch {
  name: string;
  address: string;
  floorNumber: number;
  description?: string;
  img?: string;
}
interface Service {
  name: string;
  cost: number;
  unit: string;
  allow: boolean;
}

interface RoomType {
  name: string;
  members: number;
  cost: number;
}
interface ViolateType {
  name: string;
  description?: string;
  point: number;
  allow: boolean;
}

interface FacilitiesType {
  name: string;
}
const branches: Branch[] = [
  {
    name: "Ký túc xá cơ sở chính Trường đại học Văn Lang",
    address:
      "69/68 Đặng Thùy Trâm, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh",
    floorNumber: 12,
  },
  {
    name: "Ký túc xá Phan Huy Ích",
    address: "160/63 Phan Huy Ích, Phường 13, Quận Gò Vấp",
    floorNumber: 12,
  },
];

const services: Service[] = [
  {
    name: "Điện",
    cost: 4000,
    unit: "kWh",
    allow: true,
  },
  {
    name: "Nước",
    cost: 20000,
    unit: "m3",
    allow: true,
  },
  {
    name: "Internet",
    cost: 100000,
    unit: "tháng",
    allow: false,
  },
  {
    name: "Vệ sinh",
    cost: 50000,
    unit: "tháng",
    allow: false,
  },
  {
    name: "Giữ xe",
    cost: 50000,
    unit: "tháng",
    allow: false,
  },
  {
    name: "Giặt ủi",
    cost: 100000,
    unit: "tháng",
    allow: false,
  },
  {
    name: "Đồ ăn",
    cost: 200000,
    unit: "tháng",
    allow: false,
  },
];

const roomTypes: RoomType[] = [
  {
    name: "Phòng đôi",
    members: 2,
    cost: 2000000,
  },
  {
    name: "Phòng 4 người",
    members: 4,
    cost: 1500000,
  },
];
const facilitiesTypes: FacilitiesType[] = [
  {
    name: "Bàn",
  },
  {
    name: "Ghế",
  },
  {
    name: "Tủ",
  },
  {
    name: "Giường",
  },
  {
    name: "Tủ lạnh",
  },
  {
    name: "Tivi",
  },
  {
    name: "Máy lạnh",
  },
  {
    name: "Máy nước nóng",
  },
  {
    name: "Máy giặt",
  },
  {
    name: "Máy sấy",
  },
  {
    name: "Máy hút",
  },
  {
    name: "Máy nước nóng",
  },
  {
    name: "Máy nước lạnh",
  },
];
const violateTypes: ViolateType[] = [
  {
    name: "Quá giờ ra vào",
    point: 1,
    allow: false,
    description: "",
  },
  {
    name: "Hút thuốc lá trong khu vực cấm",
    point: 2,
    allow: false,
    description: "",
  },
  {
    name: "Đánh nhau",
    point: 3,
    allow: false,
    description: "",
  },
  {
    name: "Làm ồn",
    point: 1,
    allow: false,
    description: "",
  },
  {
    name: "Vứt rác không đúng nơi quy định",
    point: 1,
    allow: false,
    description: "",
  },
  {
    name: "Làm hỏng cơ sở vật chất",
    point: 2,
    allow: true,
    description: "",
  },
  {
    name: "Trễ hạn nộp tiền phòng",
    point: 1,
    allow: false,
    description: "",
  },
];
//  handle seeding data
async function seedBranch() {
  try {
    const branchs = await prisma.branch.createMany({ data: branches });
    console.log(`Seeded ${branchs.count} branches`);
    return branchs;
  } catch (error) {
    console.error("Error seeding branch", error);
  }
}
async function seedService() {
  try {
    const data = await prisma.services.createMany({ data: services });
    console.log(`Seeded ${data.count} services`);
    return data;
  } catch (error) {
    console.error("Error seeding services", error);
  }
}
async function seedRoomType() {
  const data = roomTypes.map(async (item) => {
    try {
      const token = "RT" + crypto.randomInt(100_000, 1_000_000).toString();
      const data = await prisma.roomType.createMany({
        data: { ...item, code: token },
      });
      return data;
    } catch (error) {
      console.log("Error seeding room type", error);
    }
  });
  console.log(`Seeded ${data.length} room type`);
}

async function seedFacilitiesType() {
  const data = facilitiesTypes.map(async (item) => {
    try {
      const token = "FT" + crypto.randomInt(100_000, 1_000_000).toString();
      const data = await prisma.facilitiesType.createMany({
        data: { ...item, code: token },
      });
      return data;
    } catch (error) {
      console.log("Error seeding facilities type", error);
    }
  });
  console.log(`Seeded ${data.length} facilities type`);
}
async function seedViolateType() {
  const data = violateTypes.map(async (item) => {
    try {
      const token = "VT" + crypto.randomInt(1_000, 10_000).toString();
      const data = await prisma.violateType.createMany({
        data: { ...item, code: token },
      });
      return data;
    } catch (error) {
      console.log("Error seeding violate type", error);
    }
  });
  console.log(`Seeded ${data.length} violate type`);
}
async function main() {
  await seedBranch();
  await seedService();
  await seedRoomType();
  await seedFacilitiesType();
  await seedViolateType();
}
main()
  .catch((err) => {
    console.error(
      "An error occurred while attempting to seed the database:",
      err,
    );
  })
  .finally(() => {
    prisma.$disconnect();
  });
