import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasksCount",
  initialState: {
    count: 0,
  },
  reducers: {
    setTasksCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setTasksCount } = tasksSlice.actions;

export default tasksSlice.reducer;
