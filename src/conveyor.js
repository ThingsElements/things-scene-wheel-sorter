var {
  Component,
  Polyline,
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

export default class Conveyor extends Polyline {

  get nature() {
    return NATURE
  }

  onchange(after, before) {
  }

  _draw(context) {
    super._draw(context);

    if(this._willDraw) {
      this._drawConveyor(context)
    }
  }

  _drawConveyor(context) {
    // TODO: 1. 외곽선의 좌표를 계산하고, 윤각선을 그린다.
    // TODO: 2. 색을 채운다.
    // TODO: 3. 꼭지점 부분을 자연스럽게.

    var path = this.path

    // for (var i = 0; i < path.length -2 ; i++) {
    //   var currPoint = path[i];
    //   var nextPoint = path[i+1];
    //
    //   var distOfX = currPoint.x - nextPoint.x
    //   var distOfY = currPoint.y - nextPoint.y
    //
    //   var distance = Math.sqrt(Math.pow(distOfX, 2) + Math.pow(distOfY, 2))
    //
    //   context.beginPath();
    //
    //
    //   var width = distOfX > distOfY ? distance : this.model.weight
    //   var height = distOfY > distOfX ? distance : this.model.weight
    //
    //   context.fillStyle = this.model.fillStyle
    //   context.fillRect(currPoint.x, currPoint.y, width, height)
    //
    //   context.closePath();
    //
    // }

  }

  drawConveyor() {
    this._willDraw = true;
    this.invalidate();
  }
}

Component.register('conveyor', Conveyor);
