import { Context } from 'telegraf';

import { NOT_UNDERSTAND } from '../../config/index.js';

const commandNotFound = async (ctx: Context) => {
  await ctx.reply(NOT_UNDERSTAND);
};

export default commandNotFound;