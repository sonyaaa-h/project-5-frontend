import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  operationsCount: 0,
};

const slice = createSlice({
  name: "global",
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("pending");
        },
        (state) => {
          state.operationsCount += 1;
        }
      )
      .addMatcher(
        (action) => {
          return (
            action.type.endsWith("fulfilled") ||
            action.type.endsWith("rejected")
          );
        },
        (state) => {
          state.operationsCount = Math.max(0, state.operationsCount - 1);
        }
      );
  },
});

export const globalReducer = slice.reducer;
