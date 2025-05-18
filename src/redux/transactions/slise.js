import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "./operations";

const initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const handlePending = (state) => {
    state.loading = true;
};

const handleRejected = (state, action) => {
    state.loading = false;
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
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, handleRejected);
    },
});

export const transactionsReducer = transactionsSlice.reducer;
