var {
  Component,
  RectPath
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

export default class WheelSorter extends RectPath(Component) {

  get nature() {
    return NATURE
  }

  onchange(after, before) {
  }

  _draw(ctx) {
    //super._draw(ctx)

    var {
      width, height, left, top,
      fillStyle = '#fff',
      strokeStyle = '#666',
      lineWidth = 1
    } = this.model;

    ctx.beginPath();
    ctx.rect(left, top, width, height);
    ctx.stroke();

    for(let j = 1; j < 10; j += 2){
      for(let i = 1; i < 10; i += 2){
        ctx.beginPath();
        ctx.fillStyle = fillStyle
        ctx.strokeStyle = strokeStyle
        ctx.lineWidth = lineWidth
        ctx.ellipse(left + (width / 10) * i, top + (width / 10) * j, width / 12, width / 12, 0, 0, 2 * Math.PI, 0);
        ctx.stroke();
      }
    }
  }
}

Component.register('wheel-sorter', WheelSorter);
