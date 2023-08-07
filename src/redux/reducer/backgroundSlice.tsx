import { createSlice } from '@reduxjs/toolkit';
import { BgType } from '../../types/bg.type';
import { BgColor } from '../../types/bColor.type';

interface BackgroundState {
  backgrounds: BgType[];
  backgroundColors: BgColor[];
}

const initialState: BackgroundState = {
  backgrounds: [],
  backgroundColors: [],
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState: initialState,
  reducers: {
    findAllBackground: () => {},
    getAllBackground: (state, action) => {
      state.backgrounds = action.payload;
    },
    findAllBgColor: () => {},
    getAllBgColor: (state, action) => {
      state.backgroundColors = action.payload;
    },
    updateBgColor: (state, action) => {},
  },
});
export default backgroundSlice.reducer;
export const {
  findAllBackground,
  getAllBackground,
  findAllBgColor,
  getAllBgColor,
  updateBgColor,
} = backgroundSlice.actions;
