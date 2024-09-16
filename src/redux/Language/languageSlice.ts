// languageSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
  isRTL: false,
  loading: false, // Add this line
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setIsRTL: (state, action) => {
      state.isRTL = action.payload;
    },
    setLoading: (state, action) => {
      // Add this reducer
      state.loading = action.payload;
    },
  },
});

export const { setLanguage, setIsRTL, setLoading } = languageSlice.actions;
export default languageSlice.reducer;
