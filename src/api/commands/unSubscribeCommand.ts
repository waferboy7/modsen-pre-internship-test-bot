import { NOT_SUBSCRIBE_WEATHER, UNSUBSCRIBE_WEATHER } from '../../config/index.js';
import IContext from '../../config/interfaces/IContext.js';
import { isSubcribed, unSubscribeWeatherBD } from '../../models/data-access/subcribeWeather.js';

const unSubscribeCommand = async (ctx: IContext) => {
  const id = ctx.message?.from.id;

  const statusSubscribe = await isSubcribed(String(id));

  if (!statusSubscribe) {
    ctx.reply(NOT_SUBSCRIBE_WEATHER);
  } else {
    await unSubscribeWeatherBD(String(id));

    ctx.reply(UNSUBSCRIBE_WEATHER);
  }
};

export default unSubscribeCommand;
