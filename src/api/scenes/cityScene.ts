import { Context } from 'telegraf';
import { BaseScene, Stage } from 'telegraf/scenes';

import IContext from '../../config/interfaces/IContext.js';

const cityScene = new BaseScene<IContext>('city');

cityScene.enter((ctx: Context) => {
  ctx.reply('Пожалуйста, введите ваш город или предоставьте доступ к вашим геоданным.', {
    reply_markup: {
      keyboard: [[{ text: 'Предоставить доступ к геоданным', request_location: true }]],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  });
});

cityScene.leave((ctx: IContext) => {
  ctx.reply('До связи... ПУП... ПУП... ПУП...', {
    reply_markup: {
      remove_keyboard: true, // Убираем клавиатуру
    },
  });
});

cityScene.command('leave', (ctx: IContext) => {
  ctx.scene.leave();
});

cityScene.on('message', (ctx: Context) => {
  ctx.reply(JSON.stringify(ctx.message, null, 2));
});

export default cityScene;
