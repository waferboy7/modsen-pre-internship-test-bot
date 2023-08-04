import dotenv from 'dotenv';

import IDotEnv from '../../env.js';

dotenv.config();

export const {
  TELEGRAM_TOKEN, CAT_URL, DOG_URL, WEATHER_KEY, WEATHER_URL, DB_KEY, REC_KEY, REC_URL,
}: IDotEnv = process.env as unknown as IDotEnv;

export const LIMIT_REC = 5;