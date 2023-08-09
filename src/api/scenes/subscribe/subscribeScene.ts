import axios from 'axios';
import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import getFullUrlWeather from '../../../config/constaint/getFullUrlWeather.js';
import { ENTER_CITY, ENTER_SOMETHING_TO_OR_LEAVE, LEAVE, LEAVE_COMMAND, SUBSCRIBE } from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';
import WeatherResponse from '../../../config/interfaces/WeatgerResponce.js';
import { isSubcribed } from '../../../models/data-access/subcribeWeather.js';

const subscribeScene = new BaseScene<IContext>(SUBSCRIBE);

subscribeScene.enter(async (ctx: IContext) => {
  const id = String(ctx.message?.from.id);
  if (await isSubcribed(id)) {
    await ctx.reply('Вы уже подписаны на уведомления о погоде');

    await ctx.scene.leave();
  } else {
    await ctx.reply('Введите город для подписки на ежечасовую рассылку погоды');
  }
});

subscribeScene.command(LEAVE, async (ctx) => {
  await ctx.reply(LEAVE_COMMAND(SUBSCRIBE));
  await ctx.scene.leave();
});

subscribeScene.on(message('text'), async (ctx) => {
  try {
    const city = ctx.message.text;

    await axios.get(getFullUrlWeather(city)).then(({ data }: { data: WeatherResponse }) => data.name);

    ctx.session.subscribeCity = city;

    await ctx.scene.leave();
    await ctx.scene.enter('subscribeSceneTime');
  } catch (error) {
    console.error((error as Error).message);
    ctx.reply(ENTER_SOMETHING_TO_OR_LEAVE(ENTER_CITY));
  }
});

export default subscribeScene;
