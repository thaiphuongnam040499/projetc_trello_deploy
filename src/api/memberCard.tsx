import { MemberId } from '../types/member.type';
import { MemberCardType } from '../types/memberCard.type';
import { intances } from './axios';

export const MEMBERCARD_GET_SERVICE = async () => {
  let response = await intances.get('memberCard');
  return response.data;
};

export const MEMBERCARD_POST_SERVICE = async (member: MemberCardType) => {
  await intances.post('memberCard', member);
};

export const MEMBERCARD_DELETE_SERVICE = async (id: string) => {
  await intances.delete('memberCard/' + id);
};
