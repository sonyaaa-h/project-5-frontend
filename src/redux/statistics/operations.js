import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/operations";

export const fetchStatistics = createAsyncThunk(
  "statistic/fetch",
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await api.get(`/summary/${year}-${month}`);
      console.log("FETCH RESPONSE", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
