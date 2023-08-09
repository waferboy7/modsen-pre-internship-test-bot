import { Context } from 'telegraf';

import { ERROR_MESSAGE } from '../../config/index.js';

const errorHandler = async (error: unknown, ctx: Context) => {
  console.error(`id: ${ctx.from?.id} name: ${ctx.from?.username}: error: ${error}`);

  try {
    await ctx.reply(ERROR_MESSAGE);
  } catch (err) {
    console.error((err as Error).message);
  }
};

export default errorHandler;
