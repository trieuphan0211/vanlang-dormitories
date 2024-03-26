"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAppSelector } from "@/hooks/redux";
import { qrSeletor } from "@/lib/features/qr-code/qr-selector";
import { generateFile } from "@/lib/generateFile";
// import { generateFile } from "@/lib/generateFile";
import { useQRCode } from "next-qrcode";
import { CgPrinter } from "react-icons/cg";
import React from "react";
import html2canvas from "html2canvas";

const QrCodePage = () => {
  const { qrList } = useAppSelector(qrSeletor);
  const { Image } = useQRCode();

  const dowloadFile = async () => {
    const qrList = addQrCode();
    const getBase64 = await generateFile(qrList);
    let qrCodeFile = `data:application/docx;base64,${getBase64}`;
    let a = document.createElement("a");
    a.href = qrCodeFile;
    a.download = "qr-code-facilities.docx";
    a.click();
  };

  const addQrCode = () => {
    const qrList = [];
    const qrcode: HTMLCollection = document.getElementsByClassName("qrcode");
    if (qrcode.length === 0) return;
    const imageBase64 = Array.from({ length: qrcode.length }).map(
      (v, index) => {
        return html2canvas(qrcode.item(index) as HTMLElement).then(
          function (canvas) {
            return canvas.toDataURL("image/jpeg");
          },
        );
      },
    );

    return imageBase64;
  };

  if (qrList.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Không có dữ liệu QR Code, vui lòng thêm mới trong danh sách cơ sở vật
          chất
        </h2>
      </div>
    );
  }
  return (
    <>
      <Breadcrumb pageName="Tạo QR Code" />
      <div className="my-4 flex justify-end">
        <button
          onClick={dowloadFile}
          className="inline-flex items-center justify-center gap-2 text-nowrap rounded-md bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <CgPrinter />
          In
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 2xl:grid-cols-4">
        {qrList.map((item, key) => {
          return (
            <div
              key={key}
              className=" qrcode flex items-center gap-1 rounded-xl bg-white p-4"
            >
              <Image
                text={item.code}
                options={{
                  type: "image/jpeg",
                  quality: 0.3,
                  errorCorrectionLevel: "M",
                  margin: 3,
                  scale: 2,
                  width: 120,
                  color: {
                    dark: "#000",
                    light: "#FFf",
                  },
                }}
              />
              <div>
                <p className="font-semibold text-black">Tên: {item.name}</p>
                <p className="font-semibold text-black">Mã: {item.code}</p>
                <p className="font-semibold text-black">
                  Loại: {item.facilitiesType?.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QrCodePage;
