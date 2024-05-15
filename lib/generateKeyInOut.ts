"use server";
import crypto from "crypto";
let keyIn = "";
let keyOut = "";

export const generateKeyIn = async () => {
  keyIn = crypto.randomInt(1_000_000_000, 10_000_000_000).toString();
  return {
    key: keyIn,
    type: "in",
  };
};
export const generateKeyOut = async () => {
  keyOut = crypto.randomInt(1_000_000_000, 10_000_000_000).toString();
  return {
    key: keyOut,
    type: "out",
  };
};
export const checkKeyIn = async (currentKey: string) => {
  if (currentKey === keyIn) {
    return { success: "Đã Check in thành công!" };
  } else {
    return { error: "Có lỗi xảy ra! Vui lòng thử lại!" };
  }
};
export const checkKeyOut = async (currentKey: string) => {
  if (currentKey === keyOut) {
    return { success: "Đã Check out thành công!" };
  } else {
    return { error: "Có lỗi xảy ra! Vui lòng thử lại!" };
  }
};
