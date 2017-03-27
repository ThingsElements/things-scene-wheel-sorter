var {
  Component,
  ValueHolder
} = scene;

const FILL_STYLES = ['#666', '#060', '#660', '#600'] // IDLE, RUN, WARN, ERROR
const STROKE_STYLES = ['#000', '#0F0', '#FF0', '#F00'] // IDLE, RUN, WARN, ERROR

function pattern(component) {

  var {
    width,
    height
  } = component.bounds;

  var color = FILL_STYLES[component.value] || FILL_STYLES[0]
  var stroke = STROKE_STYLES[component.value] || STROKE_STYLES[0]
  var lineWidth = 1

  var pattern_size = Math.max(width, height);

  if(!component._scanner_pattern)
    component._scanner_pattern = document.createElement('canvas');

  component._scanner_pattern.width = pattern_size;
  component._scanner_pattern.height = pattern_size;

  var ctx = component._scanner_pattern.getContext('2d')

  ctx.beginPath();
  ctx.fillStyle = color
  ctx.rect(0, 0, pattern_size, pattern_size);
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth + 3;
  ctx.moveTo(0, 0);
  ctx.lineTo(width, height);
  ctx.moveTo(width, 0);
  ctx.lineTo(0, height);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth + 5;
  let space = ctx.lineWidth/2;
  ctx.moveTo(space, space);
  ctx.lineTo(width - space, space);
  ctx.lineTo(width - space, height - space);
  ctx.lineTo(space, height - space);
  ctx.lineTo(space, space);

  ctx.stroke();

  return component._scanner_pattern
}

export default (superclass) => {
  var A = class extends ValueHolder(superclass) {

    get fillStyle() {
      return {
        image: pattern(this),
        offsetX: 0,
        offsetY: 0,
        type: "pattern",
      }
    }
  }

  Component.memoize(A.prototype, 'fillStyle', false);

  return A
}
