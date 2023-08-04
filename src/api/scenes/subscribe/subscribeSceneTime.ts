import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import { timeRegExp } from '../../../config/constaint/regexp.js';
import IContext from '../../../config/interfaces/IContext.js';

const subscribeSceneTime = new BaseScene<IContext>('subscribeSceneTime');

subscribeSceneTime.enter(async (ctx) => {
  await ctx.reply('Введите время рассылки погоды в формате HH:MM');
});

subscribeSceneTime.command('leave', async (ctx) => {
  await ctx.scene.leave();
  await ctx.scene.enter('subscribe');
});

subscribeSceneTime.command('exit', async (ctx) => {
  await ctx.scene.leave();
});

subscribeSceneTime.on(message('text'), async (ctx) => {
  const time = ctx.message.text;

  if (timeRegExp.test(time)) {
    ctx.session.subscribeTime = time;

    await ctx.scene.leave();
    await ctx.scene.enter('subscribeSceneTotal');
  } else {
    ctx.reply(
      'Либо повторите ввод времени, либо введите команду /leave, чтобы вернуться к выбору города, либо введите /exit, чтобы отменить команду',
    );
  }
});

export default subscribeSceneTime;