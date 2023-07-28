import { Context, Scenes } from 'telegraf';
import { Message, Update } from 'typegram';

import MyContext from './IContext.js';
import ISceneSession from './ISceneSession.js';

export default interface IContextMessage extends Context<Update> {
  message: (Message & { text?: string } & { location?: object & { latitude: string } & { longitude: string } }) | any;

  myContextProp: string;

  scene: Scenes.SceneContextScene<MyContext, ISceneSession>;
}
