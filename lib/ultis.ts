"use client";
export const isMediaDevicesSupported = () => {
  const isMediaDevicesSupported =
    typeof navigator !== "undefined" && !!navigator.mediaDevices;
  console.log("isMediaDevicesSupported: ", isMediaDevicesSupported);
  if (!isMediaDevicesSupported) {
    console.warn(
      `[ReactQrReader]: MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"`,
    );
  }

  return isMediaDevicesSupported;
};

export const isValidType = (value: any, name: string, type: string) => {
  const isValid = typeof value === type;
  console.log();
  if (!isValid) {
    console.warn(
      `[ReactQrReader]: Expected "${name}" to be a of type "${type}".`,
    );
  }

  return isValid;
};
