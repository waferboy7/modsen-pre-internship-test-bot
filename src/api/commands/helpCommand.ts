import { Context } from 'telegraf';

const helpCommand = async (ctx: Context) => {
  const message = `/cat - отправляет пользователю случайное изображение с котиком,\n/dog - отправляет пользователю случайное изображение с собачкой,\n/weather city - отправляет пользователю погоду по заданному city.`;
  await ctx.reply(message);
};

export default helpCommand;
