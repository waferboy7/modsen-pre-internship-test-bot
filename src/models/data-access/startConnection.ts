import { PoolClient } from 'pg';

import pool from '../index.js';

export default async function startConnection(): Promise<PoolClient> {
  try {
    const client: PoolClient = await pool.connect();

    return client;
  } catch (error) {
    console.error('Ошибка бд', error);
  }

  return pool.connect();
}
