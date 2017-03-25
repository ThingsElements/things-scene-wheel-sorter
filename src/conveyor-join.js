import MixinRoller from './mixin-roller'

var {
  Component,
  Rect,
  Donut
} = scene;

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'number',
    label: 'startAngle',
    name: 'startAngle',
    property: 'startAngle'
  }, {
    type: 'number',
    label: 'endAngle',
    name: 'endAngle',
    property: 'endAngle'
  }, {
    type: 'number',
    label: 'ratio',
    name: 'ratio',
    property: 'ratio'
  }]
}

const RADIAN = 0.0174533 / Math.PI

// function roundSet(round, width, height){
//   var max = width > height ? (height / width) * 100 : 100
//
//   if(round >= max)
//     round = max
//   else if(round <= 0)
//     round = 0
//
//   return round
// }


export default class ConveyorJoin extends MixinRoller(Donut) {

  get nature() {
    return NATURE
  }

  onchange(after, before) {
  }

  is3dish() {
    return true
  }

  _draw(ctx) {

    //super._draw(ctx);

    var {
      ratio = 50,
      cx,
      cy,
      rx,
      ry,
      startAngle = 0,
      endAngle = Math.PI / 2
    } = this.model;

    ctx.beginPath();

    startAngle -= Math.PI / 2
    endAngle -= Math.PI / 2

    ctx.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), 0, startAngle, endAngle)

    // ctx.moveTo(cx + (rx / 100) * ratio ,cy);
    // 맨 마지막 속성이 true면 원의 범위만큼 공백이 됨

    ctx.ellipse(cx, cy, Math.abs((rx / 100) * ratio), Math.abs((ry / 100) * ratio), 0, endAngle, startAngle, true);

    ctx.lineTo(rx * Math.cos(startAngle) + cx, rx * Math.sin(startAngle) + cy)
  }
}

Component.register('conveyor-join', ConveyorJoin);
