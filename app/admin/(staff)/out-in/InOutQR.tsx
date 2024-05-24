/* eslint-disable jsx-a11y/alt-text */
"use client";
import { generateKeyIn, generateKeyOut } from "@/lib/generateKeyInOut";
import { Box, Tabs } from "@mui/material";
import { useQRCode } from "next-qrcode";
import { useEffect, useState, useTransition } from "react";
import Tab from "@mui/material/Tab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}
interface keyPros {
  key: string;
  type: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ flexGrow: 1, height: "100%" }}
      {...other}
    >
      {value === index && <Box height="100%">{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const InOutQR = () => {
  const { Image } = useQRCode();
  const [key, setKey] = useState<keyPros>();
  const [keyOut, setKeyOut] = useState<keyPros>();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState("0");
  const [time, setTime] = useState(0);
  const weekday = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  const day =
    weekday[new Date().getUTCDay()] +
    " - " +
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear() +
    " - " +
    new Date().getHours() +
    ":" +
    (new Date().getMinutes() < 10
      ? `0${new Date().getMinutes()}`
      : new Date().getMinutes()) +
    ":" +
    (new Date().getSeconds() < 10
      ? `0${new Date().getSeconds()}`
      : new Date().getSeconds());
  useEffect(() => {
    setTimeout(() => {
      if (time === 0) {
        startTransition(() => {
          Promise.resolve(generateKeyIn()).then((keys: keyPros) => {
            setKey(keys);
          });
          Promise.resolve(generateKeyOut()).then((keys: keyPros) => {
            setKeyOut(keys);
          });
        });
        setTime(5);
      } else {
        setTime(time - 1);
      }
    }, 1000);
  }, [time]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            onChange={handleChange}
            value={value}
            aria-label="lab API tabs example"
          >
            <Tab
              label="Vào"
              value="0"
              {...a11yProps(0)}
              sx={{
                width: "50%",
                maxWidth: "none",
                fontSize: "20px",
                fontWeight: "bold",
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
              }}
            />
            <Tab
              label="Ra"
              value="1"
              {...a11yProps(1)}
              sx={{
                width: "50%",
                maxWidth: "none",
                fontSize: "20px",
                fontWeight: "bold",
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={"0"}>
          <div className="my-6 text-center text-4xl font-bold italic text-red">
            Quét mã khi đi vào ký túc xá
          </div>
          <div className="flex items-center">
            <div className="h-[300px] w-[300px]">
              {key?.key && (
                <Image
                  text={JSON.stringify(key)}
                  options={{
                    type: "image/jpeg",
                    quality: 0.3,
                    errorCorrectionLevel: "M",
                    margin: 3,
                    scale: 2,
                    width: 300,
                    color: {
                      dark: "#000",
                      light: "#FFf",
                    },
                  }}
                />
              )}
            </div>

            <div>
              <p className="text-2xl font-semibold">{day}</p>
              <p className="text-2xl font-semibold">
                QR code sẽ hệt hạn và tự động thay đổi sau: {time}s
              </p>
              <p className="text-2xl font-semibold">
                Thời gian giới nghiêm: 05:00:00 - 23:00:00
              </p>
              <p className="text-2xl font-semibold">
                <span className="text-red">* Lưu ý:</span> Nếu sinh viên check
                in hoặc check out ngoài khung giờ trên sẽ bị xử lý
              </p>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={"1"}>
          <div className="my-6 text-center text-4xl font-bold italic text-red">
            Quét mã khi đi ra ký túc xá
          </div>
          <div className="flex items-center">
            {key?.key && (
              <div className="h-[300px] w-[300px]">
                <Image
                  text={JSON.stringify(keyOut)}
                  options={{
                    type: "image/jpeg",
                    quality: 0.3,
                    errorCorrectionLevel: "M",
                    margin: 3,
                    scale: 2,
                    width: 300,
                    color: {
                      dark: "#000",
                      light: "#FFf",
                    },
                  }}
                />
              </div>
            )}
            <div>
              <p className="text-2xl font-semibold">{day}</p>
              <p className="text-2xl font-semibold">
                QR code sẽ hệt hạn và tự động thay đổi sau: {time}s
              </p>
              <p className="text-2xl font-semibold">
                Thời gian giới nghiêm: 05:00:00 - 23:00:00
              </p>
              <p className="text-2xl font-semibold">
                <span className="text-red">* Lưu ý:</span> Nếu sinh viên check
                in hoặc check out ngoài khung giờ trên sẽ bị xử lý
              </p>
            </div>
          </div>{" "}
        </TabPanel>
      </Box>
    </div>
  );
};
