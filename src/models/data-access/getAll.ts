import { PoolClient } from 'pg';

import startConnection from './startConnection.js';

export default async function getAll() {
  const client: PoolClient = await startConnection();

  await client.query(`SELECT * FROM subscribers`).then((responce) => {
    console.log(responce.rows);

    client.release();
    return responce.rows;
  });
}