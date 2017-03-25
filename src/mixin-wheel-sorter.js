var {
  Component
} = scene;

function _drawPatternImageToOffcanvas(component) {

  var {
    width,
    height,
    fillStyle = '#fff',
    strokeStyle = '#666',
    lineWidth = 1
  } = component.bounds;

  var {
    color = 'black'
  } = component.model;

  if(!component._offcanvas)
    component._offcanvas = document.createElement('canvas');

  var radius = Math.min(width / 5, height / 5);

  component._offcanvas.width = radius;
  component._offcanvas.height = radius;

  var ctx = component._offcanvas.getContext('2d')

  ctx.beginPath();
  ctx.fillStyle = fillStyle
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  ctx.ellipse(radius / 2, radius / 2, radius / 3, radius / 3, 0, 0, 2 * Math.PI, 0);
  ctx.stroke();
}

export default (superclass) => {
  var A = class extends superclass {

    get fillStyle() {
      _drawPatternImageToOffcanvas(this);
      this._pattern_image = this._offcanvas;
      return {
        image: this._offcanvas.toDataURL(),
        offsetX: 0,
        offsetY: 0,
        type: "pattern",
      }
    }
  }

  Component.memoize(A.prototype, 'fillStyle', false);

  return A
}
