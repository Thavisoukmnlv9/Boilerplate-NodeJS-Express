export interface TokenPayload {
  tel: string;
  id: number;
  role: string;
  fullName: string;
}

export enum Roles {
  admin = 'admin',
  staff = 'staff',
}
