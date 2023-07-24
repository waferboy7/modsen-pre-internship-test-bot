// import startConnection from "./startConnection.js";

import startConnection from './startConnection.js';

export default async function newUser(userId: string) {
  // const connection = startConnection()!;

  const client = await startConnection()!;

  const user: object[] = await client
    .query(`SELECT user_id FROM subscribers WHERE user_id = $1`, [userId])
    .then((responce) => responce.rows);

  if (user.length === 0) {
    await client.query(`INSERT INTO subscribers VALUES(default, $1, false, '00:00')`, [userId]);

    console.log(`Зарегистрирован новый пользователь ${userId}`);
  }

  client.release();
}
