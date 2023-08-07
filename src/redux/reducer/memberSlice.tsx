import { createSlice } from '@reduxjs/toolkit';
import { MemberId, MemberType } from '../../types/member.type';

interface MemberState {
  members: MemberId[];
  member: MemberId | null;
}

const initialState: MemberState = {
  members: [],
  member: null,
};

export const memberSlice = createSlice({
  name: 'member',
  initialState: initialState,
  reducers: {
    getAllMember: (state, action) => {
      state.members = action.payload;
    },
    findAllMember: () => {},
    createMember: (state, action) => {},
    updateMember: (state, action) => {},
    deleteMember: (state, action) => {},
    findCreateMember: (state, action) => {
      state.member = action.payload;
    },
    resetMember: (state) => {
      state.member = null;
    },
  },
});
export default memberSlice.reducer;
export const {
  getAllMember,
  findAllMember,
  createMember,
  updateMember,
  deleteMember,
  findCreateMember,
  resetMember,
} = memberSlice.actions;
