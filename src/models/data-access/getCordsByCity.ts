import axios from 'axios';

import getFullUrlWeather from '../../config/constaint/getFullUrlWeather.js';
import WeatherResponse from '../../config/interfaces/WeatgerResponce.js';

const getCordsByCity = async (city: string) => {
  const coords = await axios.get(getFullUrlWeather(city)).then(({ data }: { data: WeatherResponse }) => data.coord);

  return coords;
};

export default getCordsByCity;
