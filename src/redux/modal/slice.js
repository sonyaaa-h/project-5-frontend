import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModals: [],
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      if (!state.activeModals.includes(action.payload)) {
        state.activeModals.push(action.payload);
      }
    },
    closeModal: (state, action) => {
      state.activeModals = state.activeModals.filter(id => id !== action.payload);
    },
    closeAllModals: (state) => {
      state.activeModals = [];
    },
  },
});

export const { openModal, closeModal, closeAllModals } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
