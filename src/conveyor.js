/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import MixinRoller from './mixin-conveyor'

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
    label: 'conveyor-type',
    name: 'conveyorType',
    property: 'conveyorType'
  }, {
    type: 'number',
    label: 'roll-width',
    name: 'rollWidth',
    property: 'rollWidth'
  }, {
    type: 'number',
    label: 'value',
    name: 'value',
    property: 'value'
  }, {
    type: 'checkbox',
    label: 'animation',
    name: 'animated',
    property: 'animated'
  }]
}

export default class Conveyor extends MixinRoller(RectPath(Shape)) {

  get nature() {
    return NATURE
  }

  _draw(ctx) {

    var {
      width, height, left, top, animated = false
    } = this.model;

    animated && this.animOnState()

    ctx.beginPath();
    ctx.rect(left, top, width, height);
  }

  is3dish() {
    return true
  }

}

Component.register('conveyor', Conveyor);
Component.register('conveyor-belt', Conveyor);
