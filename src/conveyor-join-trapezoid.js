/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import MixinRoller from './mixin-conveyor'

var {
  Component,
  Polygon
} = scene;

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'number',
    label: 'Conveyor Type',
    name: 'conveyorType',
    property: 'conveyorType'
  }, {
    type: 'number',
    label: 'rollWidth',
    name: 'rollWidth',
    property: 'rollWidth'
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

const STAT_IDLE = 0;
const STAT_RUN = 1;
const STAT_CHUTE_FULL = 3;
const STAT_ERROR = 4;

export default class ConveyorJoinTrapezoid extends MixinRoller(Polygon) {

  get nature() {
    return NATURE
  }

  is3dish() {
    return true
  }

  _draw(context) {
    this.get('animated') && this.animOnState()
    super._draw(context)
  }
}

Component.register('conveyor-join-trapezoid', ConveyorJoinTrapezoid);
