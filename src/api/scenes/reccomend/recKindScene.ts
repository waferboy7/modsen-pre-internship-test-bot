import { Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import { BaseScene } from 'telegraf/scenes';

import kinds from '../../../config/constaint/categories.js';
import {
  ENTER_KIND,
  ENTER_SOMETHING_TO_OR_LEAVE,
  LEAVE,
  LEAVE_COMMAND,
  RECOMMEND,
  RECOMMEND_KIND_SCENE,
  RECOMMEND_KIND_SCENE_ENTER_MESSAGE,
  RECOMMEND_RADIUS_SCENE,
} from '../../../config/index.js';
import IContext from '../../../config/interfaces/IContext.js';

const recKindScene = new BaseScene<IContext>(RECOMMEND_KIND_SCENE);

const allKinds = kinds.flat();

const keyboard = Markup.keyboard(kinds).resize().oneTime();

recKindScene.enter(async (ctx) => {
  await ctx.reply(RECOMMEND_KIND_SCENE_ENTER_MESSAGE, keyboard);
});

recKindScene.command(LEAVE, async (ctx) => {
  await ctx.reply(LEAVE_COMMAND(RECOMMEND));
  await ctx.scene.leave();
});

recKindScene.on(message('text'), async (ctx) => {
  const { text } = ctx.message;
  if (allKinds.includes(text)) {
    ctx.session.kind = text;

    await ctx.scene.leave();
    await ctx.scene.enter(RECOMMEND_RADIUS_SCENE);
  } else {
    await ctx.reply(ENTER_SOMETHING_TO_OR_LEAVE(ENTER_KIND));
  }
});

export default recKindScene;
