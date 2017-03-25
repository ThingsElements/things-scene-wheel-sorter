import MixinRoller from './mixin-roller'

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
    label: 'width',
    name: 'width',
    property: 'width'
  }]
}

export default class Conveyor extends MixinRoller(RectPath(Shape)) {

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

Component.register('conveyor', Conveyor);
