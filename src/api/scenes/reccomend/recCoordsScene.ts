import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import IContext from '../../../config/interfaces/IContext.js';
import getCordsByCity from '../../../models/data-access/getCordsByCity.js';

const recCoordsScene = new BaseScene<IContext>('recommend');

recCoordsScene.enter((ctx) => {
  ctx.reply('Пожалуйста, введите ваш город или предоставьте доступ к вашим геоданным.', {
    reply_markup: {
      keyboard: [[{ text: 'Предоставить доступ к геоданным', request_location: true }]],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  });
});

recCoordsScene.command('leave', async (ctx) => {
  await ctx.scene.leave();
});

recCoordsScene.on(message('location'), async (ctx) => {
  const { latitude, longitude } = ctx.message.location;

  ctx.session.lat = String(latitude);
  ctx.session.lon = String(longitude);

  ctx.reply(`${latitude} and ${longitude}`);

  await ctx.scene.leave();
  await ctx.scene.enter('recKindScene');
});

recCoordsScene.on(message('text'), async (ctx) => {
  try {
    const coords = await getCordsByCity(ctx.message.text);

    const { lat, lon } = coords;

    ctx.reply(`${lat}, ${lon}`);

    ctx.session.lat = lat;
    ctx.session.lon = lon;

    await ctx.scene.leave();
    await ctx.scene.enter('recKindScene');
  } catch (error) {
    ctx.reply('Введите город еще раз');
  }
});

export default recCoordsScene;
