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
  properties : [{
    type: 'number',
    label: 'rows',
    name: 'rows',
    property: 'rows'
  }]
}

export default class WheelSorter extends MixinWheelSorter(RectPath(Shape)) {

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

Component.register('wheel-sorter', WheelSorter);
