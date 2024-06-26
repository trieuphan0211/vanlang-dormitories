import * as FileSaver from "file-saver";
import { IoIosPrint } from "react-icons/io";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import imageLogo from "../../../../../public/images/logo/logo.png";
export const ExportToExcel = ({
  totalArr,
  apiData,
  fileName,
}: {
  totalArr: number[];
  apiData: any[];
  fileName: string;
}) => {
  console.log(totalArr);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = async (
    totalArr: number[],
    apiData: any[],
    fileName: string,
  ) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Đọc file hình ảnh dưới dạng Buffer
    const response = await fetch(
      "http://localhost:3000/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=256&q=75",
    ); // Đường dẫn đến file hình ảnh

    // Tải hình ảnh và chuyển đổi thành ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();

    // Thêm hình ảnh vào workbook
    const imageId = workbook.addImage({
      buffer: arrayBuffer,
      extension: "png", // Định dạng của hình ảnh (png, jpeg, ...)
    });

    // Chèn hình ảnh vào worksheet
    worksheet.addImage(imageId, {
      tl: { col: 1, row: 0 }, // Top-Left vị trí của hình ảnh
      ext: { width: 420, height: 160 }, // Kích thước của hình ảnh
    });

    // Thêm văn bản vào worksheet
    worksheet.mergeCells("I2:Q2");
    worksheet.getCell("I2").value = "Trường Đại học Văn Lang";
    worksheet.getCell("I2").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("I2").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("I3:Q3");
    worksheet.getCell("I3").value = "Ký túc xá Đặng Thùy Trâm";
    worksheet.getCell("I3").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("I3").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("I4:S4");
    worksheet.getCell("I4").value =
      "Địa chỉ: 69/68 Đặng Thùy Trâm, Phường 13, Quận Bình Thạnh, Thành phố Hồ Chí Minh";
    worksheet.getCell("I4").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("I4").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("I5:Q5");
    worksheet.getCell("I5").value = "Số điện thoại: 0372106260";
    worksheet.getCell("I5").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("I5").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("I6:Q6");
    worksheet.getCell("I6").value = "Email: vanlangdormitories@gmail.com";
    worksheet.getCell("I6").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("I6").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("I7:Q7");
    worksheet.getCell("I7").value =
      "Website: https://vanlang-dormitories.vercel.app";
    worksheet.getCell("I7").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("I7").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("G10:K10");
    worksheet.getCell("G10").value = "THỐNG KÊ DOANH THU";
    worksheet.getCell("G10").font = {
      name: "Times New Roman",
      size: 14,
      bold: true,
    };
    worksheet.getCell("G10").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("G11:K11");
    worksheet.getCell("G11").value =
      `Từ 01/${apiData[0]?.invoiceYear} đến 12/${apiData[0]?.invoiceYear}`;
    worksheet.getCell("G11").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("G11").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("E12:N13");
    worksheet.getCell("E12").value = "Đơn vị tính: VNĐ";
    worksheet.getCell("E12").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("E12").alignment = {
      vertical: "bottom",
      horizontal: "right",
      wrapText: true,
    };

    // Header cho bảng
    worksheet.mergeCells("E14:G14");
    worksheet.getCell("E14").value = "Thời gian";
    worksheet.getCell("E14").font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    worksheet.getCell("E14").alignment = {
      vertical: "bottom",
      horizontal: "right",
      wrapText: true,
    };
    worksheet.getCell("E14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF00FF00" }, // Màu xanh lá cây
    };

    worksheet.mergeCells("H14:N14");
    worksheet.getCell("H14").value = "Doanh thu";
    worksheet.getCell("H14").font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    worksheet.getCell("H14").alignment = {
      vertical: "bottom",
      horizontal: "right",
      wrapText: true,
    };
    worksheet.getCell("H14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF00FF00" }, // Màu xanh lá cây
    };

    // Vị trí bắt đầu của cột thứ nhất (cột B3)
    const col1StartRow = 15;
    const col1StartCol = 5;

    // Vị trí bắt đầu của cột thứ hai (cột B5)
    const col2StartRow = 15;
    const col2StartCol = 8;

    // Đặt dữ liệu từ mảng vào các ô từ vị trí đã chỉ định
    totalArr.forEach((item, index) => {
      // Đặt cột thứ nhất
      // Gộp cột thứ nhất
      worksheet.mergeCells(`E${15 + index}:G${15 + index}`);
      worksheet.getCell(`E${15 + index}`).value =
        `${index + 1}/${apiData[0]?.invoiceYear}`;
      worksheet.getCell(`E${15 + index}`).font = {
        name: "Times New Roman",
        size: 13,
      };
      worksheet.getCell(`E${15 + index}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`H${15 + index}:N${15 + index}`);
      worksheet.getCell(`H${15 + index}`).value = item.toLocaleString("en-US");
      worksheet.getCell(`H${15 + index}`).font = {
        name: "Times New Roman",
        size: 13,
      };
      worksheet.getCell(`H${15 + index}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });

    // // Định dạng header (cột A, B)
    // const headerRow = worksheet.getRow(col1StartRow - 1); // Hàng header là hàng trước cột thứ nhất
    // headerRow.getCell(col1StartCol).value = "Thời gian";
    // headerRow.getCell(col2StartCol).value = "Doanh thu";
    // headerRow.eachCell((cell) => {
    //   cell.font = { bold: true };
    //   cell.fill = {
    //     type: "pattern",
    //     pattern: "solid",
    //     fgColor: { argb: "FF00FF00" }, // Màu xanh lá cây
    //   };
    // });

    // Ghi dữ liệu ra buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Lưu file
    FileSaver.saveAs(new Blob([buffer]), "example-with-image.xlsx");
  };

  return (
    // <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
    <button
      className="flex flex-row gap-2 rounded-md bg-orange-500 p-2 text-white shadow-4"
      onClick={(e) => exportToCSV(totalArr, apiData, fileName)}
    >
      <IoIosPrint className="size-6" />
      Xuất ra Excel
    </button>
  );
};
