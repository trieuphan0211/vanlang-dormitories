import { createSlice } from "@reduxjs/toolkit";

export interface alertState {
  status: boolean;
  message: {
    type: "success" | "error" | "warning" | null;
    content: string;
  };
}

// Define the initial state using that type
const initialState: alertState = {
  status: false,
  message: {
    type: null,
    content: "",
  },
};
export const { reducer: alertManagerReducer, actions: alertManagerActions } =
  createSlice({
    name: "alertManager",
    initialState,
    reducers: {
      setAlert: (
        state: alertState,
        action: {
          payload: {
            status?: boolean;
            message?: {
              type: "success" | "error" | "warning" | null;
              content: string;
            };
          };
        },
      ) => {
        if (action.payload.status) {
          state.status = action.payload.status;
        }
        if (action.payload.message) {
          state.message.content = action.payload.message.content;
          state.message.type = action.payload.message.type;
        }
      },
    },
  });
