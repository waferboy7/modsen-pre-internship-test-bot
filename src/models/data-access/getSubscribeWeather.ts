import { PoolClient } from 'pg';

import startConnection from './startConnection.js';

export default async function getSubscribeWeather(userId: number) {
  const client: PoolClient = await startConnection();

  try {
    const query = `SELECT city FROM subscribers WHERE user_id = $1 AND subscribed = $2`;
    const values = [userId, true];

    const city = await client.query(query, values).then((responce) => responce.rows[0].city);

    return city;
  } catch (error) {
    console.log((error as Error).message);

    return "";
  } finally {
    client.release();
  }
}
