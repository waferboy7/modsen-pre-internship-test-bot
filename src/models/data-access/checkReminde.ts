import { PoolClient } from 'pg';

import IReminde from '../../config/interfaces/IReminde.js';
import startConnection from './startConnection.js';

export default async function checkReminde(time: Date) {
  const client: PoolClient = await startConnection();

  const timestamp = time.toISOString();

  try {
    const usersReminde: IReminde[] = await client
      .query(`SELECT id, user_id, name FROM reminder WHERE time <= $1`, [timestamp])
      .then((response) => response.rows);

    return usersReminde;
  } finally {
    client.release();
  }
}
