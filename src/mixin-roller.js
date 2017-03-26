var {
  Component,
  ValueHolder
} = scene;

const STANDARD_WIDTH = 50
const STANDARD_HEIGHT = 300
const PATTERN_RATIO = STANDARD_WIDTH / STANDARD_HEIGHT

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

  width = height * PATTERN_RATIO

  if(!component._roller_pattern)
    component._roller_pattern = document.createElement('canvas');

  component._roller_pattern.width = width + 2;
  component._roller_pattern.height = height;

  var ctx = component._roller_pattern.getContext('2d')

  ctx.beginPath();
  ctx.fillStyle = color
  ctx.strokeStyle = stroke
  ctx.lineWidth = lineWidth

  ctx.ellipse(width / 2, height - width / 4 - lineWidth, width / 2, width / 4, 0, 0, 2 * Math.PI);

  ctx.moveTo(0, height - width / 4);
  ctx.lineTo(0, width / 4);

  ctx.ellipse(width / 2, width / 4 + lineWidth, width / 2, width / 4, 0, Math.PI, 0);

  ctx.lineTo(width, height - width / 4);
  ctx.fill();
  ctx.stroke();

  return component._roller_pattern
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
