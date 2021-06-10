import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskBodyIsHidden: true,
  editTaskData: null,
  taskIds: [],
  hideTasks: false
};

const DataSclice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateTaskState: (state, action) => {
      state.taskBodyIsHidden = action.payload.taskBodyIsHidden;
    },
    editTask: (state, action) => {
      state.editTaskData = action.payload.editTaskData;
    },
    setTaskId: (state, action) => {
      state.taskIds.push(action.payload.taskIds);
    },
    updateState: (state, action) => {
      state.hideTasks = action.payload.hideTasks
    }
  },
});

export const getTaskState = (state) => state.global;
export const { updateTaskState, editTask, setTaskId, updateState } = DataSclice.actions;
export default DataSclice.reducer;
