import { createSlice } from '@reduxjs/toolkit';
import { WorkingSpaceType } from '../../types/workingSpace.type';

interface WorkingSpaceState {
  listWorkingSpace: WorkingSpaceType[];
  workingSpace: WorkingSpaceType | null;
}

const initialState: WorkingSpaceState = {
  listWorkingSpace: [],
  workingSpace: null,
};

export const workingSpaceSlice = createSlice({
  name: 'workingSpace',
  initialState: initialState,
  reducers: {
    createWorkingSpace: (state, action) => {},

    findAllWorkingSpace: () => {},

    getAllWorkingSpace: (state, action) => {
      state.listWorkingSpace = action.payload;
    },
    findCreateWs: (state, action) => {
      state.workingSpace = action.payload;
    },
    findWsByUserId: (state, action) => {},
    getWsByUserId: (state, action) => {
      state.listWorkingSpace = action.payload;
    },
    deleteWs: (state, action) => {},
  },
});
export default workingSpaceSlice.reducer;

export const {
  createWorkingSpace,
  findAllWorkingSpace,
  getAllWorkingSpace,
  findCreateWs,
  findWsByUserId,
  getWsByUserId,
  deleteWs,
} = workingSpaceSlice.actions;
