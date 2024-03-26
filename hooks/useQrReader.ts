"use client";
import { MutableRefObject, useEffect, useRef } from "react";
import {
  BrowserCodeReader,
  BrowserQRCodeReader,
  IScannerControls,
} from "@zxing/browser";

import { isMediaDevicesSupported, isValidType } from "@/lib/ultis";
import { UseQrReaderHook } from "@/types/qr-code";

// TODO: add support for debug logs
export const useQrReader: UseQrReaderHook = ({
  scanDelay: delayBetweenScanAttempts,
  constraints: video,
  onResult,
  videoId,
}) => {
  let controlsRef = useRef<IScannerControls | null>(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader(undefined, {
      delayBetweenScanAttempts,
    });

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
      codeReader
        .decodeFromConstraints({ video }, videoId, (result, error) => {
          if (isValidType(onResult, "onResult", "function")) {
            if (onResult && JSON.stringify(result) !== "{}") {
              onResult(result, error, codeReader);
              return;
            }
          }
        })
        .then((controls: IScannerControls) => (controlsRef.current = controls))
        .catch((error: Error) => {
          if (isValidType(onResult, "onResult", "function")) {
            if (onResult) {
              onResult(null, error, codeReader);
            }
          }
        });
    }

    return () => {
      controlsRef.current?.stop();
    };
  }, []);
};
