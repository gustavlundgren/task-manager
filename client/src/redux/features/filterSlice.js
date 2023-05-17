import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.value.push(action.payload);
    },
    resetFilters: (state) => {
      state.value = [];
    },
  },
});

export const { addFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
