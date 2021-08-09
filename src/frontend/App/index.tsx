import { getUsers } from 'frontend/gateway/getUsers';
import React, { useEffect, useState } from 'react';
import { User } from 'types/user';

import styles from './index.module.css';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>取得に失敗しました</div>;

  return (
    <ul className={styles.App}>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
