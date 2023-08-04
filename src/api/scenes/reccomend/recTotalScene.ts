import axios from 'axios';
import { BaseScene } from 'telegraf/scenes';

import { LIMIT_REC, REC_KEY, REC_URL } from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';
import { RecFeatuers, RecResponce } from '../../../config/interfaces/RecResponce.js';

const getFullUrlRec = (lat: string, lon: string, kind: string, radius: string) => {
  const radiusM = +radius * 1000;

  return `${REC_URL}radius=${radiusM}&lon=${lon}&lat=${lat}&kinds=${kind}&limit=${LIMIT_REC}&apikey=${REC_KEY}`;
};

const recTotalScene = new BaseScene<IContext>('recTotalScene');

recTotalScene.enter(async (ctx) => {
  const { lat, lon, kind, radius } = ctx.session;

  const coordsMessage = `Ваши координаты:\nширота = ${lat}\nдолгота = ${lon}`;
  const kindMessage = `Категория поиска: ${kind}`;
  const radiusMessage = `Радиус поиска: ${radius} км`;

  await ctx.reply(`${coordsMessage}\n\n${kindMessage}\n\n${radiusMessage}`);

  const places: RecFeatuers[] = await axios
    .get(getFullUrlRec(lat, lon, kind, radius))
    .then(({ data }: { data: RecResponce }) => data.features);

  if (places.length === 0) {
    await ctx.reply(`По вашему запросу ничего не найдено.\n\nПопробуйте изменить радиус`);
  } else {
    places.map(async (place: RecFeatuers) => {
      const name = place.properties.name || 'Нет данных о названии';
      const [lonPlace, latPlace] = place.geometry.coordinates;
      const { dist } = place.properties;

      await ctx.reply(
        `Название: ${name}\n\nРасстояние до места: ${Math.floor(
          dist,
        )} м\n\nКоординаты места:\nширота = ${latPlace}\nдолгота = ${lonPlace}`,
      );
    });
  }

  ctx.scene.leave();
});

export default recTotalScene;
