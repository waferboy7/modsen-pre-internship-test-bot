import { BaseScene } from 'telegraf/scenes';

import { ERROR_MESSAGE } from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';
import { subscribeWeatherBD } from '../../../models/data-access/subcribeWeather.js';

const subscribeSceneTotal = new BaseScene<IContext>('subscribeSceneTotal');

subscribeSceneTotal.enter(async (ctx) => {
  try {
    const id = String(ctx.from?.id);

    const { subscribeCity, subscribeTime } = ctx.session;

    await subscribeWeatherBD(id, subscribeCity, subscribeTime);

    const messageCity = `Вы подписались на рассылку погоды по городу ${subscribeCity}`;
    const messageTime = `Погода будет приходить каждый день в ${subscribeTime}`;

    await ctx.reply(`${messageCity}\n${messageTime}`);
  } catch (error) {
    console.error((error as Error).message);
    await ctx.reply(ERROR_MESSAGE);
  }

  await ctx.scene.leave();
});

export default subscribeSceneTotal;