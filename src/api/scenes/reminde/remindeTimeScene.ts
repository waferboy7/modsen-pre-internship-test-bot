import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import { timeRegExp } from '../../../config/constaint/regexp.js';
import IContext from '../../../config/interfaces/IContext.js';

const remindeTimeScene = new BaseScene<IContext>('remindeTimeScene');

remindeTimeScene.enter(async (ctx) => {
  await ctx.reply('Введите время в виде HH:MM, когда необходимо отправить напоминание');
});

remindeTimeScene.command('leave', async (ctx) => {
  await ctx.scene.leave();
  await ctx.scene.enter('remindeDateScene');
});

remindeTimeScene.command('exit', async (ctx) => {
  await ctx.scene.leave();
});

remindeTimeScene.on(message('text'), async (ctx) => {
  const time = ctx.message.text;

  if (timeRegExp.test(time)) {
    ctx.session.time = time;

    await ctx.scene.leave();
    await ctx.scene.enter('remindeTotalScene');
  } else {
    ctx.reply('Повторите ввод времени');
  }
});

export default remindeTimeScene;