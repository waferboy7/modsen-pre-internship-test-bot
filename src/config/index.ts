import dotenv from 'dotenv';

import IDotEnv from '../../env.js';

dotenv.config();

export const { TELEGRAM_TOKEN, CAT_URL, DOG_URL, WEATHER_KEY, WEATHER_URL, DB_KEY, REC_KEY, REC_URL }: IDotEnv = process.env as unknown as IDotEnv;

export const LIMIT_REC = 5;

export const CAT = 'cat';
export const DOG = 'dog';
export const WEATHER = 'weather';
export const SUBSCRIBE = 'subscribe';
export const UNSUBSCRIBE = 'unsubscribe';
export const REMINDE = 'reminde';
export const RECOMMEND = 'recommend';
export const INFO = 'info';
export const SIGINT = 'SIGINT';
export const SIGTERM = 'SIGTERM';
export const LEAVE = 'leave';

export const NOT_UNDERSTAND = 'Я Вас не понял';
export const ERROR_MESSAGE = 'Что-то пошло не так...';

const startMessage = `/start - регистрация пользователя и его приветствие`;
const helpMessage = `/help - подсказка о возможностях бота`;
const catMessage = `/cat - случайное изображение с котоиком`;
const dogMessage = `/dog - случайное изображение с собачкой`;
const weatherMesage = `/weather - получить данные о погоде в введённом городе`;
const subscribeMessage = `/subscribe - подписаться на рассылку погоды в введенном городе в введенное время`;
const unsubscribeMessagee = `/unsubscribe - отписаться от рассылки на погоду`;
const remindeMessage = `/reminde - создать напоминание на введенную дату и время`;
const recommendMessage = `/recommend - рекомендация мест по городе или координатам по выбранной категории по заданному радиусу`;
const infoMessage = `/info - предоставляет данные о подписке на рассылку погоды, а также о всех установленных напоминаниях`;

export const MESSAGES = [
  startMessage,
  helpMessage,
  catMessage,
  dogMessage,
  weatherMesage,
  subscribeMessage,
  unsubscribeMessagee,
  remindeMessage,
  recommendMessage,
  infoMessage,
];

export const WELCOME_COMMAND = (name: string): string => `Добро пожаловать, ${name}!`;

export const NOT_SUBSCRIBE_WEATHER = 'Вы не подписаны на уведомления';
export const UNSUBSCRIBE_WEATHER = 'Вы отписались от подписки погоды по городу';

export const LEAVE_COMMAND = (command: string) => `Вы отменили команду /${command}`;

export const ENTER_SOMETHING_TO_OR_LEAVE = (something: string): string => `Введите либо ${something} еще раз, либо /leave отменить команду`;

export const ENTER_CITY = 'город';
export const ENTER_KIND = 'категорию';
export const ENTER_RADIUS = 'радиус';

export const ENTER_TIME = 'время';
export const ENTER_DATE = 'дату';

export const RECOMMEND_COORDS_SCENE_ENTER_MESSAGE = 'Пожалуйста, введите ваш город или предоставьте доступ к вашим геоданным';
export const RECOMMEND_KIND_SCENE_ENTER_MESSAGE = 'Выберите категорию для поиска';
export const RECCOMEND_TIME_SCENE_ENTER_MESSAGE = 'Введите время в виде HH:MM, когда необходимо отправить напоминание';
export const RECCOMEND_RADIUS_SCENE_ENTER_MESSAGE = 'Введите радиус поиска в км';

export const RECOMMEND_KIND_SCENE = 'recKindScene';
export const RECOMMEND_RADIUS_SCENE = 'recRadiusScene';
export const RECOMMEND_TOTAL_SCENE = 'recTotalScene';