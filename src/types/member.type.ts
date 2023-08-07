import { Role } from '../enums/Role';

export interface MemberType {
  name: string;
  email: string;
  imageUrl: string;
  workingSpaceId?: string;
  boardId?: string;
  cardId?: string;
  role: Role;
}
export interface MemberId extends MemberType {
  id: string;
}
