"use server";
import crypto from "crypto";
let keyIn = "";
let keyOut = "";

export const generateKeyIn = () => {
  keyIn = crypto.randomInt(1_000_000_000, 10_000_000_000).toString();
  return keyIn;
};
export const generateKeyOut = () => {
  keyOut = crypto.randomInt(1_000_000_000, 10_000_000_000).toString();
  return keyOut;
};
export const checkKeyIn = (currentKey: string) => {
  return currentKey === keyIn;
};
export const checkKeyOut = (currentKey: string) => {
  return currentKey === keyOut;
};
