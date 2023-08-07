import { createSlice } from '@reduxjs/toolkit';
import { MemberId } from '../../types/member.type';
import { MemberCardType } from '../../types/memberCard.type';

interface MemberCardState {
  listMemberCard: MemberCardType[];
}

const initialState: MemberCardState = {
  listMemberCard: [],
};

export const memberCardSlice = createSlice({
  name: 'memberCard',
  initialState: initialState,
  reducers: {
    getAllMemberCard: (state, action) => {
      state.listMemberCard = action.payload;
    },
    findAllMemberCard: () => {},
    createMemberCard: (state, action) => {},
    deleteMemberCard: (state, action) => {},
  },
});

export default memberCardSlice.reducer;
export const {
  getAllMemberCard,
  findAllMemberCard,
  createMemberCard,
  deleteMemberCard,
} = memberCardSlice.actions;
