import { getUser } from 'backend/repository/getUser';

/** ユーザーが存在しているか？ */
export const isExistUser = async (userId: number): Promise<boolean> => {
  const users = await getUser(userId);
  return users.length !== 0;
};
