import axios from 'axios';
import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import getFullUrlWeather from '../../../config/constaint/getFullUrlWeather.js';
import IContext from '../../../config/interfaces/IContext.js';
import WeatherResponse from '../../../config/interfaces/WeatgerResponce.js';

const weatherScene = new BaseScene<IContext>('weather');

weatherScene.enter((ctx) => {
  ctx.reply('Введите город');
});

weatherScene.command('leave', async (ctx) => {
  await ctx.scene.leave();
});

weatherScene.on(message('text'), async (ctx) => {
  const city = ctx.message.text;
  try {
    const weather: WeatherResponse = await axios.get(getFullUrlWeather(city)).then((responce) => responce.data);

    const weatherName = `Погода в городе ${weather.name}:\n${weather.weather[0].description}`;
    const temp = `Температура: ${Math.floor(weather.main.temp)} °C`;
    const feelsLike = `Ощущается как ${Math.floor(weather.main.feels_like)} °C`;

    ctx.reply(`${weatherName}\n\n${temp}\n\n${feelsLike}`);

    ctx.scene.leave();
  } catch (error) {
    console.log('Произошла ошибка получения погоды');
    ctx.reply('Пожалуйста, введите город еще раз');
  }
});

export default weatherScene;
