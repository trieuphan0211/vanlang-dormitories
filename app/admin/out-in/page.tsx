/* eslint-disable jsx-a11y/alt-text */
"use client";
import { generateKeyIn } from "@/lib/generateKeyInOut";
import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";

const OutInPage = () => {
  const { Image } = useQRCode();
  const [key, setKey] = useState<string>("");
  useEffect(() => {
    setTimeout(async () => {
      await Promise.resolve(generateKeyIn()).then((res) => {
        console.log("res: ", res);
        setKey(res);
      });
    }, 2000);
  }, [key]);
  return (
    <div>
      {key && (
        <Image
          text={key}
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
      )}
    </div>
  );
};

export default OutInPage;
