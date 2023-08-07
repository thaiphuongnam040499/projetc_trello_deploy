export interface User {
  email: string;
  password: string;
  googleId: string;
  imageUrl: string;
  name: string;
  emagivenNamel: string;
  familyName: string;
}
export interface UserId extends User {
  id: string;
}
