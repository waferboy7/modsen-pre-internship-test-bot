import cron from 'node-cron';
import { session } from 'telegraf';
import { Stage } from 'telegraf/scenes';
// @ts-ignore
import rateLimit from 'telegraf-ratelimit';

import bot, {
  catCommand,
  commandNotFound,
  dogCommand,
  errorHandler,
  helpCommand,
  infoCommand,
  startCommand,
  unSubscribeCommand,
} from './api/index.js';
import limitConfig from './config/constaint/rateLimitConfig.js';
import SCENES from './config/constaint/scenes.js';
import { CAT, DOG, INFO, RECOMMEND, REMINDE, SIGINT, SIGTERM, SUBSCRIBE, UNSUBSCRIBE, WEATHER } from './config/index.js';
import IContext, { ISession } from './config/interfaces/IContext.js';
import sendNotification from './subscribers/sendNotification.js';
import sendReminde from './subscribers/sendReminde.js';

console.log('start');

const stage = new Stage<IContext>(SCENES);

bot.use(rateLimit(limitConfig));
bot.use(session<ISession>());
bot.use(stage.middleware());

bot.start(startCommand);

bot.help(helpCommand);

bot.catch(errorHandler);

bot.command(CAT, catCommand);

bot.command(WEATHER, async (ctx) => {
  await ctx.scene.enter(WEATHER);
});

bot.command(DOG, dogCommand);

bot.command(SUBSCRIBE, async (ctx) => {
  await ctx.scene.enter(SUBSCRIBE);
});

bot.command(UNSUBSCRIBE, unSubscribeCommand);

bot.command(REMINDE, async (ctx) => {
  await ctx.scene.enter(REMINDE);
});

bot.command(RECOMMEND, async (ctx) => {
  await ctx.scene.enter(RECOMMEND);
});

bot.command(INFO, infoCommand);

bot.on('message', commandNotFound);

cron.schedule('* * * * *', () => {
  sendNotification();
  sendReminde();
});

bot.launch();

process.once(SIGINT, () => bot.stop(SIGINT));
process.once(SIGTERM, () => bot.stop(SIGTERM));
