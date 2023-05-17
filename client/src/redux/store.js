import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/taskSlice";
import filterReducer from "./features/filterSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filters: filterReducer,
    auth: authReducer,
  },
});
