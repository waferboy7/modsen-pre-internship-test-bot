import IContextMessage from '../../config/interfaces/IContextMessage.js';
import { isSubcribed, unSubscribeWeatherBD } from '../../models/data-access/subcribeWeather.js';

const unSubscribeCommand = async (ctx: IContextMessage) => {
  const { message } = ctx;

  try {
    const statusSubscribe = await isSubcribed(message.from.id);

    if (!statusSubscribe) {
      ctx.reply('Вы не подписаны на уведомления');
    } else {
      await unSubscribeWeatherBD(message.from.id);

      ctx.reply(`Вы отписались от подписки погоды по городу`);
    }
  } catch (error) {
    console.log('subcribeCommand: ', (error as Error).message);
    throw error;
  }
};

export default unSubscribeCommand;
