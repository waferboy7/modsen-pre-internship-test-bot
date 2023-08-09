import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import {
  ENTER_CITY,
  ENTER_SOMETHING_TO_OR_LEAVE,
  LEAVE,
  LEAVE_COMMAND,
  RECOMMEND,
  RECOMMEND_COORDS_SCENE_ENTER_MESSAGE,
  RECOMMEND_KIND_SCENE,
} from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';
import getCordsByCity from '../../../models/data-access/getCordsByCity.js';

const recCoordsScene = new BaseScene<IContext>(RECOMMEND);

recCoordsScene.enter((ctx) => {
  ctx.reply(RECOMMEND_COORDS_SCENE_ENTER_MESSAGE, {
    reply_markup: {
      keyboard: [[{ text: 'Предоставить доступ к геоданным', request_location: true }]],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  });
});

recCoordsScene.command(LEAVE, async (ctx) => {
  await ctx.reply(LEAVE_COMMAND(RECOMMEND));
  await ctx.scene.leave();
});

recCoordsScene.on(message('location'), async (ctx) => {
  const { latitude, longitude } = ctx.message.location;

  ctx.session.lat = String(latitude);
  ctx.session.lon = String(longitude);

  await ctx.scene.leave();
  await ctx.scene.enter(RECOMMEND_KIND_SCENE);
});

recCoordsScene.on(message('text'), async (ctx) => {
  try {
    const coords = await getCordsByCity(ctx.message.text);

    const { lat, lon } = coords;

    ctx.session.lat = lat;
    ctx.session.lon = lon;

    await ctx.scene.leave();
    await ctx.scene.enter('recKindScene');
  } catch (error) {
    ctx.reply(ENTER_SOMETHING_TO_OR_LEAVE(ENTER_CITY));
  }
});

export default recCoordsScene;
