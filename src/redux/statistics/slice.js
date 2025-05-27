import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistics } from "./operations.js";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  month: String(new Date().getMonth() + 1).padStart(2, "0"),
  year: String(new Date().getFullYear()),
  isIncome: true,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setMonth(state, action) {
      state.month = action.payload;
    },
    setYear(state, action) {
      state.year = action.payload;
    },
    setIsIncome(state, action) {
      state.isIncome = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setMonth, setYear, setIsIncome } = statisticsSlice.actions;
export const statisticsReducer = statisticsSlice.reducer;
