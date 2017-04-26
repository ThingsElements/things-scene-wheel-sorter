var {
  Component,
  ValueHolder
} = scene;

const FILL_STYLES = ['#666', '#060', '#660', '#600'] // IDLE, RUN, WARN, ERROR
const STROKE_STYLES = ['#000', '#0F0', '#FF0', '#F00'] // IDLE, RUN, WARN, ERROR

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
  ctx.moveTo(component._step % rollWidth, height - rollWidth / 4);
  ctx.lineTo(component._step % rollWidth, rollWidth / 4);

  ctx.stroke();

  return component._roller_pattern
}

export default (superclass) => {

  var A = class extends ValueHolder(superclass) {

    animOnState() {
      if(this.value !== 1 || this.disposed)
        return

      if(!this._step)
        this._step = 0

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
