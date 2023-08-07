import { call, put } from 'redux-saga/effects';
import { MemberId } from '../types/member.type';
import {
  MEMBERCARD_DELETE_SERVICE,
  MEMBERCARD_GET_SERVICE,
  MEMBERCARD_POST_SERVICE,
} from '../api/memberCard';
import {
  deleteMemberCard,
  getAllMemberCard,
} from '../redux/reducer/memberCardSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { MemberCardType } from '../types/memberCard.type';

export const MEMBERCARD_SAGA_GET = function* () {
  try {
    let memberCards: MemberCardType[] = yield call(MEMBERCARD_GET_SERVICE);
    yield put(getAllMemberCard(memberCards));
  } catch (error) {
    console.log(error);
  }
};

export const MEMBERCARD_SAGA_POST = function* (action: any) {
  try {
    yield call(MEMBERCARD_POST_SERVICE, action.payload);
    yield MEMBERCARD_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const MEMBERCARD_SAGA_DELETE = function* (action: any) {
  try {
    yield call(MEMBERCARD_DELETE_SERVICE, action.payload);
    yield MEMBERCARD_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};
