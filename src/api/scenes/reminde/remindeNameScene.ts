import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import IContext from '../../../config/interfaces/IContext.js';

const remindeNameScene = new BaseScene<IContext>('reminde');

remindeNameScene.enter(async (ctx) => {
  await ctx.reply('Введите текст напоминания');
});

remindeNameScene.command('leave', async (ctx) => {
  await ctx.scene.leave();
});

remindeNameScene.on(message('text'), async (ctx) => {
  const name = ctx.message.text;

  ctx.session.name = name;

  await ctx.scene.leave();
  await ctx.scene.enter('remindeDateScene');
});

export default remindeNameScene;
