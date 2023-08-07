import { createSlice } from '@reduxjs/toolkit';
import { TaskType } from '../../types/task.type';

interface TaskState {
  tasks: TaskType[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    createTask: (state, action) => {},
    getAllTask: (state, action) => {
      state.tasks = action.payload;
    },
    findAllTask: () => {},
    updateTask: (state, action) => {},
    deleteTask: (state, action) => {},
  },
});
export default taskSlice.reducer;
export const { createTask, getAllTask, findAllTask, updateTask, deleteTask } =
  taskSlice.actions;
