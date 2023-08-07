export interface MemberWsType {
  name: string;
  email: string;
  imageUrl: string;
  role: string;
  workingSpaceId: string;
}

export interface MemberWs extends MemberWsType {
  id: string;
}
