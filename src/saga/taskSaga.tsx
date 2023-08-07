import { call, put } from 'redux-saga/effects';
import {
  TASK_DELETE_SERVICE,
  TASK_GET_SERVICE,
  TASK_PATCH_SERVICE,
  TASK_POST_SERVICE,
} from '../api/taskService';
import { getAllTask } from '../redux/reducer/taskSlice';
import { TaskType } from '../types/task.type';
import { PayloadAction } from '@reduxjs/toolkit';

export const TASK_SAGA_GET = function* () {
  try {
    let tasks: TaskType = yield call(TASK_GET_SERVICE);
    yield put(getAllTask(tasks));
  } catch (error) {
    console.log(error);
  }
};

export const TASK_SAGA_POST = function* (action: any) {
  try {
    yield call(TASK_POST_SERVICE, action.payload);
    yield TASK_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const TASK_SAGA_PATCH = function* (action: any) {
  try {
    yield call(TASK_PATCH_SERVICE, action.payload);
    yield TASK_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const TASK_SAGA_DELETE = function* (action: any) {
  {
    try {
      yield call(TASK_DELETE_SERVICE, action.payload);
      yield TASK_SAGA_GET();
    } catch (error) {
      console.log(error);
    }
  }
};
