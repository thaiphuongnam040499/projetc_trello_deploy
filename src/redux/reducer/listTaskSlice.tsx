import { createSlice } from '@reduxjs/toolkit';
import { ListTask } from '../../types/listTask.type';

interface ListTaskState {
  listTask: ListTask[];
}

const initialState: ListTaskState = {
  listTask: [],
};

export const listTaskSlice = createSlice({
  name: 'listTask',
  initialState: initialState,
  reducers: {
    createListTask: (state, action) => {},
    findAllListTask: () => {},
    getAllListTask: (state, action) => {
      state.listTask = action.payload;
    },
    updateListTask: (state, action) => {},
    deleteListTask: (state, action) => {},
  },
});
export default listTaskSlice.reducer;
export const {
  createListTask,
  findAllListTask,
  getAllListTask,
  updateListTask,
  deleteListTask,
} = listTaskSlice.actions;
