import { PoolClient } from 'pg';

import startConnection from './startConnection.js';

export async function isSubcribed(userId: string) {
  const client: PoolClient = await startConnection();

  const query = `SELECT subscribed, user_id, subscribed FROM subscribers WHERE user_id = $1`;
  const values = [userId];

  try {
    const subscribed: object[] = await client.query(query, values).then((response) => response.rows[0]?.subscribed);

    return subscribed;
  } finally {
    client.release();
  }
}

export async function subscribeWeatherBD(userId: string, city: string, time: string) {
  const client: PoolClient = await startConnection();

  const query = `UPDATE subscribers SET subscribed = $1, city = $2, notification_time = $3 WHERE user_id = $4`;
  const values = [true, city, time, userId];

  try {
    await client.query(query, values);
  } finally {
    client.release();
  }
}

export async function unSubscribeWeatherBD(userId: string) {
  const client: PoolClient = await startConnection();

  const query = `UPDATE subscribers SET subscribed = $1, city = $2, notification_time = $3 WHERE user_id = $4`;
  const values = [false, null, null, userId];

  try {
    await client.query(query, values);
  } finally {
    client.release();
  }
}
