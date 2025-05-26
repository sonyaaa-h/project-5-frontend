import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, clearAuthHeader } from "./api";


export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await api.post("/auth/logout");
            clearAuthHeader();
            return;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
