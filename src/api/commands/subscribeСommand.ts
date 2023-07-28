import axios from 'axios';

import getFullUrlWeather from '../../config/constaint/getFullUrlWeather.js';
import IContextMessage from '../../config/interfaces/IContextMessage.js';
import WeatherResponse from '../../config/interfaces/WeatgerResponce.js';
import { isSubcribed, subscribeWeatherBD } from '../../models/data-access/subcribeWeather.js';

const subscribeCommand = async (ctx: IContextMessage) => {
  const { message } = ctx;

  const commandParams = message.text.split(' ');

  if (commandParams && commandParams.length === 2) {
    try {
      if (await isSubcribed(message.from.id)) {
        ctx.reply('Вы уже подписаны на уведомления');
      } else {
        const city = commandParams[1];

        await axios.get(getFullUrlWeather(city)).then(({ data }: { data: WeatherResponse }) => data.name);

        await subscribeWeatherBD(message.from.id, city);

        ctx.reply(`Вы подписались на подписку погоды по городу ${city}`);
      }
    } catch (error) {
      console.log("subcribeCommand: ", (error as Error).message);
      throw error;
    }
  } else {
    ctx.reply('Пожалуйста, укажите параметр после команды.');
  }
};

export default subscribeCommand;
