"use client";
import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import { useEffect, useRef, useState } from "react";

import { isMediaDevicesSupported, isValidType } from "@/lib/ultis";
import { UseQrReaderHook } from "@/types/qr-code";

// TODO: add support for debug logs
export const useQrReader: UseQrReaderHook = ({
  scanDelay: delayBetweenScanAttempts,
  constraints: video,
  onResult,
  videoId,
}) => {
  const codeReader = new BrowserQRCodeReader(undefined, {
    delayBetweenScanAttempts,
  });
  const [result, setResult] = useState(null);

  if (
    !isMediaDevicesSupported() &&
    isValidType(onResult, "onResult", "function")
  ) {
    const message =
      'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"';
    if (onResult) {
      onResult(null, new Error(message), codeReader);
    }
  }
  console.log(videoId, video, "videoId, video");
  if (isValidType(video, "constraints", "object")) {
    const controls = codeReader.decodeFromConstraints(
      { video },
      videoId,
      (result, error) => {
        console.log(result, "result, error");
        if (isValidType(onResult, "onResult", "function")) {
          if (onResult && result !== undefined) {
            onResult(result, error, codeReader);
          }
        }
      },
    );
      useEffect(() => {
        if(result) {
          setResult(result);
        }
      }, [result]);
    // setTimeout(async () => (await controls).stop(), 10000);
  }
};
