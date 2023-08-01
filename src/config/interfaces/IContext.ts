import { Context, Scenes } from 'telegraf';

import ISceneSession from './ISceneSession.js';

interface ISceneCustom extends ISceneSession {
  mySceneSessionProp: number;
  lat?: string;
  lon?: string;
  radius?: number;
  kind?: string;
  name?: string;
  date?: string;
  time?: string;
}

export default interface MyContext extends Context {
  myContextProp: string;

  scene: Scenes.SceneContextScene<MyContext, ISceneCustom>;

  session: any;
}
