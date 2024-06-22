/* eslint-disable jsx-a11y/alt-text */
"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { qrSeletor } from "@/lib/features/qr-code/qr-selector";
import { generateFile } from "@/lib/generateFile";
// import { generateFile } from "@/lib/generateFile";
import html2canvas from "html2canvas";
import { useQRCode } from "next-qrcode";
import { CgPrinter } from "react-icons/cg";

export const GenerateQr = () => {
  const { qrList } = useAppSelector(qrSeletor);
  const { Image } = useQRCode();
  // const dispatch = useAppDispatch();

  const dowloadFile = async () => {
    console.log("dowloadFile");
    // dispatch(alertManagerActions.setAlert({ status: true }));
    const qrList = await addQrCode();
    const getBase64 = await generateFile(qrList);
    console.log("getBase64");
    // dispatch(alertManagerActions.setAlert({ status: false }));
    let qrCodeFile = `data:application/docx;base64,${getBase64}`;
    let a = document.createElement("a");
    a.href = qrCodeFile;
    a.download = "qr-code-facilities.docx";

    a.click();
  };

  const addQrCode = async () => {
    const qrcode: HTMLCollection = document.getElementsByClassName("qrcode");
    if (qrcode.length === 0) return;
    const generateQr = async (index: number) => {
      return await html2canvas(qrcode.item(index) as HTMLElement).then(
        function (canvas) {
          return canvas.toDataURL("image/jpeg");
        },
      );
    };
    return await Promise.all(
      Array.from({ length: qrcode.length }).map(async (v, index: number) => {
        return await generateQr(index);
      }),
    );
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
      <Breadcrumb
        pageName="Tạo QR Code"
        link={[
          { name: "Cơ sở vật chất", link: "/admin/facilities" },
          { name: "QR Code", link: "/admin/facilities/qr-code" },
        ]}
      />
      <div className="my-4 flex justify-end">
        <button
          onClick={dowloadFile}
          className="inline-flex items-center justify-center gap-2 text-nowrap rounded-md bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <CgPrinter />
          In
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 ">
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
                  Loại: {item.FacilitiesType?.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
