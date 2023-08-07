import { ListTask } from '../types/listTask.type';
import { intances } from './axios';

export const LISTTASK_GET_SERVICE = async (): Promise<ListTask> => {
  let response = await intances.get('listTask');
  return response.data;
};

export const LISTTASK_POST_SERVICE = async (data: any) => {
  await intances.post('listTask', data);
};

export const LISTTASK_PATCH_SERVICE = async (data: any) => {
  await intances.patch('listTask/' + data.id, data);
};

export const LISTTASK_DELETE_SERVICE = async (id: any) => {
  await intances.delete(`/listTask/${id}`);
};
