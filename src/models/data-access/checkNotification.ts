import { PoolClient } from 'pg';

import UserNotification from '../../config/interfaces/UserNotification.js';
import startConnection from './startConnection.js';

export default async function checkNotification() {
  const client: PoolClient = await startConnection();

  const time = new Date().toLocaleTimeString('ru', { timeZone: 'Europe/Moscow', minute: '2-digit', hour: '2-digit' });

  const query = `SELECT user_id, city FROM subscribers WHERE subscribed = $1 AND notification_time = $2`;
  const values = [true, time];

  try {
    const usersNotification: UserNotification[] = await client.query(query, values).then((response) => response.rows);

    return usersNotification;
  } finally {
    client.release();
  }
}
