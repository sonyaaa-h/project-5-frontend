import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "../transactions/operations";
import { fetchStatistics } from "../statistics/operations";
import { fetchCategories } from "../categories/operations";

const initialState = {
  isLoading: "false",
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleSettled = (state) => {
  state.isLoading = false;
};

const slice = createSlice({
  name: "global",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.fulfilled, handleSettled)
      .addCase(fetchTransactions.rejected, handleSettled)
      .addCase(fetchStatistics.pending, handlePending)
      .addCase(fetchStatistics.fulfilled, handleSettled)
      .addCase(fetchStatistics.rejected, handleSettled)
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, handleSettled)
      .addCase(fetchCategories.rejected, handleSettled);
  },
});

export const globalReducer = slice.reducer;
