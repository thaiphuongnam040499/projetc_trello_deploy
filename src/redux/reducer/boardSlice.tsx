import { createSlice } from '@reduxjs/toolkit';
import { BoardType } from '../../types/board.type';

interface BoardState {
  listBoard: BoardType[];
  board: BoardType | null;
}

const initialState: BoardState = {
  listBoard: [],
  board: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {
    createBoard: (state, action) => {},
    findAllBoard: () => {},
    getAllBoard: (state, action) => {
      state.listBoard = action.payload;
    },
    findCreateBoard: (state, action) => {
      state.board = action.payload;
    },
    reset: (state) => {
      state.board = null;
    },
    deleteBoard: (state, action) => {},
  },
});

export default boardSlice.reducer;
export const {
  reset,
  createBoard,
  findAllBoard,
  getAllBoard,
  findCreateBoard,
  deleteBoard,
} = boardSlice.actions;
