import { createSlice } from "@reduxjs/toolkit";
import { registerThunk, loginThunk, logoutThunk } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
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
        state.user.userId = action.payload._id;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.balance = action.payload.balance;
        state.token = action.payload.accessToken;
        state.isLoggedIn = false;
        state.isAuthLoading = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log("Login successful:", action.payload);
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const { setUser, setToken, logOut, setIsRefreshing } = slice.actions;
export const authReducer = slice.reducer;
