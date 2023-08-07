import { call, put } from 'redux-saga/effects';
import {
  BC_GET_SERVICE,
  BC_PATCH_SERVICE,
  BG_GET_SERVICE,
} from '../api/backgroundService';
import { BgType } from '../types/bg.type';
import {
  getAllBackground,
  getAllBgColor,
} from '../redux/reducer/backgroundSlice';
import { BgColor } from '../types/bColor.type';

export const BG_SAGA_GET = function* () {
  try {
    let bgs: BgType = yield call(BG_GET_SERVICE);
    yield put(getAllBackground(bgs));
  } catch (error) {
    console.log(error);
  }
};

export const BGC_SAGA_GET = function* () {
  try {
    let bgC: BgColor = yield call(BC_GET_SERVICE);
    yield put(getAllBgColor(bgC));
  } catch (error) {
    console.log(error);
  }
};

export const BGC_SAGA_PATCH = function* (action: any) {
  try {
    yield call(BC_PATCH_SERVICE, action.payload);
    yield BGC_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};
