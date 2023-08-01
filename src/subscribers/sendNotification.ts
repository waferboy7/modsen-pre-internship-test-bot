import axios, { AxiosError } from 'axios';

import bot from '../api/index.js';
import getFullUrlWeather from '../config/constaint/getFullUrlWeather.js';
import UserNotification from '../config/interfaces/UserNotification.js';
import WeatherResponse from '../config/interfaces/WeatgerResponce.js';
import checkNotification from '../models/data-access/checkNotification.js';

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getWeatherInfo = async (user: UserNotification) => {
  try {
    await axios.get(getFullUrlWeather(user.city)).then(({ data }: { data: WeatherResponse }) => {
      const answer = `Прогноз погоды в городе ${data.name}:\n${capitalizeFirstLetter(
        data.weather[0].description,
      )}\n\nТемпература: ${Math.floor(data.main.temp)} °C\n\nОщущается как ${Math.floor(data.main.feels_like)} °C\n`;

      bot.telegram.sendMessage(user.user_id, answer);
    });
  } catch (error) {
    console.log('sendNotification error: ', (error as Error).message);
    bot.telegram.sendMessage(user.user_id, 'Произошла ошибка рассылки, обратитесь к @waferboy');
  }
};

export default async function sendNotification() {
  const users: UserNotification[] = await checkNotification();

  if (users.length > 0) {
    users.forEach((user) => getWeatherInfo(user));
  }
}
