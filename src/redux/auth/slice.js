import { createSlice } from "@reduxjs/toolkit";
import {
    registerThunk,
    loginThunk,
    logoutThunk,
} from "./operations";

const initialState = {
    user: {
        name: null,
        email: null,
        balance: 0,
    },
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const slice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.fulfilled, (state, action) => {
                console.log("Register successful:", action.payload);
                state.user.userId = action.payload._id;
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.user.balance = action.payload.balance;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
                state.isAuthLoading = false;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                console.log("Login successful:", action.payload);
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
                state.user.balance = action.payload.user.balance;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(logoutThunk.fulfilled, () => initialState)
            // .addCase(refreshThunk.pending, (state) => {

            //     state.isRefreshing = true;
            // })
            // .addCase(refreshThunk.fulfilled, (state, action) => {
            //     state.user.name = action.payload.user.name;
            //     state.user.email = action.payload.user.email;
            //     state.user.balance = action.payload.user.balance;
            //     state.accessToken = action.payload.accessToken;
            //     state.isLoggedIn = true;
            //     state.isRefreshing = false;
            // })
            // .addCase(refreshThunk.rejected, (state, action) => {
            //     console.error("Refresh failed:", action.payload || action.error.message);
            //     state.isRefreshing = false;
            //     state.isLoggedIn = false;
            //     state.user = { name: null, email: null, balance: 0 };
            //     state.accessToken = null;
            // });
    },
});

export const authReducer = slice.reducer;
