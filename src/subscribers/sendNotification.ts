import axios from 'axios';

import bot from '../api/index.js';
import { WEATHER_KEY, WEATHER_URL } from '../config/index.js';
import UserNotification from '../config/interfaces/UserNotification.js';
import WeatherResponse from '../config/interfaces/WeatgerResponce.js';
import checkNotification from '../models/data-access/checkNotification.js';

const getFullUrl = (city: string) => `${WEATHER_URL}${city}&units=metric&lang=ru&appid=${WEATHER_KEY}`;

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getWeatherInfo = async (user: UserNotification) => {
  await axios.get(getFullUrl(user.city)).then(({ data }: { data: WeatherResponse }) => {
    const answer = `Прогноз погоды в городе ${data.name}:\n\n${capitalizeFirstLetter(
      data.weather[0].description,
    )}\n\nТемпература: ${Math.floor(data.main.temp)} °C\n\nОщущается как ${Math.floor(data.main.feels_like)} °C\n`;

    bot.telegram.sendMessage(user.user_id, answer);
  });
};

export default async function sendNotification() {
  const users: UserNotification[] = await checkNotification();

  if (users.length > 0) {
    users.forEach((user) => getWeatherInfo(user));
  }
}