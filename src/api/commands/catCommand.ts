import { Context } from 'telegraf';

import { CAT_URL } from '../../config/index.js';

const getCatPhoto = (url: string): string => `${url}?t=${new Date().getTime()}`;

const catCommand = async (ctx: Context) => {
  await ctx.sendPhoto(getCatPhoto(CAT_URL));
};

export default catCommand;
