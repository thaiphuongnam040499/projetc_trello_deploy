import { intances } from './axios';

export const USER_POST_SERVICE = async (user: any) => {
  await intances.post('/register', user);
};

export const create_user = async (user: any) => {
  await intances.post('/register', user);
};

export const USER_GET_SERVICE = async (data: any) => {
  let response = await intances.post('/signin', data);
  return response.data;
};

export const USER_GET_BY_EMAIL = async (data: any) => {
  let response = await intances.get('/users?email_like=' + data);
  return response.data;
};

export const USER_GETALL_SERVICE = async () => {
  let response = await intances.get('users');
  return response.data;
};
