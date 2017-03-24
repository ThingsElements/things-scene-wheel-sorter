import MixinRoller from './mixin-roller'

var {
  Component,
  Rect
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
  }, {
    type: 'number',
    label: 'columns',
    name: 'columns',
    property: 'columns'
  }]
}

function hasAnyProperty(o, ...properties) {
  for(let p in properties) {
    if(o.hasOwnProperty(properties[p]))
      return true
  }
}

export default class Conveyor extends MixinRoller(Rect) {

  get nature() {
    return NATURE
  }

  created() {
    this.set('fillStyle', this.fillStyle)
  }

  is3dish() {
    return true
  }

  onchange(after) {
    this.set('fillStyle', this.fillStyle)

    this.invalidate()
  }
}

Component.register('conveyor', Conveyor);
