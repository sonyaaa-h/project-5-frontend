import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  pageInfo: {
    page: 1,
    perPage: 1,
    totalPages: 0,
    hasNextPage: false,
  },
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
        state.isLoading = false;

        const { data, page, perPage, totalItems, totalPages, hasNextPage } =
          action.payload.data;

        if (page === 1) {
          state.items = data;
        } else {
          state.items = [...state.items, ...data];
        }

        state.pageInfo = {
          page,
          perPage,
          totalItems,
          totalPages,
          hasNextPage,
        };
      })
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTransaction.pending, handlePending)
      .addCase(updateTransaction.rejected, handleRejected);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
