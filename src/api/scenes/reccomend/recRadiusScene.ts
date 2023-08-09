import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import {
  ENTER_RADIUS,
  ENTER_SOMETHING_TO_OR_LEAVE,
  LEAVE,
  LEAVE_COMMAND,
  RECCOMEND_RADIUS_SCENE_ENTER_MESSAGE,
  RECOMMEND,
  RECOMMEND_RADIUS_SCENE,
  RECOMMEND_TOTAL_SCENE,
} from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';

const recRadiusScene = new BaseScene<IContext>(RECOMMEND_RADIUS_SCENE);

recRadiusScene.enter(async (ctx) => {
  await ctx.reply(RECCOMEND_RADIUS_SCENE_ENTER_MESSAGE, { reply_markup: { remove_keyboard: true } });
});

recRadiusScene.command(LEAVE, async (ctx) => {
  await ctx.reply(LEAVE_COMMAND(RECOMMEND));
  await ctx.scene.leave();
});

recRadiusScene.on(message('text'), async (ctx) => {
  const { text } = ctx.message;

  const radius = parseFloat(text);

  if (!Number.isNaN(radius) && radius > 0) {
    ctx.session.radius = radius;

    await ctx.scene.leave();
    await ctx.scene.enter(RECOMMEND_TOTAL_SCENE);
  } else {
    await ctx.reply(ENTER_SOMETHING_TO_OR_LEAVE(ENTER_RADIUS));
  }
});

export default recRadiusScene;
