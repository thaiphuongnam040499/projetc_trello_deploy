import { createSlice } from '@reduxjs/toolkit';
import { CardTagType } from '../../types/cardTag.type';

interface cardTagsState {
  cardTags: CardTagType[];
}

const initialState: cardTagsState = {
  cardTags: [],
};

const cardTagSlice = createSlice({
  name: 'cardTag',
  initialState: initialState,
  reducers: {
    getAllCardTag: (state, action) => {
      state.cardTags = action.payload;
    },
    findAllCardTag: () => {},
    createCardTag: (state, action) => {},
    deleteCardTag: (state, action) => {},
    updateCardTag: (state, action) => {},
  },
});

export default cardTagSlice.reducer;
export const {
  getAllCardTag,
  findAllCardTag,
  createCardTag,
  deleteCardTag,
  updateCardTag,
} = cardTagSlice.actions;
