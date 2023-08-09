import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import { timeRegExp } from '../../../config/constaint/regexp.js';
import { ENTER_SOMETHING_TO_OR_LEAVE, ENTER_TIME, LEAVE, LEAVE_COMMAND, REMINDE } from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';

const remindeTimeScene = new BaseScene<IContext>('remindeTimeScene');

remindeTimeScene.enter(async (ctx) => {
  await ctx.reply('Введите время в виде HH:MM, когда необходимо отправить напоминание');
});

remindeTimeScene.command(LEAVE, async (ctx) => {
  await ctx.reply(LEAVE_COMMAND(REMINDE));

  await ctx.scene.leave();
});

remindeTimeScene.on(message('text'), async (ctx) => {
  const time = ctx.message.text;

  if (timeRegExp.test(time)) {
    ctx.session.time = time;

    await ctx.scene.leave();
    await ctx.scene.enter('remindeTotalScene');
  } else {
    ctx.reply(ENTER_SOMETHING_TO_OR_LEAVE(ENTER_TIME));
  }
});

export default remindeTimeScene;
