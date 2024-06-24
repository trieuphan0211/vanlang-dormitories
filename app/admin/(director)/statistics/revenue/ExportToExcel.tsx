import * as FileSaver from "file-saver";
import { IoIosPrint } from "react-icons/io";
import * as XLSX from "xlsx";

export const ExportToExcel = ({
  apiData,
  fileName,
}: {
  apiData: any[];
  fileName: string;
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: any[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    // <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
    <button
      className="flex flex-row gap-2 rounded-md bg-orange-500 p-2 text-white shadow-4"
      onClick={(e) => exportToCSV(apiData, fileName)}
    >
      <IoIosPrint className="size-6" />
      Print to Excel
    </button>
  );
};
