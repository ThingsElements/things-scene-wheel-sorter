/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import MixinRoller from './mixin-conveyor'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'select',
    label: 'conveyor-type',
    name: 'conveyorType',
    property: {
      options: [{
        display: 'Roller',
        value: 0
      }, {
        display: 'Belt',
        value: 1
      }]
    }
  }, {
    type: 'number',
    label: 'roll-width',
    name: 'rollWidth'
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

import { Component, RectPath, Shape } from '@hatiolab/things-scene';

export default class Conveyor extends MixinRoller(RectPath(Shape)) {

  get nature() {
    return NATURE
  }

  render(ctx) {

    var {
      width, height, left, top, animated = false
    } = this.model;

    animated && this.animOnState()

    ctx.beginPath();
    ctx.rect(left, top, width, height);
  }

  is3dish() {
    return false
  }

}

Component.register('conveyor', Conveyor);
Component.register('conveyor-belt', Conveyor);
