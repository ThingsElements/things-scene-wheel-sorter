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
  }, {
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

var controlHandler = {

  ondragmove: function(point, index, component) {
    var { cx, rx } = component.model

    var transcoorded = component.transcoordP2S(point.x, point.y)

    var ratio = (transcoorded.x - cx) / rx * 100

    ratio = ratio >= 100 || ratio <= -100 ? 100 : Math.abs(ratio)

    component.set({ ratio })
  }
}

var antiClockWiseControlHandler = {
  ondragmove: function(point, index, component) {
    var { cy, rx } = component.model;

    var transcoorded = component.transcoordP2S(point.x, point.y);

    var startAngle = (transcoorded.y - (cy - rx)) / (2 * rx) * (-Math.PI);

    if(startAngle <= -Math.PI)
      startAngle = -Math.PI;
    else if(startAngle >= 0)
      startAngle = 0;

    component.set({ startAngle });
  }
}

var clockwiseControlHandler = {
  ondragmove: function(point, index, component) {
    var { cy, rx } = component.model;

    var transcoorded = component.transcoordP2S(point.x, point.y);

    var endAngle = (transcoorded.y - (cy - rx)) / (2 * rx) * Math.PI;

    if(endAngle < 0)
      endAngle = 0;
    else if(endAngle > Math.PI)
      endAngle = Math.PI;

    component.set({ endAngle });
  }
}


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

  get controls() {

    var { cx, cy, rx, ratio, startAngle, endAngle } = this.model;

    var controls = [];

    // controls.push({
    //   x: cx - rx,
    //   y: cy - rx + 2 * (rx / Math.PI) * (-startAngle),
    //   handler: antiClockWiseControlHandler
    // });

    controls.push({
      // x: cx + (2 * cy - rx - rx * ratio / 100) / 2 * Math.sin(startAngle),
      x: cx + (rx + rx * ratio / 100) / 2 * Math.sin(startAngle),
      // y: cy - (2 * cy - rx - rx * ratio / 100) / 2 * Math.cos(startAngle),
      y: cy - (rx + rx * ratio / 100) / 2 * Math.cos(startAngle),
      handler: antiClockWiseControlHandler
    });

    controls.push({
      // x: cx + rx,
      x: cx + (rx + rx * ratio / 100) / 2 * Math.sin(endAngle),
      // y: cy - rx + 2 * (rx / Math.PI) * endAngle,
      y: cy - (rx + rx * ratio / 100) / 2 * Math.cos(endAngle),
      handler: clockwiseControlHandler
    });

    controls.push({
      x: cx + (rx / 100) * ratio,
      y: cy,
      handler: controlHandler
    });

    return controls
  }
}

Component.register('conveyor-join', ConveyorJoin);
