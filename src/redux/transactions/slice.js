import { createSlice } from "@reduxjs/toolkit";
import { deleteTransaction, fetchTransactions } from "./operations";

const initialState = {
  items: [],
  // loading: false,
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
        console.log(action.payload);

        // state.loading = false;
        state.items = action.payload.data;
      })
      //   .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, handleRejected);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
