import { BRANCH } from "./branch";
import { ROOMTYPE } from "./room-type";

export type ROOM = {
  id: string;
  code: string;
  floor: number;
  branchId: string;
  roomTypeCode: string;
  branch: BRANCH;
  roomType: ROOMTYPE;
  description?: string;
};
