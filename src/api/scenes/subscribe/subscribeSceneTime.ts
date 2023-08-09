import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import { timeRegExp } from '../../../config/constaint/regexp.js';
import { ENTER_SOMETHING_TO_OR_LEAVE, ENTER_TIME, LEAVE, LEAVE_COMMAND, SUBSCRIBE } from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';

const subscribeSceneTime = new BaseScene<IContext>('subscribeSceneTime');

subscribeSceneTime.enter(async (ctx) => {
  await ctx.reply('Введите время рассылки погоды в формате HH:MM');
});

subscribeSceneTime.command(LEAVE, async (ctx) => {
  await ctx.reply(LEAVE_COMMAND(SUBSCRIBE));
  await ctx.scene.leave();
});

subscribeSceneTime.on(message('text'), async (ctx) => {
  const time = ctx.message.text;

  if (timeRegExp.test(time)) {
    ctx.session.subscribeTime = time;

    await ctx.scene.leave();
    await ctx.scene.enter('subscribeSceneTotal');
  } else {
    ctx.reply(ENTER_SOMETHING_TO_OR_LEAVE(ENTER_TIME));
  }
});

export default subscribeSceneTime;
