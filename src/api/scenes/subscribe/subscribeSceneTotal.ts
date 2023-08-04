import { BaseScene } from 'telegraf/scenes';

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
    console.log((error as Error).message);
    await ctx.reply('Что-то пошло не так...');
  }

  await ctx.scene.leave();
});

export default subscribeSceneTotal;