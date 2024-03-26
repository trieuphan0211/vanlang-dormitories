"use server";
import { Document, ImageRun, Packer, Paragraph, TextRun } from "docx";
export const generateFile = (qrList?: Array<Promise<any>>) => {
  const img: ImageRun[] = [];
  const images = qrList?.map(async (qr) => {
    qr.then((res) => {
      img.push(
        new ImageRun({
          data: res,
          transformation: {
            width: 200,
            height: 100,
          },
        }),
      );
    });
  });
  console.log(images);
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
  return Packer.toBase64String(doc).then((string) => {
    return string;
  });
};
