import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: true,
    isRefreshing: false,
};

const slice = createSlice({
    name: "auth",
    initialState,

    reducers: {},
});

export const authReducer = slice.reducer;
