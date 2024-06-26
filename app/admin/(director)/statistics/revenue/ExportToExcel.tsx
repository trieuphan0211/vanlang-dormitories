import * as FileSaver from "file-saver";
import { IoIosPrint } from "react-icons/io";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import imageLogo from "../../../../../public/images/logo/logo.png";
import { number } from "zod";
export const ExportToExcel = ({
  totalArr,
  fileName,
  title,
}: {
  totalArr: { year: string; invoicesArr: number[] }[];
  fileName: string;
  title: string;
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = async (
    totalArr: { year: string; invoicesArr: number[] }[],

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
      tl: { col: 1, row: 2 }, // Top-Left vị trí của hình ảnh
      ext: { width: 300, height: 90 }, // Kích thước của hình ảnh
    });

    // Thêm văn bản vào worksheet
    worksheet.mergeCells("G2:O2");
    worksheet.getCell("G2").value = "Trường Đại học Văn Lang";
    worksheet.getCell("G2").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("G2").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("G3:O3");
    worksheet.getCell("G3").value = "Ký túc xá Đặng Thùy Trâm";
    worksheet.getCell("G3").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("G3").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("G4:Q4");
    worksheet.getCell("G4").value =
      "Địa chỉ: 69/68 Đặng Thùy Trâm, Phường 13, Quận Bình Thạnh, Thành phố Hồ Chí Minh";
    worksheet.getCell("G4").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("G4").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("G5:O5");
    worksheet.getCell("G5").value = "Số điện thoại: 0372106260";
    worksheet.getCell("G5").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("G5").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("G6:O6");
    worksheet.getCell("G6").value = "Email: vanlangdormitories@gmail.com";
    worksheet.getCell("G6").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("G6").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells("G7:O7");
    worksheet.getCell("G7").value =
      "Website: https://vanlang-dormitories.vercel.app";
    worksheet.getCell("G7").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("G7").alignment = {
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
    worksheet.getCell("G11").value = title;
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
      color: { argb: "FFFFFF" },
    };
    worksheet.getCell("E14").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    worksheet.getCell("E14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" }, // Màu xanh lá cây
    };

    worksheet.mergeCells("H14:N14");
    worksheet.getCell("H14").value = "Doanh thu";
    worksheet.getCell("H14").font = {
      name: "Times New Roman",
      size: 13,
      color: { argb: "FFFFFF" },
      bold: true,
    };
    worksheet.getCell("H14").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    worksheet.getCell("H14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" }, // Màu xanh lá cây
    };

    // Đặt dữ liệu từ mảng vào các ô từ vị trí đã chỉ định
    let indexcolumn = 0;
    let totalRevenue = 0;
    console.log(totalArr);
    totalArr.forEach((item, index) => {
      totalRevenue =
        totalRevenue + item.invoicesArr.reduce((prev, curr) => prev + curr);
      // Đặt cột thứ nhất
      // Gộp cột thứ nhất
      item.invoicesArr.forEach((number, i) => {
        worksheet.mergeCells(`E${15 + indexcolumn}:G${15 + indexcolumn}`);
        worksheet.getCell(`E${15 + indexcolumn}`).value =
          `${indexcolumn + 1}/${item.year}`;
        worksheet.getCell(`E${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`E${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`H${15 + indexcolumn}:N${15 + indexcolumn}`);
        worksheet.getCell(`H${15 + indexcolumn}`).value =
          number.toLocaleString("en-US");
        worksheet.getCell(`H${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`H${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
        indexcolumn++;
      });
    });

    // Dòng ghi tổng doanh thu
    worksheet.mergeCells(
      `E${15 + totalArr[0].invoicesArr.length}:G${15 + totalArr[0].invoicesArr.length}`,
    );
    worksheet.getCell(`E${15 + totalArr[0].invoicesArr.length}`).value =
      `Tổng doanh thu:`;
    worksheet.getCell(`E${15 + totalArr[0].invoicesArr.length}`).font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    worksheet.getCell(`E${15 + totalArr[0].invoicesArr.length}`).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells(
      `H${15 + totalArr[0].invoicesArr.length}:N${15 + totalArr[0].invoicesArr.length}`,
    );
    worksheet.getCell(`H${15 + totalArr[0].invoicesArr.length}`).value =
      totalRevenue.toLocaleString("en-US");
    worksheet.getCell(`H${15 + totalArr[0].invoicesArr.length}`).font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    worksheet.getCell(`H${15 + totalArr[0].invoicesArr.length}`).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    // Dòng ghi thời gian
    let newdate = new Date();
    let day = newdate.getDate();
    let month = newdate.getMonth() + 1;
    let year = newdate.getFullYear();
    worksheet.mergeCells(
      `L${15 + totalArr[0].invoicesArr.length + 2}:Q${15 + totalArr[0].invoicesArr.length + 2}`,
    );
    worksheet.getCell(`L${15 + totalArr[0].invoicesArr.length + 2}`).value =
      `Thành phố Hồ Chí Minh, ngày ${day} tháng ${month} năm ${year}`;
    worksheet.getCell(`L${15 + totalArr[0].invoicesArr.length + 2}`).font = {
      name: "Times New Roman",
      size: 13,
      italic: true,
    };
    worksheet.getCell(`L${15 + totalArr[0].invoicesArr.length + 2}`).alignment =
      {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

    // Dòng Trưởng phòng
    worksheet.mergeCells(
      `B${15 + totalArr[0].invoicesArr.length + 3}:F${15 + totalArr[0].invoicesArr.length + 3}`,
    );
    worksheet.getCell(`B${15 + totalArr[0].invoicesArr.length + 3}`).value =
      `TRƯỞNG PHÒNG`;
    worksheet.getCell(`B${15 + totalArr[0].invoicesArr.length + 3}`).font = {
      name: "Times New Roman",
      size: 14,
      bold: true,
    };
    worksheet.getCell(`B${15 + totalArr[0].invoicesArr.length + 3}`).alignment =
      {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    worksheet.mergeCells(
      `B${15 + totalArr[0].invoicesArr.length + 4}:F${15 + totalArr[0].invoicesArr.length + 4}`,
    );
    worksheet.getCell(`B${15 + totalArr[0].invoicesArr.length + 4}`).value =
      `(Ký và ghi rõ họ tên)`;
    worksheet.getCell(`B${15 + totalArr[0].invoicesArr.length + 4}`).font = {
      name: "Times New Roman",
      size: 14,
      italic: true,
    };
    worksheet.getCell(`B${15 + totalArr[0].invoicesArr.length + 4}`).alignment =
      {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

    // Dòng người lập báo cáo
    worksheet.mergeCells(
      `L${15 + totalArr[0].invoicesArr.length + 3}:Q${15 + totalArr[0].invoicesArr.length + 3}`,
    );
    worksheet.getCell(`L${15 + totalArr[0].invoicesArr.length + 3}`).value =
      `NGƯỜI LẬP BÁO CÁO`;
    worksheet.getCell(`L${15 + totalArr[0].invoicesArr.length + 3}`).font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    worksheet.getCell(`L${15 + totalArr[0].invoicesArr.length + 3}`).alignment =
      {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    worksheet.mergeCells(
      `L${15 + totalArr[0].invoicesArr.length + 4}:Q${15 + totalArr[0].invoicesArr.length + 4}`,
    );
    worksheet.getCell(`L${15 + totalArr[0].invoicesArr.length + 4}`).value =
      `(Ký và ghi rõ họ tên)`;
    worksheet.getCell(`L${15 + totalArr[0].invoicesArr.length + 4}`).font = {
      name: "Times New Roman",
      size: 13,
      italic: true,
    };
    worksheet.getCell(`L${15 + totalArr[0].invoicesArr.length + 4}`).alignment =
      {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

    worksheet.mergeCells(
      `B${15 + totalArr[0].invoicesArr.length + 5}:F${15 + totalArr[0].invoicesArr.length + 10}`,
    );

    worksheet.mergeCells(
      `L${15 + totalArr[0].invoicesArr.length + 5}:Q${15 + totalArr[0].invoicesArr.length + 10}`,
    );

    // Ghi dữ liệu ra buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Lưu file
    FileSaver.saveAs(new Blob([buffer]), "example-with-image.xlsx");
  };

  return (
    // <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
    <button
      className="flex flex-row gap-2 rounded-md bg-orange-500 p-2 text-white shadow-4"
      onClick={(e) => exportToCSV(totalArr, fileName)}
    >
      <IoIosPrint className="size-6" />
      Xuất ra Excel
    </button>
  );
};
