import { User } from 'types/user';

/** ユーザー一覧を取得 */
export const getUsers = async (): Promise<User[]> => {
  const res = await fetch('/api/users');
  return res.json();
};
