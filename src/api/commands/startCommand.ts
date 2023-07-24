import { Context } from 'telegraf';

import newUser from '../../models/data-access/newUser.js';

const startCommand = async (ctx: Context) => {
  await ctx.reply(`Добро пожаловать, ${ctx.from?.first_name}!`);

  await newUser(String(ctx.message?.from.id) || '0');
};

export default startCommand;
