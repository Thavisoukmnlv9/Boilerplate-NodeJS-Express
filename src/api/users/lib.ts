import bcrypt from 'bcrypt';
import { UserRecord } from './types';

export const buildUserRecord = async (data: UserRecord) => {
  const { fullName, tel, email, password } = data;
  const userRecord: UserRecord = { fullName, tel, email };
  if (password && password.trim() !== '') {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    userRecord.password = hashedPassword;
  }
  return userRecord;
};