import { createSlice } from "@reduxjs/toolkit";
import {
    registerThunk,
    loginThunk,
    getCurrentUserThunk,
    updateUserThunk,
} from "./operations";
import { logoutThunk } from "./logoutThunk";

const initialState = {
    user: {
        name: null,
        email: null,
        balance: 0,
        photo: "",
    },
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const handlePending = (state) => {
    state.isLoading = true;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const slice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user.userId = action.payload._id;
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.user.balance = action.payload.balance;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
                state.isAuthLoading = false;
            })
            .addCase(registerThunk.pending, handlePending)
            .addCase(registerThunk.rejected, handleRejected)
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
                state.user.balance = action.payload.user.balance;
                state.user.photo = action.payload.user.photo;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(loginThunk.pending, handlePending)
            .addCase(loginThunk.rejected, handleRejected)

            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.user.name = action.payload.user.name;
                state.user.email = action.payload.user.email;
                state.user.photo = action.payload.user.photo;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(updateUserThunk.pending, handlePending)
            .addCase(updateUserThunk.rejected, handleRejected)
            .addCase(logoutThunk.fulfilled, () => initialState)
            .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
                state.user.balance = action.payload.balance;
            })

            .addCase(getCurrentUserThunk.pending, handlePending)
            .addCase(getCurrentUserThunk.rejected, handleRejected);
    },
});

export const { setUser, setToken, logOut, setIsRefreshing } = slice.actions;
export const authReducer = slice.reducer;
