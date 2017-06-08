var {
  Component,
  ValueHolder
} = scene;

const FILL_STYLES = ['#aaa', '#6599cd', '#6599cd', '#ffba00', '#e9746b'] // IDLE, RUN, RUN(REVERSE), WARN, ERROR
const STROKE_STYLES = ['#999', '#003366', '#003366', '#d96f21', '#a73928'] // IDLE, RUN, RUN(REVERSE), WARN, ERROR

function pattern(component) {

  var {
    height
  } = component.bounds;

  var {
    rollWidth = 10
  } = component.model;

  rollWidth = Math.max(rollWidth, 1)

  var color = FILL_STYLES[component.value] || FILL_STYLES[0]
  var stroke = STROKE_STYLES[component.value] || STROKE_STYLES[0]
  var lineWidth = 1

  if(!component._roller_pattern)
    component._roller_pattern = document.createElement('canvas');

  component._roller_pattern.width = rollWidth + 2;
  component._roller_pattern.height = height;

  var ctx = component._roller_pattern.getContext('2d')

  ctx.beginPath();
  ctx.fillStyle = color
  ctx.strokeStyle = stroke
  ctx.lineWidth = lineWidth

  // ctx.ellipse(rollWidth / 2, height - rollWidth / 4 - lineWidth, rollWidth / 2, rollWidth / 4, 0, 0, 2 * Math.PI);
  ctx.ellipse(rollWidth / 2, height - rollWidth / 4 - lineWidth, rollWidth / 2, rollWidth / 4, 0, 0, Math.PI);

  ctx.moveTo(0, height - rollWidth / 4);
  ctx.lineTo(0, rollWidth / 4);

  ctx.ellipse(rollWidth / 2, rollWidth / 4 + lineWidth, rollWidth / 2, rollWidth / 4, 0, Math.PI, 0);

  ctx.lineTo(rollWidth, height - rollWidth / 4);

  ctx.fill();
  ctx.stroke();

  ctx.globalAlpha = 0.2

  ctx.lineWidth = rollWidth / 3;

  var x_for_roll = component._step % rollWidth;
  if(component.value == 2)
    x_for_roll = rollWidth - x_for_roll;

  ctx.moveTo(x_for_roll, height - rollWidth / 4);
  ctx.lineTo(x_for_roll, rollWidth / 4);

  ctx.stroke();

  return component._roller_pattern
}

export default (superclass) => {

  var A = class extends ValueHolder(superclass) {

    animOnState() {
      if((this.value !== 1 && this.value !== 2) || this.disposed)
        return

      if(!this._step || this._step > 40000)
        this._step = this.value == 0

      this._step++

      var self = this

      requestAnimationFrame(function() {
        self.clearCache()
        self.invalidate()
      })
    }

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
