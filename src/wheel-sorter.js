/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import MixinWheelSorter from './mixin-wheel-sorter'

var {
  Component,
  RectPath,
  Shape
} = scene;

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'number',
    label: 'tilt',
    name: 'tilt'
  }, {
    type: 'number',
    label: 'wheel-size',
    name: 'wheelSize'
  }, {
    type: 'number',
    label: 'value',
    name: 'value'
  }, {
    type: 'checkbox',
    label: 'animation',
    name: 'animated'
  }]
}

export default class WheelSorter extends MixinWheelSorter(RectPath(Shape)) {

  get nature() {
    return NATURE
  }

  render(ctx) {
    var {
      width, height, left, top, animated
    } = this.model;

    animated && this.animOnState();

    ctx.beginPath();
    ctx.rect(left, top, width, height);

    ctx.clip(); // bound를 벗어난 영역에도 그려지는 것을 예방.
  }

  postrender(ctx) {
    super.postrender(ctx);
    this._draw_pattern(ctx)
  }

  is3dish() {
    return false
  }
}

Component.register('wheel-sorter', WheelSorter);
