import axios from 'axios';

import { WEATHER_KEY, WEATHER_URL } from '../../config/index.js';

interface WeatherResponse {
  coord: { lon: number; lat: number };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  rain?: { [key: string]: number };
  snow?: { [key: string]: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type?: number;
    id: number;
    message?: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getFullUrl = (city: string) => `${WEATHER_URL}${city}&units=metric&lang=ru&appid=${WEATHER_KEY}`;

const weatherCommand = async (ctx: { message: { text: string }; reply: (arg0: string) => void }) => {
  const commandParams = ctx.message.text.match(/\/weather\s(.+)/);
  if (commandParams && commandParams.length === 2) {
    const city = commandParams[1];

    await axios.get(getFullUrl(city)).then(({ data }: { data: WeatherResponse }) => {
      const answer = `Прогноз погоды в городе ${data.name}:\n\n${capitalizeFirstLetter(
        data.weather[0].description,
      )}\n\nТемпература: ${Math.floor(data.main.temp)} °C\n\nОщущается как ${Math.floor(data.main.feels_like)} °C\n`;

      ctx.reply(answer);
    });
  } else {
    await ctx.reply('Пожалуйста, укажите параметр после команды.');
  }
};

export default weatherCommand;
