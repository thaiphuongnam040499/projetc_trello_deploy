import { call, put } from 'redux-saga/effects';
import { CardTagType } from '../types/cardTag.type';
import {
  CARDTAGS_DELETE_SERVICE,
  CARDTAGS_GET_SERVICE,
  CARDTAGS_PATCH_SERVICE,
  CARDTAGS_POST_SERVICE,
} from '../api/cardTagService';
import { getAllCardTag } from '../redux/reducer/cardTagSlice';

export const CARDTAGS_SAGA_GET = function* () {
  try {
    let cardTags: CardTagType[] = yield call(CARDTAGS_GET_SERVICE);
    yield put(getAllCardTag(cardTags));
  } catch (error) {
    console.log(error);
  }
};

export const CARDTAGS_SAGA_POST = function* (action: any) {
  try {
    yield call(CARDTAGS_POST_SERVICE, action.payload);
    yield CARDTAGS_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const CARDTAGS_SAGA_DELETE = function* (action: any) {
  try {
    yield call(CARDTAGS_DELETE_SERVICE, action.payload);
    yield CARDTAGS_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};

export const CARDTAGS_SAGA_PATCH = function* (action: any) {
  try {
    yield call(CARDTAGS_PATCH_SERVICE, action.payload);
    yield CARDTAGS_SAGA_GET();
  } catch (error) {
    console.log(error);
  }
};
