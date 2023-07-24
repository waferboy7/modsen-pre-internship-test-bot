import { PoolClient } from 'pg';

import UserNotification from '../../config/interfaces/UserNotification.js';
import startConnection from './startConnection.js';

export default async function checkNotification() {
  const client: PoolClient = await startConnection()!;

  try {
    const usersNotification: UserNotification[] = await client
      .query(`SELECT user_id, city FROM subscribers WHERE subscribed = $1`, [true])
      .then((response) => response.rows);

    return usersNotification;
  } finally {
    client.release();
  }
}
