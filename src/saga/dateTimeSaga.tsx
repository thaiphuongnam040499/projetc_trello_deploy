import { call, put } from 'redux-saga/effects';
import * as dateTimeService from '../api/dateTimeService';
import { DateTime } from '../types/dateTime.type';
import { getAllDateTime } from '../redux/reducer/dateTimeSlice';
import { PayloadAction } from '@reduxjs/toolkit';

export const DATETIME_SAGA_GET = function* () {
  try {
    let dateTimes: DateTime = yield call(dateTimeService.DATETIME_GET_SERVICE);
    yield put(getAllDateTime(dateTimes));
  } catch (error) {
    console.log(error);
  }
};

export const DATETIME_SAGA_POST = function* (action: PayloadAction<DateTime>) {
  try {
    yield call(dateTimeService.DATETIME_POST_SERVICE, action.payload);
    yield DATETIME_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const DATETIME_SAGA_PATCH = function* (action: PayloadAction<DateTime>) {
  try {
    yield call(dateTimeService.DATETIME_PATCH_SERVICE, action.payload);
    yield DATETIME_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const DATETIME_SAGA_DELETE = function* (action: PayloadAction<string>) {
  try {
    yield call(dateTimeService.DATETIME_DELETE_SERVICE, action.payload);
    yield DATETIME_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};
