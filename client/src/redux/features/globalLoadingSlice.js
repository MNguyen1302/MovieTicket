import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
  name: "AuthModal",
  initialState: {
    globalLoading: false,
    spinnerLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setSpinnerLoading: (state, action) => {
      state.spinnerLoading = action.payload;
    }
  }
});

export const {
  setGlobalLoading,
  setSpinnerLoading
} = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;