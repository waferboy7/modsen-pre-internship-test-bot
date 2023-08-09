import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import { dateRegExp } from '../../../config/constaint/regexp.js';
import { ENTER_DATE, ENTER_SOMETHING_TO_OR_LEAVE, LEAVE, LEAVE_COMMAND, REMINDE } from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';

const remindeDateScene = new BaseScene<IContext>('remindeDateScene');

remindeDateScene.enter(async (ctx) => {
  await ctx.reply('Введите дату в виде YYYY-MM-DD, когда необходимо отправить напоминание');
});

remindeDateScene.command(LEAVE, async (ctx) => {
  await ctx.reply(LEAVE_COMMAND(REMINDE));
  await ctx.scene.leave();
});

remindeDateScene.on(message('text'), async (ctx) => {
  const date = ctx.message.text;

  if (dateRegExp.test(date)) {
    ctx.session.date = date;

    await ctx.scene.leave();
    await ctx.scene.enter('remindeTimeScene');
  } else {
    ctx.reply(ENTER_SOMETHING_TO_OR_LEAVE(ENTER_DATE));
  }
});

export default remindeDateScene;
