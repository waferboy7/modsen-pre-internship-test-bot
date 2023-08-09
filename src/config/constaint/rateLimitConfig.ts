import IContext from '../interfaces/IContext.js';

const limitConfig = {
  window: 1000,
  limit: 1,
  onLimitExceeded: async (ctx: IContext) => {
    try {
      await ctx.reply('Ограничение запросов');
    } catch (error) {
      console.error((error as Error).message);
    }
  },
};

export default limitConfig;
