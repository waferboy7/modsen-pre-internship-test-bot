import { Context } from 'telegraf';

const helpCommand = async (ctx: Context) => {
  const startMessage = `/start - регистрация пользователя и его приветствие`;
  const helpMessage = `/help - подсказка о возможностях бота`;
  const catMessage = `/cat - случайное изображение с котоиком`;
  const dogMessage = `/dog - случайное изображение с собачкой`;
  const weatherMesage = `/weather - получить данные о погоде в введённом городе`;
  const subscribeMessage = `/subscribe - подписаться на рассылку погоды в введенном городе в введенное время`;
  const unsubscribeMessagee = `/unsubscribe - отписаться от рассылки на погоду`;
  const remindeMessage = `/reminde - создать напоминание на введенную дату и время`;
  const infoMessage = `/info - предоставляет данные о подписке на рассылку погоды, а также о всех установленных напоминаниях`;

  const messages = [
    startMessage,
    helpMessage,
    catMessage,
    dogMessage,
    weatherMesage,
    subscribeMessage,
    unsubscribeMessagee,
    remindeMessage,
    infoMessage,
  ];

  await ctx.reply(messages.join('\n\n'));
};

export default helpCommand;
