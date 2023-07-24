import { Context } from 'telegraf';

const commandNotFound = async (ctx: Context) => {
  await ctx.reply('Я Вас не понял');
};

export default commandNotFound;