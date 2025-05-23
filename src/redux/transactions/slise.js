import { createSlice } from "@reduxjs/toolkit";
import { deleteTransaction, fetchTransactions } from "./operations";

const initialState = {
  data: [],
  //   loading: false,
  error: null,
};

// const handlePending = (state) => {
// //   state.loading = true;
// };

const handleRejected = (state, action) => {
  //   state.loading = false;
  state.error = action.payload;
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      //   .addCase(fetchTransactions.pending, handlePending)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        // state.loading = false;
        state.data = action.payload;
      })
      //   .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.data = state.data.filter((data) => data.id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, handleRejected);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
