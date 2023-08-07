import { createSlice } from '@reduxjs/toolkit';
import { MemberWsType } from '../../types/memberWs.type';

interface MemberWsState {
  memberWs: MemberWsType[];
}

const initialState: MemberWsState = {
  memberWs: [],
};

const memberWsSlice = createSlice({
  name: 'memberWs',
  initialState: initialState,
  reducers: {
    getAllMemberWs: (state, action) => {
      state.memberWs = action.payload;
    },
    findAllMemberWs: () => {},
    createMemberWs: (state, action) => {},
    deleteMemberWs: (state, action) => {},
  },
});

export default memberWsSlice.reducer;
export const {
  getAllMemberWs,
  findAllMemberWs,
  createMemberWs,
  deleteMemberWs,
} = memberWsSlice.actions;
