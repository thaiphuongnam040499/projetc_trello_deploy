import { Role } from '../enums/Role';

export interface MemberCardType {
  name: string;
  email: string;
  imageUrl: string;
  role: Role;
  cardId: string;
  id: string;
  memberId: string;
}
