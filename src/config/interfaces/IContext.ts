import { Context, Scenes } from 'telegraf';

interface ISceneCustom extends Scenes.SceneSessionData {
  mySceneSessionProp: number;
}

export interface ISession extends Scenes.SceneSession<ISceneCustom> {
  lat: string;
  lon: string;
  radius: number;
  kind: string;
  name: string;
  date: string;
  time: string;
  subscribeCity: string;
  subscribeTime: string;
}

export default interface IContext extends Context {
  myContextProp: string;

  scene: Scenes.SceneContextScene<IContext, Scenes.SceneSessionData>;

  session: ISession;
}
