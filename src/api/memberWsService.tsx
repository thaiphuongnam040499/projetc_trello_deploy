import { intances } from './axios';

export const MEMBERWS_GET_SERVICE = async () => {
  let response = await intances.get('memberWs');
  return response.data;
};

export const MEMBERWS_POST_SERVICE = async (data: any) => {
  await intances.post('memberWs', data);
};

export const MEMBERWS_DELETE_SERVICE = async (id: string) => {
  await intances.delete('memberWs/' + id);
};
