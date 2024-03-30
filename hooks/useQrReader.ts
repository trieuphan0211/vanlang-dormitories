"use client";
import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import { useEffect, useRef, useState } from "react";

import { isMediaDevicesSupported, isValidType } from "@/lib/ultis";
import { UseQrReaderHook } from "@/types/qr-code";
import { Result } from "@zxing/library";

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
  const [result, setResult] = useState<Result>();

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
  if (isValidType(video, "constraints", "object")) {
    const controls = codeReader.decodeFromConstraints(
      { video },
      videoId,
      (result, error) => {
        if (isValidType(onResult, "onResult", "function")) {
          if (result !== undefined) {
            setResult(result);
          }
        }
      },
    );
    const stopCamera = async () => {
      (await controls).stop();
    };
    useEffect(() => {
      if (result) {
        if (onResult) {
          onResult(result, null, codeReader);
          stopCamera();
        }
      }
    }, [result]);
  }
};
