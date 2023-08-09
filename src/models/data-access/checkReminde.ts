import { PoolClient } from 'pg';

import IReminde from '../../config/interfaces/IReminde.js';
import startConnection from './startConnection.js';

const toLocalISOString = (date: Date) => {
  const stringDate = date.toLocaleString('ru', { timeZone: 'Europe/Moscow' });

  const dateFormat = /^(\d{2})\.(\d{2})\.(\d{4}), (\d{2}:\d{2}:\d{2})$/;

  const dateInFormat = stringDate.replace(dateFormat, '$3-$2-$1T$4');

  return `${dateInFormat}.000+03:00`;
};

export default async function checkReminde(time: Date) {
  const client: PoolClient = await startConnection();

  const timestamp = toLocalISOString(time);

  const query = `SELECT id, user_id, name FROM reminder WHERE time <= $1`;
  const values = [timestamp];

  try {
    const usersReminde: IReminde[] = await client.query(query, values).then((response) => response.rows);

    return usersReminde;
  } catch (error) {
    console.error((error as Error).message);
    return [];
  } finally {
    client.release();
  }
}
