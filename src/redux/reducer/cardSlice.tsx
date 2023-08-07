import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Card } from 'react-trello-ts/dist/types/Board';

interface CardState {
  listCard: Card[];
}

const initialState: CardState = {
  listCard: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState: initialState,
  reducers: {
    create: (state, action: PayloadAction<Card>) => {},
    getAllCard: (state, action: PayloadAction<Card[]>) => {
      state.listCard = action.payload;
    },
    findAllCard: () => {},
    updateCard: (state, action) => {},
    deleteCard: (state, action) => {},
    findCardByTitle: (state, action) => {},
    getCardByTitle: (state, action) => {
      state.listCard = action.payload;
    },
    findCardFilter: (state, action) => {},
    getCardFilter: (state, action) => {
      state.listCard = action.payload;
    },
  },
});

export default cardSlice.reducer;
export const {
  create,
  findAllCard,
  getAllCard,
  updateCard,
  deleteCard,
  findCardByTitle,
  getCardByTitle,
  getCardFilter,
  findCardFilter,
} = cardSlice.actions;
