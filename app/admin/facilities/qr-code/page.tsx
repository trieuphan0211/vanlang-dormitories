import { GenerateQr } from "@/components/scanner/GenerateQr";
// import { generateFile } from "@/lib/generateFile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo QR Code",
  description: "",
};

const QrCodePage = () => {
  return <GenerateQr />;
};

export default QrCodePage;
