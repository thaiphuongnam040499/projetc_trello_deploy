import { intances } from './axios';
export const CARD_POST_SERVICE = async (data: any) => {
  await intances.post('cards', data);
};

export const CARD_GET_SERVICE = async () => {
  let response = await intances.get('cards');
  return response.data;
};

export const CARD_PUT_SERVICE = async (data: any) => {
  await intances.put('cards/' + data.id, data);
};

export const CARD_PATCH_SERVICE = async (data: any) => {
  await intances.patch('cards/' + data.id, data);
};

export const CARD_DELETE_SERVICE = async (cardId: any) => {
  await intances.delete(`/cards/${cardId}`);
};

export const CARD_SEARCH_SERVICE = async (cardSearch: any) => {
  let response = await intances.get('/cards?title_like=' + cardSearch);
  return response.data;
};
