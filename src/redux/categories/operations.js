import { createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "../auth/operations"

export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async ({signal}, thunkAPI) => {
        try {
            const response = await api.get("/categories", {signal});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
