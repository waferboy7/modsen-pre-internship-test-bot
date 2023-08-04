import { PoolClient } from 'pg';

import startConnection from './startConnection.js';

export async function isSubcribed(userId: string) {
  const client: PoolClient = await startConnection();

  try {
    const subscribed: object[] = await client
      .query(`SELECT subscribed, user_id, subscribed FROM subscribers WHERE user_id = $1`, [userId])
      .then((response) => response.rows[0]?.subscribed);

    return subscribed;
  } finally {
    client.release();
  }
}

export async function subscribeWeatherBD(userId: string, city: string, time: string) {
  const client: PoolClient = await startConnection();

  try {
    await client.query(`UPDATE subscribers SET subscribed = $1, city = $2, notification_time = $3 WHERE user_id = $4`, [
      true,
      city,
      time,
      userId,
    ]);
  } finally {
    client.release();
  }
}

export async function unSubscribeWeatherBD(userId: string) {
  const client: PoolClient = await startConnection();

  try {
    await client.query(`UPDATE subscribers SET subscribed = $1, city = $2, notification_time = $3 WHERE user_id = $4`, [
      false,
      null,
      null,
      userId,
    ]);
  } finally {
    client.release();
  }
}
