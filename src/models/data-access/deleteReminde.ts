import { PoolClient } from 'pg';

import startConnection from './startConnection.js';

async function deleteReminde(id: number) {
  const client: PoolClient = await startConnection();

  try {
    const query = 'DELETE FROM reminder WHERE id = $1';
    const values = [id];

    await client.query(query, values);
  } catch (error) {
    console.log('Ошибка при удалении напоминания', (error as Error).message);
  } finally {
    client.release();
  }
}

export default deleteReminde;
