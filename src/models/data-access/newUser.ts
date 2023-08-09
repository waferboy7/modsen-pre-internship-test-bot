import startConnection from './startConnection.js';

export default async function newUser(userId: string) {
  const client = await startConnection();

  const checkUserQuery = `SELECT user_id FROM subscribers WHERE user_id = $1`;
  const checkUserValues = [userId];

  const user: object[] = await client.query(checkUserQuery, checkUserValues).then((responce) => responce.rows);

  if (user.length === 0) {
    const newUserQuery = `INSERT INTO subscribers VALUES(default, $1, false, '00:00')`;
    const newUserValues = [userId];

    await client.query(newUserQuery, newUserValues);
  }

  client.release();
}
