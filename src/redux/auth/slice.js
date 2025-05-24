import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  loginThunk,
  logoutThunk,
  getCurrentUserThunk,
  refreshUser,
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
        console.log("Register successful:", action.payload);
        state.user.userId = action.payload._id;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.balance = action.payload.balance;
        // state.token = action.payload.accessToken;
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
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(getCurrentUserThunk.pending, handlePending)
      .addCase(getCurrentUserThunk.rejected, handleRejected);
  },
});

export const { setUser, setToken, logOut, setIsRefreshing } = slice.actions;
export const authReducer = slice.reducer;
