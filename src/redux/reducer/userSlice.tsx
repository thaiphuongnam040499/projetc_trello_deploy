import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user.type';

interface UserState {
  listUser: User[];
  userLogin: null;
}
const initialState: UserState = {
  userLogin: null,
  listUser: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    createUser: (state, action) => {},
    login: (state, action) => {},
    getUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    register: (state, action) => {},
    getUserByEmail: (state, action) => {
      state.listUser = action.payload;
    },
    findUserByEmail: (state, action) => {},
    getAllUser: (state, action) => {
      state.listUser = action.payload;
    },
    findAllUser: () => {},
  },
});

export default userSlice.reducer;
export const {
  createUser,
  login,
  getUserLogin,
  register,
  getUserByEmail,
  findUserByEmail,
  getAllUser,
  findAllUser,
} = userSlice.actions;
