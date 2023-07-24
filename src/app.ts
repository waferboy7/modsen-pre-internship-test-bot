import cron from 'node-cron';
import { Scenes, session } from 'telegraf';
import { message } from 'telegraf/filters';
import { Stage } from 'telegraf/scenes';

import catCommand from './api/commands/catCommand.js';
import commandNotFound from './api/commands/commandNotFound.js';
import dogCommand from './api/commands/dogCommand.js';
import errorHandler from './api/commands/errorHandler.js';
import helpCommand from './api/commands/helpCommand.js';
import startCommand from './api/commands/startCommand.js';
import subscribeCommand from './api/commands/subscribeСommand.js';
import unSubscribeCommand from './api/commands/unSubscribeCommand.js';
import weatherCommand from './api/commands/weatherCommand.js';
import bot from './api/index.js';
import cityScene from './api/scenes/cityScene.js';
import IContext from './config/interfaces/IContext.js';
import sendNotification from './subscribers/sendNotification.js';

console.log('start');

const stage = new Stage<IContext>([cityScene]);
const { enter, leave } = Scenes.Stage;

bot.start(startCommand);

bot.help(helpCommand);

bot.catch(errorHandler);

bot.command('cat', catCommand);

bot.command('weather', weatherCommand);

bot.command('dog', dogCommand);

bot.command('subscribe', subscribeCommand);

bot.command('unsubscribe', unSubscribeCommand);

bot.use(session());
bot.use(stage.middleware());
bot.use((ctx: IContext, next) => {
  ctx.myContextProp ??= '';
  ctx.scene.session.mySceneSessionProp ??= 0;

  return next();
});

bot.command('hello', (ctx) => ctx.scene.enter('city'));

bot.on(message('text'), commandNotFound);

cron.schedule('0 * * * *', () => {
  sendNotification();
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
