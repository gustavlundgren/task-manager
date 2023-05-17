import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.value = action.payload;
    },
    resetTasks: (state) => {
      state.value = [];
    },
  },
});

export const { addTask, resetTasks } = taskSlice.actions;
export default taskSlice.reducer;
