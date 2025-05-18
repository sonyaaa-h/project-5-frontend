import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://spendy-mu36.onrender.com";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/transactions");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
