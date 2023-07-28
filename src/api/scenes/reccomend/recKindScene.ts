import { Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import kinds from '../../../config/constaint/categories.js';
import IContext from '../../../config/interfaces/IContext.js';

const recKindScene = new BaseScene<IContext>('recKindScene');

const allKinds = kinds.flat();

const keyboard = Markup.keyboard(kinds).resize().oneTime();

recKindScene.enter(async (ctx) => {
  await ctx.reply('Выберите категорию для поиска', keyboard);
});

recKindScene.command('leave', async (ctx) => {
  await ctx.scene.leave();
  await ctx.scene.enter('recommend');
});

recKindScene.command('exit', async (ctx) => {
  await ctx.scene.leave();
});

recKindScene.on(message('text'), async (ctx) => {
  const { text } = ctx.message;
  if (allKinds.includes(text)) {
    ctx.session.kind = text;

    await ctx.scene.leave();
    await ctx.scene.enter('recRadiusScene');
  } else {
    await ctx.reply('Введите либо категорию для поиска, либо команду /leave для ввода категории, либо /exit для выхода из рекомендации');
  }
});

export default recKindScene;
