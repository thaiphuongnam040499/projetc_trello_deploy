import { call, put } from 'redux-saga/effects';
import {
  MEMBERWS_DELETE_SERVICE,
  MEMBERWS_GET_SERVICE,
  MEMBERWS_POST_SERVICE,
} from '../api/memberWsService';
import { MemberWsType } from '../types/memberWs.type';
import { getAllMemberWs } from '../redux/reducer/memberWsSlice';

export const MEMBERWS_SAGA_GET = function* () {
  try {
    let memberWs: MemberWsType[] = yield call(MEMBERWS_GET_SERVICE);
    yield put(getAllMemberWs(memberWs));
  } catch (error) {
    console.log(error);
  }
};

export const MEMBERWS_SAGA_POST = function* (action: any) {
  try {
    yield call(MEMBERWS_POST_SERVICE, action.payload);
    yield MEMBERWS_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const MEMBERWS_SAGA_DELETE = function* (action: any) {
  try {
    yield call(MEMBERWS_DELETE_SERVICE, action.payload);
    yield MEMBERWS_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};
