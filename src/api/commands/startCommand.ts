import { WELCOME_COMMAND } from '../../config/index.js';
import IContext from '../../config/interfaces/IContext.js';
import newUser from '../../models/data-access/newUser.js';

const startCommand = async (ctx: IContext) => {
  const name = ctx.from?.first_name || 'unknow';

  await ctx.reply(WELCOME_COMMAND(name));

  await newUser(String(ctx.message?.from.id) || '0');
};

export default startCommand;
