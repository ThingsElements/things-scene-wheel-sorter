/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import MixinScanner from './mixin-scanner'

var {
  Component,
  RectPath,
  Shape
} = scene;

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'number',
    label: 'value',
    name: 'value',
    property: 'value'
  }]
}

const STAT_IDLE = 0;
const STAT_RUN = 1;
const STAT_CHUTE_FULL = 2;
const STAT_ERROR = 3;

export default class Scanner extends MixinScanner(RectPath(Shape)) {

  get nature() {
    return NATURE
  }

  _draw(ctx) {

    var {
      width, height, left, top,
    } = this.model;

    ctx.beginPath();
    ctx.rect(left, top, width, height);
  }

  is3dish() {
    return true
  }
}

Component.register('scanner', Scanner);
