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
  }, {
    type: 'number',
    label: 'round',
    name: 'round',
    property: 'round'
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
      width, height, left, top
    } = this.model;

    var radius = width / 10

    ctx.beginPath();
    ctx.moveTo(left + radius, top);
    ctx.lineTo(left + width - radius, top);
    ctx.quadraticCurveTo(left + width, top, left + width, top + radius);
    ctx.lineTo(left + width, top + height - radius);
    ctx.quadraticCurveTo(left + width, top + height, left + width - radius, top + height);
    ctx.lineTo(left + radius, top + height);
    ctx.quadraticCurveTo(left, top + height, left, top + height - radius);
    ctx.lineTo(left, top + radius);
    ctx.quadraticCurveTo(left, top, left + radius, top);
    ctx.clip();
  }

  is3dish() {
    return true
  }
}

Component.register('scanner', Scanner);
