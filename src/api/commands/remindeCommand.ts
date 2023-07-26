import { dateRegExp, timeRegExp } from '../../config/constaint/regexp.js';
import IContextMessage from '../../config/interfaces/IContextMessage.js';
import reminder from '../../models/data-access/reminder.js';

const reminderCommand = async (ctx: IContextMessage) => {
  const commandParams = ctx.message.text.split(' ');

  const date = commandParams[2];
  const time = commandParams[3];

  if (commandParams.length === 4 || dateRegExp.test(date) || timeRegExp.test(time)) {
    try {
      const nameReminde = commandParams[1];
      const fullData = new Date(`${date}T${time}`);

      await reminder(ctx.message.from.id, nameReminde, fullData);

      ctx.reply(`Напоминание установленно на ${date} ${time}`);
    } catch (error) {
      console.error('Ошибка команды remindeCommand: ', (error as Error).message);
      throw error;
    }
  } else {
    ctx.reply('Пожалуйста, введите текст напоминания, а также дату и время в виде YYYY-MM-DD и HH:MM ');
  }
};

export default reminderCommand;
