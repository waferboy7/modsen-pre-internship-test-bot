import { Telegraf } from 'telegraf';

import { TELEGRAM_TOKEN } from '../config/index.js';

const bot: Telegraf = new Telegraf(TELEGRAM_TOKEN);

export default bot;
