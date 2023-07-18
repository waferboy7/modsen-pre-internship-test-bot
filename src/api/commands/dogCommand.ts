import axios from 'axios';
import { Context } from 'telegraf';

import { DOG_URL } from '../../config/index.js';

const dogCommand = async (ctx: Context) => {
  const response = await axios.get(DOG_URL);
  const imageUrl = response.data.message;

  await ctx.replyWithPhoto(imageUrl);
};

export default dogCommand;
