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
  subscribeCity?: string;
  subscribeTime?: string;
}

export default interface IContext extends Context {
  myContextProp: string;

  scene: Scenes.SceneContextScene<IContext, ISceneCustom>;

  session: any;
}
