import { FACILITIES } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface qrState {
  qrList: FACILITIES[];
}

// Define the initial state using that type
const initialState: qrState = {
  qrList: [],
};
export const { reducer: qrManagerReducer, actions: qrManagerActions } =
  createSlice({
    name: "qrCodeManager",
    initialState,
    reducers: {
      setQrCode: (
        state: qrState,
        action: { payload: { qrList: FACILITIES[] } },
      ) => {
        state.qrList = action.payload.qrList;
      },
    },
  });
