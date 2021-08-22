import { getUsers } from 'frontend/api/getUsers';
import { useQuery } from 'react-query';
import { UserModel } from 'types/user';

export interface UseGetUsers {
  data: UserModel[];
  isError: boolean;
  error: Error | null;
  isLoading: boolean;
}

export const useGetUsers = (): UseGetUsers => {
  const { data, isError, error, isLoading } = useQuery<UserModel[], Error>(
    'users',
    getUsers
  );

  return {
    data: data || [],
    isError,
    error,
    isLoading,
  };
};
