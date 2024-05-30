"use client";
import { dancingScript } from "@/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

const Detail = ({
  listImages,
  info,
}: {
  listImages: { src: string; alt: string }[];
  info: {
    name: string;
    price: number;
    desc: string;
    service: string[];
    detail: string[];
  };
}) => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(listImages[0]);
  return (
    <div className="w-full">
      <div className="relative flex h-[250px] items-center justify-center bg-[url('/images/room/background_1.webp')] bg-cover bg-center before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:block before:bg-gradient-to-t before:from-[#2d334d] before:to-[rgba(0,0,0,0.5)]  ">
        <div className="relative z-1 text-white">
          <h1
            className={`${dancingScript.className} text-center text-6xl text-[#d72134]`}
          >
            {info.name}
          </h1>
          <nav className="flex items-center gap-4 text-lg font-semibold tracking-wider">
            <Link href={"/"} className="hover:text-[#d72134]">
              Trang chủ
            </Link>{" "}
            <FaChevronRight />
            <Link href={"/room"} className="hover:text-[#d72134]">
              Phòng
            </Link>
            <FaChevronRight />
            <p className="text-primary">Chi tiết</p>
          </nav>
        </div>
      </div>
      <div className="m-auto flex max-w-[1300px] gap-10 p-3">
        <div className="w-1/2">
          <Image
            src={currentImage.src}
            width={1000}
            height={1000}
            alt={currentImage.alt}
            className="h-[500px] w-full object-cover"
          />
          <div className="flex justify-center gap-5 px-5 py-2">
            {listImages.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                width={1000}
                height={1000}
                alt={image.alt}
                className="h-[100px] w-[100px] cursor-pointer object-cover hover:opacity-50"
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 space-y-5 bg-black/10 p-5 text-black">
          <h1
            className={`${dancingScript.className} text-7xl font-bold text-[#f57b20] `}
          >
            {info.name}
          </h1>
          <p className="inline-block skew-x-[10deg] bg-[#f57b20] px-5 py-2 text-2xl font-bold tracking-wider text-white">
            {info.price.toLocaleString("en-US", {
              minimumFractionDigits: 0,
            })}{" "}
            VND
          </p>
          <p className="text-justify font-medium">{info.desc}</p>
          <div className="text-justify font-medium text-black">
            <h2>Dịch vụ:</h2>
            <div></div>
          </div>
          <button
            className="w-full  bg-[#f57b20] px-20 py-3 text-2xl font-medium text-white"
            onClick={() => router.push("/home")}
          >
            Đăng ký phòng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
