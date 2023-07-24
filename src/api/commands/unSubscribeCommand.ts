import { WEATHER_KEY, WEATHER_URL } from '../../config/index.js';
import { isSubcribed, unSubscribeWeatherBD } from '../../models/data-access/subcribeWeather.js';

const unSubscribeCommand = async (ctx: { message: any; reply?: any }) => {
  const { message } = ctx;

  try {
    if (await !isSubcribed(message.from.id)) {
      ctx.reply('Вы не подписаны на уведомления');
    } else {
      await unSubscribeWeatherBD(message.from.id);

      ctx.reply(`Вы отписались от подписки погоды по городу`);
    }
  } catch (err: Error | any | unknown) {
    console.log('subcribeCommand: ', err.message);
    throw err;
  }
};

export default unSubscribeCommand;
