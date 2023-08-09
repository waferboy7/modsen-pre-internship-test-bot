import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import { LEAVE, LEAVE_COMMAND, REMINDE } from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';

const remindeNameScene = new BaseScene<IContext>(REMINDE);

remindeNameScene.enter(async (ctx) => {
  await ctx.reply('Введите текст напоминания');
});

remindeNameScene.command(LEAVE, async (ctx) => {
  await ctx.reply(LEAVE_COMMAND(REMINDE));
  await ctx.scene.leave();
});

remindeNameScene.on(message('text'), async (ctx) => {
  const name = ctx.message.text;

  ctx.session.name = name;

  await ctx.scene.leave();
  await ctx.scene.enter('remindeDateScene');
});

export default remindeNameScene;
