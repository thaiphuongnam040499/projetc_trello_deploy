import { WorkingSpaceType } from '../types/workingSpace.type';
import { intances } from './axios';

export const WORKINGSPACE_GET_SERVICE = async () => {
  let response = await intances.get('workingSpace');
  return response.data;
};

export const WORKINGSPACE_POST_SERVICE = async (data: WorkingSpaceType) => {
  let response = await intances.post('workingSpace', data);
  return response.data;
};

export const FIND_WS_BY_USERID_SERVICE = async (id: string) => {
  let response = await intances.get(`/workingSpace?userId=${id}`);
  return response.data;
};

export const WORKINGSPACE_DELETE_SERVICE = async (id: string) => {
  await intances.delete('workingSpace/' + id);
};
