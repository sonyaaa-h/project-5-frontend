import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/api";

export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/categories");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
