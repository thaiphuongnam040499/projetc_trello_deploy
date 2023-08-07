import { call, put } from 'redux-saga/effects';
import {
  FIND_WS_BY_USERID_SERVICE,
  WORKINGSPACE_DELETE_SERVICE,
  WORKINGSPACE_GET_SERVICE,
  WORKINGSPACE_POST_SERVICE,
} from '../api/workingSpaceService';
import {
  createWorkingSpace,
  findCreateWs,
  getAllWorkingSpace,
  getWsByUserId,
} from '../redux/reducer/workingSpaceSlice';
import { WorkingSpaceType } from '../types/workingSpace.type';
import { PayloadAction } from '@reduxjs/toolkit';

export const WORKINGSPACE_SAGA_GET = function* (): Generator<any, void, any> {
  try {
    let listWorkingSpace = yield call(WORKINGSPACE_GET_SERVICE);
    yield put(getAllWorkingSpace(listWorkingSpace));
  } catch (error) {
    console.log(error);
  }
};

export const findProjectsByUserId = function* (action: any) {
  try {
    let response: WorkingSpaceType[] = yield call(
      FIND_WS_BY_USERID_SERVICE,
      action.payload
    );
    yield put(getWsByUserId(response));
  } catch (error) {}
};

export const WORKINGSPACE_SAGA_POST = function* (
  action: PayloadAction<WorkingSpaceType>
) {
  try {
    let workingSpace: WorkingSpaceType = yield call(
      WORKINGSPACE_POST_SERVICE,
      action.payload
    );
    yield put(findCreateWs(workingSpace));
    yield WORKINGSPACE_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const WORKINGSPACE_SAGA_DELETE = function* (action: any) {
  try {
    yield call(WORKINGSPACE_DELETE_SERVICE, action.payload);
    yield WORKINGSPACE_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};
