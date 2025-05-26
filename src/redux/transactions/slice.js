import { createSlice } from "@reduxjs/toolkit";
import { deleteTransaction, fetchTransactions } from "./operations";

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
      })
      .addCase(deleteTransaction.rejected, handleRejected);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
