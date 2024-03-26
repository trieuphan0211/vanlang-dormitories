"use client";
import { QrReader } from "@/components/scanner/Scanner";
import { Result } from "@zxing/library";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Quản lý bảo trì",
//   description: "",
// };

const MaintenancePage = () => {
  const [data, setData] = useState<String>("");
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open && (
        <QrReader
          onResult={(
            result: Result | undefined | null,
            error: Error | undefined | null,
          ) => {
            if (!!result) {
              if (Object.keys(result).length > 0) {
                setData(result.getText());
              }
            }

            if (!!error) {
            }
          }}
          scanDelay={1000}
          // style={{ width: "100%" }}
        />
      )}

      <p>{data}</p>
      <button onClick={() => setOpen(!open)}>OPEN</button>
    </div>
  );
};

export default MaintenancePage;
