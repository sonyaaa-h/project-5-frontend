import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://spendy-mu36.onrender.com";

export const fetchStatistics = createAsyncThunk(
  "statistic/fetch",
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await axios.get(`/summary/${year}-${month}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
