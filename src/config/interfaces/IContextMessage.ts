import { Context } from 'telegraf';
import { Message, Update } from 'typegram';

export default interface IContextMessage extends Context<Update> {
  message: (Message & { text: string }) | any;
}
