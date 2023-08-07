import { intances } from './axios';

export const CARDTAGS_GET_SERVICE = async () => {
  let response = await intances.get('cardTags');
  return response.data;
};

export const CARDTAGS_POST_SERVICE = async (data: any) => {
  await intances.post('cardTags', data);
};

export const CARDTAGS_PATCH_SERVICE = async (data: any) => {
  await intances.patch('cardTags/' + data.id, data);
};

export const CARDTAGS_DELETE_SERVICE = async (id: string) => {
  await intances.delete('cardTags/' + id);
};
