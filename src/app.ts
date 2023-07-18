import catCommand from './api/commands/catCommand.js';
import dogCommand from './api/commands/dogCommand.js';
import errorHandler from './api/commands/errorHandler.js';
import helpCommand from './api/commands/helpCommand.js';
import startCommand from './api/commands/startCommand.js';
import weatherCommand from './api/commands/weatherCommand.js';
import bot from './api/index.js';

console.log('start');

bot.start(startCommand);
bot.help(helpCommand);

bot.catch(errorHandler);

bot.command('cat', catCommand);

bot.command('weather', weatherCommand);

bot.command('dog', dogCommand);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
