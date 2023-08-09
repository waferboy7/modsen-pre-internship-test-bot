import { MESSAGES } from '../../config/index.js';
import IContext from '../../config/interfaces/IContext.js';

const helpCommand = async (ctx: IContext) => {
  await ctx.reply(MESSAGES.join('\n\n'));
};

export default helpCommand;
