import { PoolClient } from 'pg';

import startConnection from './startConnection.js';

export async function isSubcribed(userId: string) {
  const client: PoolClient = await startConnection()!;

  try {
    const subscribed: object[] = await client
      .query(`SELECT subscribed FROM subscribers WHERE user_id = $1`, [userId])
      .then((response) => response.rows[0]?.subscribed);

    return subscribed;
  } finally {
    client.release();
  }
}

export async function subscribeWeatherBD(userId: string, city: string) {
  const client = await startConnection()!;

  console.log(userId);

  try {
    await client.query(`UPDATE subscribers SET subscribed = $1, city = $2 WHERE user_id = $3`, [true, city, userId]);
  } finally {
    client.release();
  }
}

export async function unSubscribeWeatherBD(userId: string) {
  const client = await startConnection()!;

  console.log(userId);

  try {
    await client.query(`UPDATE subscribers SET subscribed = $1, city = $2 WHERE user_id = $3`, [false, null, userId]);
  } finally {
    client.release();
  }
}
