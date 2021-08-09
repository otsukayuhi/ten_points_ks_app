import { getUsers } from 'frontend/gateway/getUsers';
import React from 'react';
import { useQuery } from 'react-query';
import { User } from 'types/user';

import styles from './index.module.css';

export const App: React.FC = () => {
  const {
    data = [],
    isError,
    error,
    isLoading,
  } = useQuery<User[], Error>('users', getUsers);

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>取得に失敗しました。Error: {error?.message}</div>;

  return (
    <ul className={styles.App}>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
