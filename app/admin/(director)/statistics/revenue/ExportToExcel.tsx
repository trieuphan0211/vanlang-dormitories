"use client";
import ExcelJS from "exceljs";
import * as FileSaver from "file-saver";
import { IoIosPrint } from "react-icons/io";

interface ExportToExcelProps {
  totalArr?: { year: number; invoicesArr: number[] }[];
  registers?: {
    month: string;
    branch: string;
    status: {
      CREATED: number;
      APPROVED: number;
      CANCEL: number;
      EXTENSION: number;
    };
  }[];
  fileName?: string;
  maintenanceArr?: {
    month: string;
    status: { CREATED: number; INPROGRESS: number; FINISHED: number };
  }[];
  violateArr?: {
    month: string;
    violateType: string;
    status: { CREATED: number; INPROGRESS: number; FINISHED: number };
  }[];
  title?: string;
}
export const ExportToExcel = ({
  totalArr,
  fileName,
  violateArr,
  registers,
  maintenanceArr,
  title,
}: ExportToExcelProps) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = async ({
    totalArr,
    fileName,
    violateArr,
    maintenanceArr,
    registers,
  }: ExportToExcelProps) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Đọc file hình ảnh dưới dạng Buffer
    const response = await fetch(
      "https://vanlang-dormitories.vercel.app/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=256&q=75",
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
    worksheet.mergeCells("G11:K11");
    worksheet.getCell("G11").value = title;
    worksheet.getCell("G11").font = { name: "Times New Roman", size: 13 };
    worksheet.getCell("G11").alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    // Đặt dữ liệu từ mảng vào các ô từ vị trí đã chỉ định
    let indexcolumn = 0;
    let totalRevenue = 0;
    if (totalArr) {
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
      // Data for statistics revenue
      totalArr.forEach((item, index) => {
        totalRevenue =
          totalRevenue + item.invoicesArr.reduce((prev, curr) => prev + curr);
        // Đặt cột thứ nhất
        // Gộp cột thứ nhất
        item.invoicesArr.forEach((number, i) => {
          if (number !== 0) {
            worksheet.mergeCells(`E${15 + indexcolumn}:G${15 + indexcolumn}`);
            worksheet.getCell(`E${15 + indexcolumn}`).value =
              `${i + 1}/${item.year}`;
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
          }
        });
      });
      // Dòng ghi tổng doanh thu
      worksheet.mergeCells(`E${15 + indexcolumn}:G${15 + indexcolumn}`);
      worksheet.getCell(`E${15 + indexcolumn}`).value = `Tổng doanh thu:`;
      worksheet.getCell(`E${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`E${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`H${15 + indexcolumn}:N${15 + indexcolumn}`);
      worksheet.getCell(`H${15 + indexcolumn}`).value =
        totalRevenue.toLocaleString("en-US");
      worksheet.getCell(`H${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`H${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    }
    if (registers) {
      console.log(registers);
      worksheet.mergeCells("G10:K10");
      worksheet.getCell("G10").value = "THỐNG KÊ ĐĂNG KÝ";
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
      // Header cho bảng
      worksheet.mergeCells("C14:G14");
      worksheet.getCell("C14").value = "Chi nhánh";
      worksheet.getCell("C14").font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
        color: { argb: "FFFFFF" },
      };
      worksheet.getCell("C14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("C14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };

      worksheet.mergeCells("H14:J14");
      worksheet.getCell("H14").value = "Thời gian";
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

      worksheet.mergeCells("K14:L14");
      worksheet.getCell("K14").value = "Đang chờ";
      worksheet.getCell("K14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("K14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("K14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };

      worksheet.mergeCells("M14:N14");
      worksheet.getCell("M14").value = "Đã duyệt";
      worksheet.getCell("M14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("M14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("M14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };

      worksheet.mergeCells("O14:P14");
      worksheet.getCell("O14").value = "Đã hủy";
      worksheet.getCell("O14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("O14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("O14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };

      worksheet.mergeCells("Q14:R14");
      worksheet.getCell("Q14").value = "Đã gia hạn";
      worksheet.getCell("Q14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("Q14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("Q14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };
      const statusss = {
        CREATED: 0,
        APPROVED: 0,
        CANCEL: 0,
        EXTENSION: 0,
      } as {
        CREATED: number;
        APPROVED: number;
        CANCEL: number;
        EXTENSION: number;
      };
      // Fill data
      registers.forEach((item, index) => {
        statusss.CREATED = item.status.CREATED + statusss.CREATED || 0;
        statusss.APPROVED = item.status.APPROVED + statusss.APPROVED || 0;
        statusss.CANCEL = item.status.CANCEL + statusss.CANCEL || 0;
        statusss.EXTENSION = item.status.EXTENSION + statusss.EXTENSION || 0;
        worksheet.mergeCells(`C${15 + indexcolumn}:G${15 + indexcolumn}`);
        worksheet.getCell(`C${15 + indexcolumn}`).value = item.branch;
        worksheet.getCell(`C${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`C${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`H${15 + indexcolumn}:J${15 + indexcolumn}`);
        worksheet.getCell(`H${15 + indexcolumn}`).value = item.month;
        worksheet.getCell(`H${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`H${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`K${15 + indexcolumn}:L${15 + indexcolumn}`);
        worksheet.getCell(`K${15 + indexcolumn}`).value = item.status.CREATED;
        worksheet.getCell(`K${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`K${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`M${15 + indexcolumn}:N${15 + indexcolumn}`);
        worksheet.getCell(`M${15 + indexcolumn}`).value = item.status.APPROVED;
        worksheet.getCell(`M${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`M${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`O${15 + indexcolumn}:P${15 + indexcolumn}`);
        worksheet.getCell(`O${15 + indexcolumn}`).value = item.status.CANCEL;
        worksheet.getCell(`O${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`O${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`Q${15 + indexcolumn}:R${15 + indexcolumn}`);
        worksheet.getCell(`Q${15 + indexcolumn}`).value = item.status.EXTENSION;
        worksheet.getCell(`Q${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`Q${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
        indexcolumn++;
      });
      // Tổng
      worksheet.mergeCells(`C${15 + indexcolumn}:J${15 + indexcolumn}`);
      worksheet.getCell(`C${15 + indexcolumn}`).value = "Tổng";
      worksheet.getCell(`C${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`C${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`K${15 + indexcolumn}:L${15 + indexcolumn}`);
      worksheet.getCell(`K${15 + indexcolumn}`).value = statusss.CREATED;
      worksheet.getCell(`K${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`K${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`M${15 + indexcolumn}:N${15 + indexcolumn}`);
      worksheet.getCell(`M${15 + indexcolumn}`).value = statusss.APPROVED;
      worksheet.getCell(`M${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`M${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`O${15 + indexcolumn}:P${15 + indexcolumn}`);
      worksheet.getCell(`O${15 + indexcolumn}`).value = statusss.CANCEL;
      worksheet.getCell(`O${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`O${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`Q${15 + indexcolumn}:R${15 + indexcolumn}`);
      worksheet.getCell(`Q${15 + indexcolumn}`).value = statusss.EXTENSION;
      worksheet.getCell(`Q${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`Q${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    }
    if (violateArr) {
      console.log(violateArr);
      worksheet.mergeCells("G10:K10");
      worksheet.getCell("G10").value = "THỐNG KÊ VI PHẠM";
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
      // Header cho bảng
      worksheet.mergeCells("C14:G14");
      worksheet.getCell("C14").value = "Loại vi phạm";
      worksheet.getCell("C14").font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
        color: { argb: "FFFFFF" },
      };
      worksheet.getCell("C14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("C14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };

      worksheet.mergeCells("H14:J14");
      worksheet.getCell("H14").value = "Thời gian";
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

      worksheet.mergeCells("K14:L14");
      worksheet.getCell("K14").value = "Đang chờ xử lý";
      worksheet.getCell("K14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("K14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("K14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };

      worksheet.mergeCells("M14:N14");
      worksheet.getCell("M14").value = "Đang xử lý";
      worksheet.getCell("M14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("M14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("M14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };

      worksheet.mergeCells("O14:P14");
      worksheet.getCell("O14").value = "Đã hoàn thành";
      worksheet.getCell("O14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("O14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("O14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };
      const statusss = {
        CREATED: 0,
        FINISHED: 0,
        INPROGRESS: 0,
      } as {
        CREATED: number;
        FINISHED: number;
        INPROGRESS: number;
      };
      // Fill data
      violateArr.forEach((item, index) => {
        statusss.CREATED = item.status.CREATED + statusss.CREATED || 0;
        statusss.FINISHED = item.status.FINISHED + statusss.FINISHED || 0;
        statusss.INPROGRESS = item.status.INPROGRESS + statusss.INPROGRESS || 0;

        worksheet.mergeCells(`C${15 + indexcolumn}:G${15 + indexcolumn}`);
        worksheet.getCell(`C${15 + indexcolumn}`).value = item.violateType;
        worksheet.getCell(`C${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`C${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`H${15 + indexcolumn}:J${15 + indexcolumn}`);
        worksheet.getCell(`H${15 + indexcolumn}`).value = item.month;
        worksheet.getCell(`H${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`H${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`K${15 + indexcolumn}:L${15 + indexcolumn}`);
        worksheet.getCell(`K${15 + indexcolumn}`).value = item.status.CREATED;
        worksheet.getCell(`K${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`K${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`M${15 + indexcolumn}:N${15 + indexcolumn}`);
        worksheet.getCell(`M${15 + indexcolumn}`).value =
          item.status.INPROGRESS;
        worksheet.getCell(`M${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`M${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`O${15 + indexcolumn}:P${15 + indexcolumn}`);
        worksheet.getCell(`O${15 + indexcolumn}`).value = item.status.FINISHED;
        worksheet.getCell(`O${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`O${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        indexcolumn++;
      });
      // Tổng
      worksheet.mergeCells(`C${15 + indexcolumn}:J${15 + indexcolumn}`);
      worksheet.getCell(`C${15 + indexcolumn}`).value = "Tổng";
      worksheet.getCell(`C${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`C${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`K${15 + indexcolumn}:L${15 + indexcolumn}`);
      worksheet.getCell(`K${15 + indexcolumn}`).value = statusss.CREATED;
      worksheet.getCell(`K${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`K${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`M${15 + indexcolumn}:N${15 + indexcolumn}`);
      worksheet.getCell(`M${15 + indexcolumn}`).value = statusss.INPROGRESS;
      worksheet.getCell(`M${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`M${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`O${15 + indexcolumn}:P${15 + indexcolumn}`);
      worksheet.getCell(`O${15 + indexcolumn}`).value = statusss.FINISHED;
      worksheet.getCell(`O${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
        bold: true,
      };
      worksheet.getCell(`O${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    }
    if (maintenanceArr) {
      console.log(maintenanceArr);
      worksheet.mergeCells("G10:K10");
      worksheet.getCell("G10").value = "THỐNG KÊ BẢO TRÌ";
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
      // Header cho bảng

      worksheet.mergeCells("E14:H14");
      worksheet.getCell("E14").value = "Thời gian";
      worksheet.getCell("E14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
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

      worksheet.mergeCells("I14:J14");
      worksheet.getCell("I14").value = "Đang chờ xử lý";
      worksheet.getCell("I14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("I14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("I14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };

      worksheet.mergeCells("K14:L14");
      worksheet.getCell("K14").value = "Đang xử lý";
      worksheet.getCell("K14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("K14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("K14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };

      worksheet.mergeCells("M14:N14");
      worksheet.getCell("M14").value = "Đã hoàn thành";
      worksheet.getCell("M14").font = {
        name: "Times New Roman",
        size: 13,
        color: { argb: "FFFFFF" },
        bold: true,
      };
      worksheet.getCell("M14").alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getCell("M14").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0000" }, // Màu xanh lá cây
      };
      const statusss = {
        CREATED: 0,
        FINISHED: 0,
        INPROGRESS: 0,
      } as {
        CREATED: number;
        FINISHED: number;
        INPROGRESS: number;
      };
      // Fill data
      maintenanceArr.forEach((item, index) => {
        statusss.CREATED = item.status.CREATED + statusss.CREATED || 0;
        statusss.FINISHED = item.status.FINISHED + statusss.FINISHED || 0;
        statusss.INPROGRESS = item.status.INPROGRESS + statusss.INPROGRESS || 0;

        worksheet.mergeCells(`E${15 + indexcolumn}:H${15 + indexcolumn}`);
        worksheet.getCell(`E${15 + indexcolumn}`).value = item.month;
        worksheet.getCell(`E${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`E${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`I${15 + indexcolumn}:J${15 + indexcolumn}`);
        worksheet.getCell(`I${15 + indexcolumn}`).value = item.status.CREATED;
        worksheet.getCell(`I${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`I${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`K${15 + indexcolumn}:L${15 + indexcolumn}`);
        worksheet.getCell(`K${15 + indexcolumn}`).value =
          item.status.INPROGRESS;
        worksheet.getCell(`K${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`K${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        worksheet.mergeCells(`M${15 + indexcolumn}:N${15 + indexcolumn}`);
        worksheet.getCell(`M${15 + indexcolumn}`).value = item.status.FINISHED;
        worksheet.getCell(`M${15 + indexcolumn}`).font = {
          name: "Times New Roman",
          size: 13,
        };
        worksheet.getCell(`M${15 + indexcolumn}`).alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };

        indexcolumn++;
      });
      // Tổng
      worksheet.mergeCells(`E${15 + indexcolumn}:H${15 + indexcolumn}`);
      worksheet.getCell(`E${15 + indexcolumn}`).value = "Tổng";
      worksheet.getCell(`E${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
      };
      worksheet.getCell(`E${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`I${15 + indexcolumn}:J${15 + indexcolumn}`);
      worksheet.getCell(`I${15 + indexcolumn}`).value = statusss.CREATED;
      worksheet.getCell(`I${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
      };
      worksheet.getCell(`I${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`K${15 + indexcolumn}:L${15 + indexcolumn}`);
      worksheet.getCell(`K${15 + indexcolumn}`).value = statusss.INPROGRESS;
      worksheet.getCell(`K${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
      };
      worksheet.getCell(`K${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      worksheet.mergeCells(`M${15 + indexcolumn}:N${15 + indexcolumn}`);
      worksheet.getCell(`M${15 + indexcolumn}`).value = statusss.FINISHED;
      worksheet.getCell(`M${15 + indexcolumn}`).font = {
        name: "Times New Roman",
        size: 13,
      };
      worksheet.getCell(`M${15 + indexcolumn}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    }
    // Dòng ghi thời gian
    let newdate = new Date();
    let day = newdate.getDate();
    let month = newdate.getMonth() + 1;
    let year = newdate.getFullYear();
    worksheet.mergeCells(`L${15 + indexcolumn + 2}:Q${15 + indexcolumn + 2}`);
    worksheet.getCell(`L${15 + indexcolumn + 2}`).value =
      `Thành phố Hồ Chí Minh, ngày ${day} tháng ${month} năm ${year}`;
    worksheet.getCell(`L${15 + indexcolumn + 2}`).font = {
      name: "Times New Roman",
      size: 13,
      italic: true,
    };
    worksheet.getCell(`L${15 + indexcolumn + 2}`).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    // Dòng Trưởng phòng
    worksheet.mergeCells(`B${15 + indexcolumn + 3}:F${15 + indexcolumn + 3}`);
    worksheet.getCell(`B${15 + indexcolumn + 3}`).value = `TRƯỞNG PHÒNG`;
    worksheet.getCell(`B${15 + indexcolumn + 3}`).font = {
      name: "Times New Roman",
      size: 14,
      bold: true,
    };
    worksheet.getCell(`B${15 + indexcolumn + 3}`).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    worksheet.mergeCells(`B${15 + indexcolumn + 4}:F${15 + indexcolumn + 4}`);
    worksheet.getCell(`B${15 + indexcolumn + 4}`).value =
      `(Ký và ghi rõ họ tên)`;
    worksheet.getCell(`B${15 + indexcolumn + 4}`).font = {
      name: "Times New Roman",
      size: 14,
      italic: true,
    };
    worksheet.getCell(`B${15 + indexcolumn + 4}`).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    // Dòng người lập báo cáo
    worksheet.mergeCells(`L${15 + indexcolumn + 3}:Q${15 + indexcolumn + 3}`);
    worksheet.getCell(`L${15 + indexcolumn + 3}`).value = `NGƯỜI LẬP BÁO CÁO`;
    worksheet.getCell(`L${15 + indexcolumn + 3}`).font = {
      name: "Times New Roman",
      size: 13,
      bold: true,
    };
    worksheet.getCell(`L${15 + indexcolumn + 3}`).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    worksheet.mergeCells(`L${15 + indexcolumn + 4}:Q${15 + indexcolumn + 4}`);
    worksheet.getCell(`L${15 + indexcolumn + 4}`).value =
      `(Ký và ghi rõ họ tên)`;
    worksheet.getCell(`L${15 + indexcolumn + 4}`).font = {
      name: "Times New Roman",
      size: 13,
      italic: true,
    };
    worksheet.getCell(`L${15 + indexcolumn + 4}`).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    worksheet.mergeCells(`B${15 + indexcolumn + 5}:F${15 + indexcolumn + 10}`);

    worksheet.mergeCells(`L${15 + indexcolumn + 5}:Q${15 + indexcolumn + 10}`);

    // Ghi dữ liệu ra buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Lưu file
    FileSaver.saveAs(new Blob([buffer]), `${fileName}.xlsx`);
  };

  return (
    // <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
    <button
      className="flex flex-row gap-2 rounded-md bg-orange-500 p-2 text-white shadow-4"
      onClick={(e) =>
        exportToCSV({
          totalArr,
          fileName,
          registers,
          maintenanceArr,
          violateArr,
        })
      }
    >
      <IoIosPrint className="size-6" />
      Xuất ra Excel
    </button>
  );
};
