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
    name: 'tilt',
    property: 'tilt'
  }, {
    type: 'number',
    label: 'Wheel Size',
    name: 'wheelSize',
    property: 'wheelSize'
  }, {
    type: 'number',
    label: 'value',
    name: 'value',
    property: 'value'
  }, {
    type: 'checkbox',
    label: 'Animated',
    name: 'animated',
    property: 'animated'
  }]
}

export default class WheelSorter extends MixinWheelSorter(RectPath(Shape)) {

  get nature() {
    return NATURE
  }

  _draw(ctx) {

    var {
      width, height, left, top, animated
    } = this.model;

    animated && this.animOnState();

    ctx.beginPath();
    ctx.rect(left, top, width, height);
  }

  is3dish() {
    return true
  }
}

Component.register('wheel-sorter', WheelSorter);
