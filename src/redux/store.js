import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/tasksSlice";
import loaderReducer from "./reducers/loaderSlice";

const store = configureStore({
  reducer: {
    tasksCount: tasksReducer,
    loader: loaderReducer,
  },
});

export { store };
