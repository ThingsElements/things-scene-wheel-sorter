import MixinRoller from './mixin-roller'

var {
  Component,
  Polygon
} = scene;

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'number',
    label: 'rollWidth',
    name: 'rollWidth',
    property: 'rollWidth'
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
  }]
}

const STAT_IDLE = 0;
const STAT_RUN = 1;
const STAT_CHUTE_FULL = 3;
const STAT_ERROR = 4;

export default class ConveyorJoinTrapezoid extends MixinRoller(Polygon) {

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

  is3dish() {
    return true
  }

  _draw(context) {
    // this.animOnState()
    super._draw(context)
  }
}

Component.register('conveyor-join-trapezoid', ConveyorJoinTrapezoid);
