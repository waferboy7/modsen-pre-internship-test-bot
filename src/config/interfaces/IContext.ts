import { Context, Scenes } from 'telegraf';

import ISceneSession from './ISceneSession.js';

export default interface MyContext extends Context {
  myContextProp: string;

  scene: Scenes.SceneContextScene<MyContext, ISceneSession>;
}
