import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { store } from "../store";
import { logoutThunk } from "./logoutThunk";
import { api, clearAuthHeader, setAuthHeader } from "./api";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthHeader();
      store.dispatch(logoutThunk());
    }
    return Promise.reject(error);
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (body, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", body);
      const token = res.data.data.accessToken;
      setAuthHeader(token);

      const userResponse = await api.get("/users/current");
      const user = userResponse.data.data;

      return { user, accessToken: token };
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (body, thunkAPI) => {
    try {
      if (body.password !== body.confirmPassword) {
        throw new Error(
          toast.error("Passwords do not match", {
            duration: 2000,
            style: {
              background: "rgb(206, 84, 84)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "500",
            },
          })
        );
      }
      const registerBody = { ...body };
      delete registerBody.confirmPassword;
      const response = await api.post("/auth/register", registerBody);
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("User already exists! Please log in!", {
          duration: 2000,
          style: {
            background: "rgb(206, 84, 84)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
        return thunkAPI.rejectWithValue("User already exists! Please log in!");
      } else {
        toast.error(error.message, {
          duration: 2000,
          style: {
            background: "rgb(206, 84, 84)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "500",
          },
        });
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users/current");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "auth/updateCurrentUser",
  async (body, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;

      if (!token) {
        return thunkAPI.rejectWithValue("No token provided");
      }

      setAuthHeader(token);

      await api.patch("/users/current", body);

      const userResponse = await api.get("/users/current");
      const user = userResponse.data.data;

      return { user, accessToken: token };
    } catch (error) {
      console.error("Update error:", error);
      const message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
