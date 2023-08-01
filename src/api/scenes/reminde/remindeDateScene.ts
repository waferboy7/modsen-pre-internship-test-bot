import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import { dateRegExp } from '../../../config/constaint/regexp.js';
import IContext from '../../../config/interfaces/IContext.js';

const remindeDateScene = new BaseScene<IContext>('remindeDateScene');

remindeDateScene.enter(async (ctx) => {
  await ctx.reply('Введите дату в виде YYYY-MM-DD, когда необходимо отправить напоминание');
});

remindeDateScene.command('leave', async (ctx) => {
  await ctx.scene.leave();
  await ctx.scene.enter('reminde');
});

remindeDateScene.command('exit', async (ctx) => {
  await ctx.scene.leave();
});

remindeDateScene.on(message('text'), async (ctx) => {
  const date = ctx.message.text;

  if (dateRegExp.test(date)) {
    ctx.session.date = date;

    await ctx.scene.leave();
    await ctx.scene.enter('remindeTimeScene');
  } else {
    ctx.reply('Повторите ввод даты');
  }
});

export default remindeDateScene;