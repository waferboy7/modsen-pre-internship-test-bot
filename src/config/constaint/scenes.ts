import recCoordsScene from '../../api/scenes/reccomend/recCoordsScene.js';
import recKindScene from '../../api/scenes/reccomend/recKindScene.js';
import recRadiusScene from '../../api/scenes/reccomend/recRadiusScene.js';
import recTotalScene from '../../api/scenes/reccomend/recTotalScene.js';
import remindeDateScene from '../../api/scenes/reminde/remindeDateScene.js';
import remindeNameScene from '../../api/scenes/reminde/remindeNameScene.js';
import remindeTimeScene from '../../api/scenes/reminde/remindeTimeScene.js';
import remindeTotalScene from '../../api/scenes/reminde/remindeTotalScene.js';
import subscribeScene from '../../api/scenes/subscribe/subscribeScene.js';
import subscribeSceneTime from '../../api/scenes/subscribe/subscribeSceneTime.js';
import subscribeSceneTotal from '../../api/scenes/subscribe/subscribeSceneTotal.js';
import weatherScene from '../../api/scenes/weather/weatherScene.js';

const SCENES = [
  recCoordsScene,
  recKindScene,
  recRadiusScene,
  recTotalScene,
  weatherScene,
  subscribeScene,
  subscribeSceneTime,
  subscribeSceneTotal,
  remindeNameScene,
  remindeDateScene,
  remindeTimeScene,
  remindeTotalScene,
];

export default SCENES;
