import { intances } from './axios';

export const MEMBER_GET_SERVICE = async () => {
  let response = await intances.get('members');
  return response.data;
};

export const MEMBER_POST_SERVICE = async (data: any) => {
  let response = await intances.post('members', data);
  return response.data;
};

export const MEMBER_PATCH_SERVICE = async (data: any) => {
  await intances.patch('members/' + data.id, data);
};

export const MEMBER_DELETE_SERVICE = async (id: any) => {
  await intances.delete(`/members/${id}`);
};
