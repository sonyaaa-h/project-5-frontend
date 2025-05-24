import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./operations";

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

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, handlePending)
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data;
            })
            .addCase(fetchCategories.rejected, handleRejected);
            
    },
});

export const categoriesReducer = categoriesSlice.reducer;
