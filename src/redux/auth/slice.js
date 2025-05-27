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

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.user.userId = action.payload._id;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.balance = action.payload.balance;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isAuthLoading = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.balance = action.payload.user.balance;
        state.user.photo = action.payload.user.photo;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.photo = action.payload.user.photo;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.user.balance = action.payload.balance;
      });
  },
});

export const { setUser, setToken, logOut, setIsRefreshing } = slice.actions;
export const authReducer = slice.reducer;
