import { call, put } from 'redux-saga/effects';
import {
  LANE_DELETE_SERVICE,
  LANE_PATCH_SERVICE,
  LIST_GET_SERVICE,
  LIST_POST_SERVICE,
  LIST_PUT_SERVICE,
} from '../api/laneService';
import { getAllLane } from '../redux/reducer/laneSlice';

export function* LIST_SAGA_GET(): Generator<any, void, any> {
  try {
    let list = yield call(LIST_GET_SERVICE);
    yield put(getAllLane(list));
  } catch (error) {
    console.log(error);
  }
}
export const LIST_SAGA_POST = function* (action: any) {
  try {
    yield call(LIST_POST_SERVICE, action.payload);
    yield LIST_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const LANE_SAGA_PATCH = function* (action: any) {
  try {
    yield call(LANE_PATCH_SERVICE, action.payload);
  } catch (error) {
    console.log(error);
  }
};

export const LIST_SAGA_PUT = function* (action: any) {
  try {
    yield call(LIST_PUT_SERVICE, action.payload);
    yield LIST_SAGA_GET();
    console.log(action.payload);
  } catch (error) {
    console.log(error);
  }
};

export const LANE_SAGA_DELETE = function* (action: any) {
  try {
    yield call(LANE_DELETE_SERVICE, action.payload);
  } catch (error) {
    console.log(error);
  }
};
