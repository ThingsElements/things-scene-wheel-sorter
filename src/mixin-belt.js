var {
  Component,
  ValueHolder
} = scene;

const FILL_STYLES = ['#666', '#000', '#000', '#660', '#600'] // IDLE, RUN, RUN(REVERSE), WARN, ERROR
const STROKE_STYLES = ['#000', '#0F0', '#0F0', '#FF0', '#F00'] // IDLE, RUN, RUN(REVERSE), WARN, ERROR

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

  component._roller_pattern.width = rollWidth;
  component._roller_pattern.height = height;

  var ctx = component._roller_pattern.getContext('2d')

  ctx.beginPath();
  ctx.fillStyle = color;//"#000"
  ctx.strokeStyle = stroke
  ctx.lineWidth = lineWidth

  ctx.moveTo(0, 0);
  ctx.lineTo(rollWidth, 0);
  ctx.lineTo(rollWidth, height);
  ctx.lineTo(0, height);
  ctx.lineTo(0, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = color
  ctx.strokeStyle = stroke
  ctx.lineWidth = 1;

  ctx.globalAlpha = 0.5;

  var x_for_belt = (component._step || 0) % rollWidth;
  if(component.value == 2)
    x_for_belt = rollWidth - x_for_belt;

  ctx.moveTo(x_for_belt, height * 0.95);
  ctx.lineTo(x_for_belt, height * 0.05);

  ctx.stroke();

  return component._roller_pattern
}

export default (superclass) => {

  var A = class extends ValueHolder(superclass) {

    animOnState() {
      if((this.value !== 1 && this.value !== 2) || this.disposed)
        return

      if(!this._step || this._step > 40000)
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
