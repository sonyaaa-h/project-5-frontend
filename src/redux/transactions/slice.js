import { createSlice } from "@reduxjs/toolkit";
import { deleteTransaction, fetchTransactions } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.items = action.payload.data.data;
        state.pageInfo = {
          page: action.payload.data.page,
          perPage: action.payload.data.perPage,
          totalItems: action.payload.data.totalItems,
          totalPages: action.payload.data.totalPages,
          hasNextPage: action.payload.data.hasNextPage,
        };
      })
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, handleRejected);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
