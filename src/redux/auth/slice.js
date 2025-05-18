import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: null,
        email: null,
        balance: 0,
        id: null,
        createdAt: null,
        avatarUrl: null
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logOut: (state) => {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            state.isRefreshing = false;
        },
        setIsRefreshing: (state, action) => {
            state.isRefreshing = action.payload;
        },
    },
});

export const { setUser, setToken, logOut, setIsRefreshing } = slice.actions;
export const authReducer = slice.reducer;
