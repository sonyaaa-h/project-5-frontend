import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getCurrentUserThunk } from "../auth/operations.js";
import { api } from "../auth/api.js";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (page = 1, thunkAPI) => {
    try {
      const response = await api.get(`transactions?page=${page}`);
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
      const message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (newTransactionData, thunkAPI) => {
    try {
      const response = await api.post("/transactions", newTransactionData);
      thunkAPI.dispatch(getCurrentUserThunk()); //оновлення баланс      
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, updatedTransactionData }, thunkAPI) => {
    try {
      const response = await api.patch(
        `/transactions/${id}`,
        updatedTransactionData
      );
      thunkAPI.dispatch(getCurrentUserThunk()); //оновлення балансу
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      await api.delete(`/transactions/${transactionId}`);
      thunkAPI.dispatch(getCurrentUserThunk());
      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
