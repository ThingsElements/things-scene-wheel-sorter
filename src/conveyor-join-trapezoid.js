import MixinRoller from './mixin-roller'

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
    label: 'value',
    name: 'value',
    property: 'value'
  }, {
    type: 'number',
    label: 'rollWidth',
    name: 'rollWidth',
    property: 'rollWidth'
  }]
}

export default class ConveyorJoinTrapezoid extends MixinRoller(Polygon) {

  get nature() {
    return NATURE
  }

  is3dish() {
    return true
  }
}

Component.register('conveyor-join-trapezoid', ConveyorJoinTrapezoid);
