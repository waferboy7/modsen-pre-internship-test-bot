import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import IContext from '../../../config/interfaces/IContext.js';

const recRadiusScene = new BaseScene<IContext>('recRadiusScene');

recRadiusScene.enter(async (ctx) => {
  await ctx.reply('Введите радиус поиска в км', { reply_markup: { remove_keyboard: true } });
});

recRadiusScene.command('leave', async (ctx) => {
  await ctx.scene.leave();
  await ctx.scene.enter('recKindScene');
});

recRadiusScene.command('exit', async (ctx) => {
  await ctx.scene.leave();
});

recRadiusScene.on(message('text'), async (ctx) => {
  const { text } = ctx.message;

  const radius = parseFloat(text);

  if (!Number.isNaN(radius) && radius > 0) {
    ctx.session.radius = radius;

    await ctx.scene.leave();
    await ctx.scene.enter('recTotalScene');
  } else {
    await ctx.reply(
      'Введите либо радиус поиска в км, либо команду /leave для ввода категории, либо /exit для выхода из рекомендации',
    );
  }
});

export default recRadiusScene;
