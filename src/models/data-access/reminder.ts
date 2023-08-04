import { PoolClient } from 'pg';

import startConnection from './startConnection.js';

async function insertReminder(user_id: string | number | undefined, name: string, time: string): Promise<void> {
  const client: PoolClient = await startConnection();

  try {
    // const timestamp = time.toISOString();
    const query = 'INSERT INTO reminder (user_id, name, time) VALUES ($1, $2, $3)';
    // const values = [user_id, name, timestamp];
    const values = [user_id, name, time];

    await client.query(query, values);
  } catch (error) {
    console.error('Ошибка при добавлении записи:', (error as Error).message);
    throw error;
  } finally {
    client.release();
  }
}

export default insertReminder;
