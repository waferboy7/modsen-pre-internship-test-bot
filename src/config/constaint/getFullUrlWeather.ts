import { WEATHER_KEY, WEATHER_URL } from '../index.js';

const getFullUrlWeather = (city: string) => `${WEATHER_URL}${city}&units=metric&lang=ru&appid=${WEATHER_KEY}`;

export default getFullUrlWeather;
