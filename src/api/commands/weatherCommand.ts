import axios from 'axios';

import { WEATHER_KEY, WEATHER_URL } from '../../config/index.js';
import WeatherResponse from '../../config/interfaces/WeatgerResponce.js';

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getFullUrl = (city: string) => `${WEATHER_URL}${city}&units=metric&lang=ru&appid=${WEATHER_KEY}`;

const weatherCommand = async (ctx: { message: { text: string }; reply: (arg0: string) => void }) => {
  const commandParams = ctx.message.text.split(" ");
  if (commandParams.length === 2) {
    const city = commandParams[1];

    await axios.get(getFullUrl(city)).then(({ data }: { data: WeatherResponse }) => {
      const answer = `Прогноз погоды в городе ${data.name}:\n\n${capitalizeFirstLetter(
        data.weather[0].description,
      )}\n\nТемпература: ${Math.floor(data.main.temp)} °C\n\nОщущается как ${Math.floor(data.main.feels_like)} °C\n`;

      ctx.reply(answer);
    });
  } else {
    ctx.reply('Пожалуйста, укажите параметр после команды.');
  }
};

export default weatherCommand;
