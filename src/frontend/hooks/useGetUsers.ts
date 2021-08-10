import { getUsers } from 'frontend/api/getUsers';
import { useQuery } from 'react-query';
import { User } from 'types/user';

export interface UseGetUsers {
  data: User[];
  isError: boolean;
  error: Error | null;
  isLoading: boolean;
}

export const useGetUsers = (): UseGetUsers => {
  const { data, isError, error, isLoading } = useQuery<User[], Error>(
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
