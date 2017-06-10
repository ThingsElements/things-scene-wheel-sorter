import MixinWheelSorter from './mixin-wheel-sorter'

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
    type: 'number',
    label: 'tilt',
    name: 'tilt',
    property: 'tilt'
  }, {
    type: 'string',
    label: 'Chute Full',
    name: 'chute_full',
    property: 'chute_full'
  }, {
    type: 'string',
    label: 'Equip. Use.',
    name: 'equip_use_yn',
    property: 'equip_use_yn'
  }, {
    type: 'string',
    label: 'Error Code',
    name: 'error_code',
    property: 'error_code'
  }, {
    type: 'checkbox',
    label: 'Animated',
    name: 'animated',
    property: 'animated'
  }]
}

const STAT_IDLE = 0;
const STAT_RUN = 1;
const STAT_CHUTE_FULL = 2;
const STAT_ERROR = 3;

export default class CJSMSWheelSorter extends MixinWheelSorter(RectPath(Shape)) {

  get nature() {
    return NATURE
  }

  get value() {
    let {
      chute_full,
      equip_use_yn,
      error_code
    } = this.model;

    if(error_code && error_code !== '0000')
      return STAT_ERROR
    if(chute_full == 'Y')
      return STAT_CHUTE_FULL
    if(equip_use_yn == 'Y')
      return STAT_RUN

    return STAT_IDLE
  }

  onchange(after, before) {
    if(after.hasOwnProperty('data')) {
      let {
        chute_full = this.get('chute_full'),
        equip_use_yn = this.get('equip_use_yn'),
        error_code = this.get('error_code')
      } = after.data;

      this.set({
        chute_full,
        equip_use_yn,
        error_code
      })
    }
  }
  
  _draw(ctx) {

    var {
      width, height, left, top, animated
    } = this.model;

    animated && this.animOnState();

    ctx.beginPath();
    ctx.rect(left, top, width, height);
  }

  is3dish() {
    return true
  }
}

Component.register('cjsms-wheel-sorter', CJSMSWheelSorter);
