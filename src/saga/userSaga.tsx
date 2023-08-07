import { call, put } from 'redux-saga/effects';
import {
  USER_GETALL_SERVICE,
  USER_GET_BY_EMAIL,
  USER_GET_SERVICE,
  USER_POST_SERVICE,
  create_user,
} from '../api/userService';
import {
  getAllUser,
  getUserByEmail,
  getUserLogin,
  login,
} from '../redux/reducer/userSlice';
import { User } from '../types/user.type';

export const USER_SAGA_POST = function* (action: any): any {
  try {
    yield call(USER_POST_SERVICE, action.payload.user);
  } catch (error) {
    console.log(error);
  } finally {
    if (action.payload.type === 'via3th') {
      let fakeAction = {
        payload: {
          email: action.payload.user.email,
          password: action.payload.user.password,
        },
      };
      yield USER_SAGA_LOGIN(fakeAction);
    }
  }
};

export const USER_SAGA_REGISTER = function* (action: any) {
  try {
    yield call(create_user, action.payload.user);
  } catch (error) {
    console.log(error);
  }
};

export const USER_SAGA_LOGIN = function* (action: any): any {
  try {
    let userLogin = yield call(USER_GET_SERVICE, action.payload);
    yield put(getUserLogin(userLogin));
  } catch (error) {
    console.log(error);
  }
};

export const USER_SAGA_GET_BY_EMAIL = function* (action: any) {
  try {
    let userSearch: User = yield call(USER_GET_BY_EMAIL, action.payload);
    yield put(getUserByEmail(userSearch));
  } catch (error) {
    console.log(error);
  }
};

export const USER_SAGA_GET = function* () {
  try {
    let users: User[] = yield call(USER_GETALL_SERVICE);
    yield put(getAllUser(users));
  } catch (error) {
    console.log(error);
  }
};
