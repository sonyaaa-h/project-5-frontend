import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser, setIsRefreshing } from "./slice"; // setToken импортирован для будущего использования
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: "https://spendy-mu36.onrender.com",
});

const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};

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
      // console.log(error.response.data);
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

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      thunkAPI.dispatch(setIsRefreshing(true));
      const response = await api.get("/auth/current");
      thunkAPI.dispatch(
        setUser({
          user: response.data,
          token: persistedToken,
        })
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setIsRefreshing(false));
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