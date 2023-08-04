import IContext from '../../config/interfaces/IContext.js';
import IUserRemindes from '../../config/interfaces/IUserremindes.js';
import getRemindes from '../../models/data-access/getRemindes.js';
import getSubscribeWeather from '../../models/data-access/getSubscribeWeather.js';

function generateReminderMessage(remindes: IUserRemindes[]) {
  const message = [];

  for (const reminde of remindes) {
    const date = new Date(reminde.time).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    message.push(`Напоминание: ${reminde.name}\nВремя: ${date}`);
  }

  return message.join('\n\n');
}

const infoCommand = async (ctx: IContext) => {
  const id = Number(ctx.from?.id);
  const userWeather = await getSubscribeWeather(id);

  const userRemindes: IUserRemindes[] = await getRemindes(id);

  const messageWeather = !userWeather
    ? 'Вы не подписаны на рассылку погоды'
    : `Вы подписаны на рассылку погоды по городу: ${userWeather}`;

  const messageReminde = !userRemindes[0]
    ? 'У Вас нет напоминаний'
    : `Ваши напоминания:\n${generateReminderMessage(userRemindes)}`;

  ctx.reply(`${messageWeather}\n\n${messageReminde}`);
};

export default infoCommand;
