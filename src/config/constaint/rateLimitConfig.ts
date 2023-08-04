import IContext from "../interfaces/IContext.js";

const limitConfig = {
  window: 1000,
  limit: 1,
  onLimitExceeded: async (ctx: IContext) => {
    await ctx.reply('Ограничение запросов');
  },
};

export default limitConfig;