import { Context } from 'telegraf';

const startCommand = async (ctx: Context) => {
  await ctx.reply('Добро пожаловать!');
};

export default startCommand;
