import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BRANCH } from "@/types/branch";
import { getCountBranchs, getFilterBranchs } from "@/data/branch";

// Define a type for the Branch state
export interface BranchManagerState {
  branchList: BRANCH[] | [];
  branch: BRANCH | null;
  status: "idle" | "loading" | "failed";
  message: {
    type: "success" | "error" | "warning" | null;
    content: string;
  };
}
export interface fields {
  query: string;
  currentPage: number;
  entries: number;
}

// Define the initial state using that type
const initialState: BranchManagerState = {
  branchList: [],
  branch: null,
  status: "idle",
  message: {
    type: null,
    content: "",
  },
};
export const { reducer: branchManagerReducer, actions: branchManagerActions } =
  createSlice({
    name: "branchManager",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getBranchList.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getBranchList.fulfilled, (state, action) => {
          state.status = "idle";
          state.branchList = action.payload;
        })
        .addCase(getBranchList.rejected, (state, action) => {
          state.status = "failed";
          state.message = {
            type: "error",
            content: action.error.message as string,
          };
        });
    },
  });

export const getBranchList = createAsyncThunk(
  "branch-slice/getBranchList",
  async (arg: fields, { dispatch, getState, rejectWithValue }) => {
    try {
      const branchList = (await getFilterBranchs(
        arg.query,
        arg.currentPage,
        arg.entries,
      )) as BRANCH[];
      return branchList;
    } catch (error: any) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);
export const getCountBranch = createAsyncThunk(
  "branch-slice/getCountBranch",
  async (arg: fields, { dispatch, getState, rejectWithValue }) => {
    try {
      const count = await getCountBranchs(arg.query);
      return count;
    } catch (error: any) {
      console.log("error: ", error);
      return rejectWithValue(error.response.data);
    }
  },
);
