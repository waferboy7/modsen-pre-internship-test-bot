import { Telegraf } from 'telegraf';

import { TELEGRAM_TOKEN } from '../config/index.js';
import IContext from '../config/interfaces/IContext.js';

const bot: Telegraf<IContext> = new Telegraf<IContext>(TELEGRAM_TOKEN);

export default bot;
