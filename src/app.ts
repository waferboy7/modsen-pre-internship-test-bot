import cron from 'node-cron';
import { session } from 'telegraf';
import { Stage } from 'telegraf/scenes';
// @ts-ignore
import rateLimit from 'telegraf-ratelimit';

import catCommand from './api/commands/catCommand.js';
import commandNotFound from './api/commands/commandNotFound.js';
import dogCommand from './api/commands/dogCommand.js';
import errorHandler from './api/commands/errorHandler.js';
import helpCommand from './api/commands/helpCommand.js';
import infoCommand from './api/commands/infoCommand.js';
import startCommand from './api/commands/startCommand.js';
import unSubscribeCommand from './api/commands/unSubscribeCommand.js';
import bot from './api/index.js';
import limitConfig from './config/constaint/rateLimitConfig.js';
import SCENES from './config/constaint/scenes.js';
import IContext from './config/interfaces/IContext.js';
import sendNotification from './subscribers/sendNotification.js';
import sendReminde from './subscribers/sendReminde.js';

console.log('start');

const stage = new Stage<IContext>(SCENES);

bot.use(rateLimit(limitConfig));
bot.use(session<IContext>());
bot.use(stage.middleware());
bot.use((ctx: IContext, next) => {
  ctx.myContextProp ??= '';
  ctx.scene.session.mySceneSessionProp ??= 0;
  ctx.session.lon ??= '';
  ctx.session.lat ??= '';
  ctx.session.kind ??= '';
  ctx.session.radius ??= 0;
  ctx.session.name ??= '';
  ctx.session.date ??= '';
  ctx.session.time ??= '';
  ctx.session.subscribeCity ??= '';
  ctx.session.subscribeTime ??= '';

  return next();
});

bot.start(startCommand);

bot.help(helpCommand);

bot.catch(errorHandler);

bot.command('cat', catCommand);

bot.command('weather', async (ctx) => {
  await ctx.scene.enter('weather');
});

bot.command('dog', dogCommand);

bot.command('subscribe', async (ctx) => {
  await ctx.scene.enter('subscribe');
});

bot.command('unsubscribe', unSubscribeCommand);

bot.command('reminde', async (ctx) => {
  await ctx.scene.enter('reminde');
});

bot.command('recommend', async (ctx) => {
  await ctx.scene.enter('recommend');
});

bot.command('info', infoCommand);

bot.on('message', commandNotFound);

cron.schedule('* * * * *', () => {
  sendNotification();
  sendReminde();
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
