import { call, put } from 'redux-saga/effects';
import {
  MEMBER_DELETE_SERVICE,
  MEMBER_GET_SERVICE,
  MEMBER_PATCH_SERVICE,
  MEMBER_POST_SERVICE,
} from '../api/memberService';
import { MemberId, MemberType } from '../types/member.type';
import { findCreateMember, getAllMember } from '../redux/reducer/memberSlice';

export const MEMBER_SAGA_GET = function* () {
  try {
    let members: MemberType = yield call(MEMBER_GET_SERVICE);
    yield put(getAllMember(members));
  } catch (error) {
    console.log(error);
  }
};

export const MEMBER_SAGA_POST = function* (action: any) {
  try {
    let member: MemberId = yield call(MEMBER_POST_SERVICE, action.payload);
    yield put(findCreateMember(member));
    yield MEMBER_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const MEMBER_SAGA_PATCH = function* (action: any) {
  try {
    yield call(MEMBER_PATCH_SERVICE, action.payload);
    yield MEMBER_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const MEMBER_SAGA_DELETE = function* (action: any) {
  try {
    yield call(MEMBER_DELETE_SERVICE, action.payload);
    yield MEMBER_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};
