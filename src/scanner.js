import MixinScanner from './mixin-scanner'

var {
  Component,
  RectPath,
  Shape
} = scene;

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'string',
    label: 'Camera Ready',
    name: 'camera_ready',
    property: 'camera_ready'
  }, {
    type: 'string',
    label: 'Camera Top Error',
    name: 'camera_top_error',
    property: 'camera_top_error'
  }, {
    type: 'string',
    label: 'Camera Left Error',
    name: 'camera_left_error',
    property: 'camera_left_error'
  }, {
    type: 'string',
    label: 'Camera Right Error',
    name: 'camera_right_error',
    property: 'camera_right_error'
  }, {
    type: 'string',
    label: 'ITS COMM State',
    name: 'its_comm_state',
    property: 'its_comm_state'
  }]
}

const STAT_IDLE = 0;
const STAT_RUN = 1;
const STAT_CHUTE_FULL = 2;
const STAT_ERROR = 3;

export default class Scanner extends MixinScanner(RectPath(Shape)) {

  get nature() {
    return NATURE
  }

  _draw(ctx) {

    var {
      width, height, left, top,
    } = this.model;

    ctx.beginPath();
    ctx.rect(left, top, width, height);
  }

  get value() {
    let {
      camera_ready,
      camera_top_error,
      camera_left_error,
      camera_right_error,
      its_comm_state,
    } = this.model;

    if((camera_ready && camera_ready == 'ER')
    || (camera_top_error && camera_top_error == 'ER')
    || (camera_left_error && camera_left_error == 'ER')
    || (camera_right_error && camera_right_error == 'ER')
    || (its_comm_state && its_comm_state == 'ER')
    )
      return STAT_ERROR

    return STAT_RUN
  }

  onchange(after, before) {
    if(after.hasOwnProperty('data')) {
      let {
        camera_ready = this.get('camera_ready'),
        camera_top_error = this.get('camera_top_error'),
        camera_left_error = this.get('camera_left_error'),
        camera_right_error = this.get('camera_right_error'),
        its_comm_state = this.get('its_comm_state')
      } = after.data;

      this.set({
        camera_ready,
        camera_top_error,
        camera_left_error,
        camera_right_error,
        its_comm_state,
      })
    }
  }

  is3dish() {
    return true
  }
}

Component.register('scanner', Scanner);
