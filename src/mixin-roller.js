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

  const STANDARD_WIDTH = 50
  const STANDARD_HEIGHT = 300
  const PATTERN_RATIO = STANDARD_WIDTH / STANDARD_HEIGHT

  width = height * PATTERN_RATIO

  var left, top, width, height;
  left = top = 0;
  // width = 50;
  // height = 300;

  if(!component._offcanvas)
    component._offcanvas = document.createElement('canvas');

  component._offcanvas.width = width + 2;
  component._offcanvas.height = height;

  var ctx = component._offcanvas.getContext('2d')

  ctx.beginPath();
  ctx.fillStyle = fillStyle
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth

  ctx.ellipse(left + width / 2, top + height - width / 4 - lineWidth, width / 2, width / 4, 0, 0, 2 * Math.PI);

  ctx.moveTo(left, top + height - width / 4);
  ctx.lineTo(left, top + width / 4);

  ctx.ellipse(left + width / 2, top + width / 4 + lineWidth, width / 2, width / 4, 0, Math.PI, 0);

  ctx.lineTo(left + width, top + height - width / 4);
  ctx.fill();
  ctx.stroke();

  // var i, xPos, yPos, pi = Math.PI, twoPi = 2 * pi;
  //
  // ctx.beginPath();
  //
  // for (i = pi; i < twoPi; i += 0.001) {
  //   xPos = (left + width / 2) - (width / 2 * Math.cos(i));
  //   yPos = (top + height / 14) + (height / 14 * Math.sin(i));
  //
  //   if ( i === 0 )
  //     ctx.moveTo(xPos, yPos);
  //   else
  //     ctx.lineTo(xPos, yPos);
  // }
  // ctx.moveTo(left, top + height / 14);
  // ctx.lineTo(left, top + height - height / 14);
  //
  // for (i = 0; i < twoPi; i += 0.001) {
  //   xPos = (left + width / 2) - (width / 2 * Math.cos(i));
  //   yPos = (top + height - height / 14) + (height / 14 * Math.sin(i));
  //
  //   if ( i === 0 )
  //     ctx.moveTo(xPos, yPos);
  //   else
  //     ctx.lineTo(xPos, yPos);
  // }
  // ctx.moveTo(left + width, top + height / 14);
  // ctx.lineTo(left + width, top + height - height / 14);
  //
  // ctx.stroke();
}

export default (superclass) => {
  var A = class extends superclass {

    get fillStyle() {
      _drawPatternImageToOffcanvas(this);
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
