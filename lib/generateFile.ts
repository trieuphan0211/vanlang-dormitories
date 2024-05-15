"use server";
import { Document, ImageRun, Packer, Paragraph, TextRun } from "docx";
export const generateFile = async (qrList?: Array<string>) => {
  const img: ImageRun[] = [];
  qrList?.map(async (qr) => {
    img.push(
      new ImageRun({
        data: qr,
        transformation: {
          width: 200,
          height: 80,
        },
      }),
    );
  });
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: img,
          }),
        ],
      },
    ],
  });

  // Used to export the file into a .docx file
  return await Packer.toBase64String(doc).then((string) => {
    return string;
  });
};
