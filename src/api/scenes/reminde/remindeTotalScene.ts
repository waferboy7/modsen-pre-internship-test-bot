import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import IContext from '../../../config/interfaces/IContext.js';
import reminder from '../../../models/data-access/reminder.js';

const remindeTotalScene = new BaseScene<IContext>('remindeTotalScene');

remindeTotalScene.enter(async (ctx) => {
  const { name, date, time } = ctx.session;

  const nameMessage = `Текст напоминания: ${name}`;
  const dateMessage = `Напоминить ${date} в ${time}`;

  await ctx.reply(`${nameMessage}\n\n${dateMessage}`);
});

remindeTotalScene.command('leave', async (ctx) => {
  await ctx.scene.leave();
  await ctx.scene.enter('remindeTimeScene');
});

remindeTotalScene.command('exit', async (ctx) => {
  await ctx.scene.leave();
});

remindeTotalScene.on(message('text'), async (ctx) => {
  if (ctx.message.text === 'Напомнить') {
    const { name, date, time } = ctx.session;
    const { id } = ctx.message.from;

    const fullData = new Date(`${date}T${time}:00.000+03:00`);

    await reminder(id, name, fullData);

    ctx.reply(`Напоминание установленно на ${date} ${time}`);
    await ctx.scene.leave();
  }
});

export default remindeTotalScene;
