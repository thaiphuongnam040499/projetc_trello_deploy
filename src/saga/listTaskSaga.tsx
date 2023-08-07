import { call, put } from 'redux-saga/effects';
import * as listTaskService from '../api/listTaskService';
import { getAllListTask } from '../redux/reducer/listTaskSlice';
import { ListTask } from '../types/listTask.type';

export const LISTTASK_SAGA_GET = function* () {
  try {
    let listTask: ListTask = yield call(listTaskService.LISTTASK_GET_SERVICE);
    yield put(getAllListTask(listTask));
  } catch (error) {
    console.log(error);
  }
};

export const LISTTASK_SAGA_POST = function* (action: any) {
  try {
    yield call(listTaskService.LISTTASK_POST_SERVICE, action.payload);
    yield LISTTASK_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const LISTTASK_SAGA_PATCH = function* (action: any) {
  try {
    yield call(listTaskService.LISTTASK_PATCH_SERVICE, action.payload);
    yield LISTTASK_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const LISTTASK_SAGA_DELETE = function* (action: any) {
  try {
    yield call(listTaskService.LISTTASK_DELETE_SERVICE, action.payload);
    yield LISTTASK_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};
