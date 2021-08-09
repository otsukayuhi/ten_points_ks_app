import dotenv from 'dotenv';
import { ConnectionConfig, PoolSpecificConfig } from 'mysql';

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

type DbConfig = PoolSpecificConfig | ConnectionConfig;

export const db_config: DbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
};
