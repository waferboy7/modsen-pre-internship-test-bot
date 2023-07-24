import dotenv from 'dotenv';

import IDotEnv from '../../env.js';

dotenv.config();

export const {
  TELEGRAM_TOKEN, CAT_URL, DOG_URL, WEATHER_KEY, WEATHER_URL, DB_KEY,
}: IDotEnv = process.env as unknown as IDotEnv;
