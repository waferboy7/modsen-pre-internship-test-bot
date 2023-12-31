import bot from '../api/index.js';
import IReminde from '../config/interfaces/IReminde.js';
import checkReminde from '../models/data-access/checkReminde.js';
import deleteReminde from '../models/data-access/deleteReminde.js';

const getReminde = async (reminder: IReminde) => {
  try {
    await bot.telegram.sendMessage(reminder.user_id, reminder.name);
  } catch (error) {
    console.error('sendReminde error: ', (error as Error).message);
  }
};

export default async function sendReminde() {
  try {
    const reminders: IReminde[] = await checkReminde(new Date());

    if (reminders.length > 0) {
      reminders.forEach(async (reminder: IReminde) => {
        await getReminde(reminder);
        await deleteReminde(reminder.id);
      });
    }
  } catch (error) {
    console.error((error as Error).message);
  }
}
