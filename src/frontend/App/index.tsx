import { useGetUsers } from 'frontend/hooks/useGetUsers';
import React from 'react';

import styles from './index.module.css';

export const App: React.FC = () => {
  const { data, isError, error, isLoading } = useGetUsers();

  if (isLoading) return <div>loading...</div>;

  if (isError)
    return (
      <div>
        取得に失敗しました。{error && <div>Error: {error.message}</div>}
      </div>
    );

  return (
    <ul className={styles.App}>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
