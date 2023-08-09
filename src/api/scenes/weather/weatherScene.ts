import axios from 'axios';
import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import getFullUrlWeather from '../../../config/constaint/getFullUrlWeather.js';
import { ENTER_CITY, ENTER_SOMETHING_TO_OR_LEAVE, LEAVE_COMMAND, WEATHER } from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';
import WeatherResponse from '../../../config/interfaces/WeatgerResponce.js';

const weatherScene = new BaseScene<IContext>('weather');

weatherScene.enter(async (ctx: IContext) => {
  await ctx.reply('Введите город');
});

weatherScene.command('leave', async (ctx) => {
  await ctx.reply(LEAVE_COMMAND(WEATHER));
  await ctx.scene.leave();
});

weatherScene.on(message('text'), async (ctx) => {
  const city = ctx.message.text;
  try {
    const weather: WeatherResponse = await axios.get(getFullUrlWeather(city)).then((responce) => responce.data);

    const weatherName = `Погода в городе ${weather.name}:\n${weather.weather[0].description}`;
    const temp = `Температура: ${Math.floor(weather.main.temp)} °C`;
    const feelsLike = `Ощущается как ${Math.floor(weather.main.feels_like)} °C`;

    await ctx.reply(`${weatherName}\n\n${temp}\n\n${feelsLike}`);

    await ctx.scene.leave();
  } catch (error) {
    console.error('Произошла ошибка получения погоды');
    await ctx.reply(ENTER_SOMETHING_TO_OR_LEAVE(ENTER_CITY));
  }
});

export default weatherScene;
