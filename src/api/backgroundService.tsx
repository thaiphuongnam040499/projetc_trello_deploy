import { BgColor } from '../types/bColor.type';
import { intances } from './axios';

export const BG_GET_SERVICE = async () => {
  let response = await intances.get('backgrounds');
  return response.data;
};

export const BC_GET_SERVICE = async () => {
  let response = await intances.get('tags');
  return response.data;
};

export const BC_PATCH_SERVICE = async (data: BgColor) => {
  await intances.patch('tags/' + data.id, data);
};
