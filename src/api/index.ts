import { Telegraf } from 'telegraf';

import { TELEGRAM_TOKEN } from '../config/index.js';
import IContext from '../config/interfaces/IContext.js';
import catCommand from './commands/catCommand.js';
import commandNotFound from './commands/commandNotFound.js';
import dogCommand from './commands/dogCommand.js';
import errorHandler from './commands/errorHandler.js';
import helpCommand from './commands/helpCommand.js';
import infoCommand from './commands/infoCommand.js';
import startCommand from './commands/startCommand.js';
import unSubscribeCommand from './commands/unSubscribeCommand.js';

export {
  catCommand,
  commandNotFound,
  dogCommand,
  errorHandler,
  helpCommand,
  infoCommand,
  startCommand,
  unSubscribeCommand,
};

const bot: Telegraf<IContext> = new Telegraf<IContext>(TELEGRAM_TOKEN);

export default bot;
