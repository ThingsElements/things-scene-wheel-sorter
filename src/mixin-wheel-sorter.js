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

  var {
    tilt = 0
  } = component.model;

  var color = FILL_STYLES[component.value] || FILL_STYLES[0]
  var stroke = STROKE_STYLES[component.value] || STROKE_STYLES[0]
  var lineWidth = 1

  var pattern_size = Math.min(width / 5, height / 5);

  if(!component._sorter_pattern)
    component._sorter_pattern = document.createElement('canvas');

  component._sorter_pattern.width = pattern_size;
  component._sorter_pattern.height = pattern_size;

  var ctx = component._sorter_pattern.getContext('2d')

  ctx.beginPath();
  ctx.fillStyle = color
  ctx.rect(0, 0, pattern_size, pattern_size);
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = stroke
  ctx.lineWidth = lineWidth
  ctx.ellipse(pattern_size / 2, pattern_size / 2, pattern_size / 3, pattern_size / 3, 0, 0, 2 * Math.PI, 0);

  ctx.translate(pattern_size / 2, pattern_size / 2);
  ctx.rotate(tilt);
  ctx.translate(-pattern_size / 2, -pattern_size / 2);

  ctx.moveTo(pattern_size / 3, pattern_size / 3);
  ctx.lineTo(pattern_size / 3, pattern_size / 3 * 2);
  ctx.moveTo(pattern_size / 3 * 2, pattern_size / 3);
  ctx.lineTo(pattern_size / 3 * 2, pattern_size / 3 * 2);

  ctx.stroke();

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  return component._sorter_pattern
}

export default (superclass) => {
  var A = class extends ValueHolder(superclass) {

    animOnState() {
      if(this.value !== 1 || this.disposed)
        return

      var self = this
      var tilt = this.get('tilt') || 0
      var alpha = Math.floor(Math.random() * 100)
      if(alpha < 2)
        alpha = 4
      else if(alpha < 4)
        alpha = 3
      else if(alpha > 97)
        alpha = 2
      else if(alpha > 95)
        alpha = 1
      else
        alpha = 0

      requestAnimationFrame(function() {
        if(alpha)
          self.set('tilt', (tilt + alpha) % 3 - 1)
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
