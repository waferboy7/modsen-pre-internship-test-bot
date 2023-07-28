import cron from 'node-cron';
import { session } from 'telegraf';
import { Stage } from 'telegraf/scenes';

import catCommand from './api/commands/catCommand.js';
import commandNotFound from './api/commands/commandNotFound.js';
import dogCommand from './api/commands/dogCommand.js';
import errorHandler from './api/commands/errorHandler.js';
import helpCommand from './api/commands/helpCommand.js';
import reminderCommand from './api/commands/remindeCommand.js';
import startCommand from './api/commands/startCommand.js';
import subscribeCommand from './api/commands/subscribeСommand.js';
import unSubscribeCommand from './api/commands/unSubscribeCommand.js';
import weatherCommand from './api/commands/weatherCommand.js';
import bot from './api/index.js';
import cityScene from './api/scenes/cityScene.js';
import recCoordsScene from './api/scenes/reccomend/recCoordsScene.js';
import recKindScene from './api/scenes/reccomend/recKindScene.js';
import recRadiusScene from './api/scenes/reccomend/recRadiusScene.js';
import recTotalScene from './api/scenes/reccomend/recTotalScene.js';
import weatherScene from './api/scenes/weather/weatherScene.js';
import IContext from './config/interfaces/IContext.js';
import sendNotification from './subscribers/sendNotification.js';
import sendReminde from './subscribers/sendReminde.js';

console.log('start');

const stage = new Stage<IContext>([cityScene, recCoordsScene, recKindScene, recRadiusScene, recTotalScene, weatherScene]);

bot.use(session<IContext>());
bot.use(stage.middleware());
bot.use((ctx: IContext, next) => {
  ctx.myContextProp ??= '';
  ctx.scene.session.mySceneSessionProp ??= 0;
  ctx.session.lon ??= '';
  ctx.session.lat ??= '';
  ctx.session.kind ??= '';
  ctx.session.radius ??= 0;

  return next();
});

bot.start(startCommand);

bot.help(helpCommand);

bot.catch(errorHandler);

bot.command('cat', catCommand);

// bot.command('weather', weatherCommand);
bot.command('weather', async (ctx) => {
  await ctx.scene.enter('weather');
});

bot.command('dog', dogCommand);

bot.command('subscribe', subscribeCommand);

bot.command('unsubscribe', unSubscribeCommand);

bot.command('reminde', reminderCommand);

bot.command('reccomend', async (ctx) => {
  await ctx.scene.enter('recommend');
});

bot.command('hello', async (ctx) => {
  await ctx.scene.enter('city', { reply_markup: { remove_keyboard: true } });
});

bot.on('message', commandNotFound);

cron.schedule('0 * * * *', () => {
  sendNotification();
});

cron.schedule('* * * * *', () => {
  sendReminde();
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
