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

export interface UserRecord {
  fullName: string;
  tel: string;
  email: string;
  password?: string;
}
