import { TaskType } from '../types/task.type';
import { intances } from './axios';

export const TASK_GET_SERVICE = async (): Promise<TaskType> => {
  let response = await intances.get('tasks');
  return response.data;
};

export const TASK_POST_SERVICE = async (data: any) => {
  await intances.post('tasks', data);
};

export const TASK_PATCH_SERVICE = async (data: any) => {
  await intances.patch('tasks/' + data.id, data);
};

export const TASK_DELETE_SERVICE = async (taskId: any) => {
  await intances.delete(`/tasks/${taskId}`);
};
