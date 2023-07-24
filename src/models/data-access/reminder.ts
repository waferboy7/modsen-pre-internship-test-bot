import { PoolClient } from 'pg';

import startConnection from './startConnection.js';

async function insertReminder(user_id: string, name: string, time: Date): Promise<void> {
  const client: PoolClient = await startConnection()!;

  const timestamp = time.toISOString(); // Преобразуем значение Date в строку в формате ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
  const query = 'INSERT INTO reminder (user_id, name, time) VALUES ($1, $2, $3)';
  const values = [user_id, name, timestamp];

  try {
    await client.query(query, values);
    console.log('Запись добавлена успешно.');
  } catch (error) {
    console.error('Ошибка при добавлении записи:', error);
  } finally {
    client.release();
  }
}

insertReminder("1", "Купить слона", new Date());
