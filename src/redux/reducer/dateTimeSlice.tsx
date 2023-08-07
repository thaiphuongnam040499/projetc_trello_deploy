import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from '../../types/dateTime.type';

interface DateTimeState {
  dateTimes: DateTime[];
}

const initialState: DateTimeState = {
  dateTimes: [],
};

const dateTimeSlice = createSlice({
  name: 'datetime',
  initialState: initialState,
  reducers: {
    getAllDateTime: (state, action) => {
      state.dateTimes = action.payload;
    },
    findAllDateTime: () => {},
    createDateTime: (state, action) => {},
    updateDateTime: (state, action) => {},
    deleteDateTime: (state, action) => {},
  },
});
export default dateTimeSlice.reducer;
export const {
  getAllDateTime,
  findAllDateTime,
  createDateTime,
  updateDateTime,
  deleteDateTime,
} = dateTimeSlice.actions;
