import { User, UserId } from './user.type';

export interface WorkingSpaceType {
  id: string;
  name: string;
  type: string;
  description: string;
  userId: string | undefined;
}
