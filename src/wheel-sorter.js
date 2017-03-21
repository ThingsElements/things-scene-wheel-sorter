var {
  Component
} = scene;

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'number',
    label: 'rows',
    name: 'rows',
    property: 'rows'
  }, {
    type: 'number',
    label: 'columns',
    name: 'columns',
    property: 'columns'
  }]
}

function hasAnyProperty(o, ...properties) {
  for(let p in properties) {
    if(o.hasOwnProperty(properties[p]))
      return true
  }
}

export default class WheelSorter extends Component {

  get nature() {
    return NATURE
  }

  onchange(after, before) {
  }

  _draw(context) {
    super._draw(context)
  }
}

Component.register('wheel-sorter', WheelSorter);
