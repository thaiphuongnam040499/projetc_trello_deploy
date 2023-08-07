import { DateTime } from '../types/dateTime.type';
import { intances } from './axios';

export const DATETIME_GET_SERVICE = async (): Promise<DateTime> => {
  let response = await intances.get('datetime');
  return response.data;
};

export const DATETIME_POST_SERVICE = async (data: any) => {
  let response = await intances.post('datetime', data);
  return response.data;
};

export const DATETIME_PATCH_SERVICE = async (data: any) => {
  await intances.patch('datetime/' + data.id, data);
};

export const DATETIME_DELETE_SERVICE = async (id: any) => {
  await intances.delete('datetime/' + id);
};
