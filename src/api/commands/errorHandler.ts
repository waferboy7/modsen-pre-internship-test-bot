import { Context } from 'telegraf';

const errorHandler = async (error: unknown, ctx: Context) => {
  console.error(`id: ${ctx.from?.id} name: ${ctx.from?.username}: error: ${error}`);

  const errorMessage = 'Что-то пошло не так...';
  await ctx.reply(errorMessage);
};

export default errorHandler;
