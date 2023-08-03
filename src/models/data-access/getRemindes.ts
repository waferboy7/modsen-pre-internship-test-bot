import { PoolClient } from 'pg';

import IUserRemindes from '../../config/interfaces/IUserremindes.js';
import startConnection from './startConnection.js';

export default async function getRemindes(userId: number) {
  const client: PoolClient = await startConnection();

  try {
    const query = `SELECT name, time FROM reminder WHERE user_id = $1`;
    const values = [userId];

    const remindes: IUserRemindes[] = await client.query(query, values).then((responce) => responce.rows);

    return remindes;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  } finally {
    client.release();
  }
}
