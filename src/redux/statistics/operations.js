import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/api";

export const fetchStatistics = createAsyncThunk(
  "statistic/fetch",
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await api.get(`/summary/${year}-${month}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
