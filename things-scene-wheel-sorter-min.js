(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{return get(parent,property,receiver)}}else if("value"in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}};var _mixinConveyor=require("./mixin-conveyor");var _mixinConveyor2=_interopRequireDefault(_mixinConveyor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,Polygon=_scene.Polygon;var NATURE={mutable:false,resizable:true,rotatable:true,properties:[{type:"number",label:"Conveyor Type",name:"conveyorType",property:"conveyorType"},{type:"number",label:"rollWidth",name:"rollWidth",property:"rollWidth"},{type:"number",label:"value",name:"value",property:"value"},{type:"checkbox",label:"Animated",name:"animated",property:"animated"}]};var STAT_IDLE=0;var STAT_RUN=1;var STAT_CHUTE_FULL=3;var STAT_ERROR=4;var ConveyorJoinTrapezoid=function(_MixinRoller){_inherits(ConveyorJoinTrapezoid,_MixinRoller);function ConveyorJoinTrapezoid(){_classCallCheck(this,ConveyorJoinTrapezoid);return _possibleConstructorReturn(this,(ConveyorJoinTrapezoid.__proto__||Object.getPrototypeOf(ConveyorJoinTrapezoid)).apply(this,arguments))}_createClass(ConveyorJoinTrapezoid,[{key:"is3dish",value:function is3dish(){return true}},{key:"_draw",value:function _draw(context){this.get("animated")&&this.animOnState();_get(ConveyorJoinTrapezoid.prototype.__proto__||Object.getPrototypeOf(ConveyorJoinTrapezoid.prototype),"_draw",this).call(this,context)}},{key:"nature",get:function get(){return NATURE}}]);return ConveyorJoinTrapezoid}((0,_mixinConveyor2.default)(Polygon));exports.default=ConveyorJoinTrapezoid;Component.register("conveyor-join-trapezoid",ConveyorJoinTrapezoid)},{"./mixin-conveyor":5}],2:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _mixinConveyor=require("./mixin-conveyor");var _mixinConveyor2=_interopRequireDefault(_mixinConveyor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,Rect=_scene.Rect,Donut=_scene.Donut;var NATURE={mutable:false,resizable:true,rotatable:true,properties:[{type:"number",label:"Conveyor Type",name:"conveyorType",property:"conveyorType"},{type:"angle",label:"startAngle",name:"startAngle",property:"startAngle"},{type:"angle",label:"endAngle",name:"endAngle",property:"endAngle"},{type:"number",label:"ratio",name:"ratio",property:"ratio"},{type:"number",label:"rollWidth",name:"rollWidth",property:"rollWidth"},{type:"number",label:"value",name:"value",property:"value"},{type:"checkbox",label:"Animated",name:"animated",property:"animated"}]};var RADIAN=.0174533/Math.PI;var controlHandler={ondragmove:function ondragmove(point,index,component){var _component$model=component.model,cx=_component$model.cx,rx=_component$model.rx;var transcoorded=component.transcoordP2S(point.x,point.y);var ratio=(transcoorded.x-cx)/rx*100;ratio=ratio>=100||ratio<=-100?100:Math.abs(ratio);component.set({ratio:ratio})}};var antiClockWiseControlHandler={ondragmove:function ondragmove(point,index,component){var _component$model2=component.model,cx=_component$model2.cx,cy=_component$model2.cy;var transcoorded=component.transcoordP2S(point.x,point.y);var theta=Math.atan2(-(transcoorded.y-cy),transcoorded.x-cx);if(theta>0)if(theta<=Math.PI/2)theta=Math.PI/2;if(theta<0)if(theta>=-Math.PI/2)theta=-Math.PI/2;var startAngle=-theta+Math.PI/2;component.set({startAngle:startAngle})}};var clockwiseControlHandler={ondragmove:function ondragmove(point,index,component){var _component$model3=component.model,cx=_component$model3.cx,cy=_component$model3.cy;var transcoorded=component.transcoordP2S(point.x,point.y);var theta=Math.atan2(-(transcoorded.y-cy),transcoorded.x-cx);if(theta>0)if(theta>=Math.PI/2)theta=Math.PI/2;if(theta<0)if(theta<=-Math.PI/2)theta=-Math.PI/2;var endAngle=-theta+Math.PI/2;component.set({endAngle:endAngle})}};var ConveyorJoin=function(_MixinRoller){_inherits(ConveyorJoin,_MixinRoller);function ConveyorJoin(){_classCallCheck(this,ConveyorJoin);return _possibleConstructorReturn(this,(ConveyorJoin.__proto__||Object.getPrototypeOf(ConveyorJoin)).apply(this,arguments))}_createClass(ConveyorJoin,[{key:"is3dish",value:function is3dish(){return true}},{key:"_draw",value:function _draw(ctx){var _model=this.model,_model$ratio=_model.ratio,ratio=_model$ratio===undefined?50:_model$ratio,cx=_model.cx,cy=_model.cy,rx=_model.rx,ry=_model.ry,_model$startAngle=_model.startAngle,startAngle=_model$startAngle===undefined?0:_model$startAngle,_model$endAngle=_model.endAngle,endAngle=_model$endAngle===undefined?Math.PI/2:_model$endAngle,_model$animated=_model.animated,animated=_model$animated===undefined?false:_model$animated;animated&&this.animOnState();ctx.beginPath();startAngle-=Math.PI/2;endAngle-=Math.PI/2;ctx.ellipse(cx,cy,Math.abs(rx),Math.abs(ry),0,startAngle,endAngle);ctx.ellipse(cx,cy,Math.abs(rx/100*ratio),Math.abs(ry/100*ratio),0,endAngle,startAngle,true);ctx.lineTo(rx*Math.cos(startAngle)+cx,rx*Math.sin(startAngle)+cy)}},{key:"nature",get:function get(){return NATURE}},{key:"controls",get:function get(){var _model2=this.model,cx=_model2.cx,cy=_model2.cy,rx=_model2.rx,ratio=_model2.ratio,startAngle=_model2.startAngle,endAngle=_model2.endAngle;var controls=[];controls.push({x:cx+(rx+rx*ratio/100)/2*Math.sin(startAngle),y:cy-(rx+rx*ratio/100)/2*Math.cos(startAngle),handler:antiClockWiseControlHandler});controls.push({x:cx+(rx+rx*ratio/100)/2*Math.sin(endAngle),y:cy-(rx+rx*ratio/100)/2*Math.cos(endAngle),handler:clockwiseControlHandler});controls.push({x:cx+rx/100*ratio,y:cy,handler:controlHandler});return controls}}]);return ConveyorJoin}((0,_mixinConveyor2.default)(Donut));exports.default=ConveyorJoin;Component.register("conveyor-join",ConveyorJoin)},{"./mixin-conveyor":5}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _mixinConveyor=require("./mixin-conveyor");var _mixinConveyor2=_interopRequireDefault(_mixinConveyor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,RectPath=_scene.RectPath,Shape=_scene.Shape;var NATURE={mutable:false,resizable:true,rotatable:true,properties:[{type:"number",label:"Conveyor Type",name:"conveyorType",property:"conveyorType"},{type:"number",label:"Roll Width",name:"rollWidth",property:"rollWidth"},{type:"number",label:"value",name:"value",property:"value"},{type:"checkbox",label:"Animated",name:"animated",property:"animated"}]};var Conveyor=function(_MixinRoller){_inherits(Conveyor,_MixinRoller);function Conveyor(){_classCallCheck(this,Conveyor);return _possibleConstructorReturn(this,(Conveyor.__proto__||Object.getPrototypeOf(Conveyor)).apply(this,arguments))}_createClass(Conveyor,[{key:"_draw",value:function _draw(ctx){var _model=this.model,width=_model.width,height=_model.height,left=_model.left,top=_model.top,_model$animated=_model.animated,animated=_model$animated===undefined?false:_model$animated;animated&&this.animOnState();ctx.beginPath();ctx.rect(left,top,width,height)}},{key:"is3dish",value:function is3dish(){return true}},{key:"nature",get:function get(){return NATURE}}]);return Conveyor}((0,_mixinConveyor2.default)(RectPath(Shape)));exports.default=Conveyor;Component.register("conveyor",Conveyor);Component.register("conveyor-belt",Conveyor)},{"./mixin-conveyor":5}],4:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _conveyor=require("./conveyor");Object.defineProperty(exports,"Conveyor",{enumerable:true,get:function get(){return _interopRequireDefault(_conveyor).default}});var _conveyorJoin=require("./conveyor-join");Object.defineProperty(exports,"ConveyorJoin",{enumerable:true,get:function get(){return _interopRequireDefault(_conveyorJoin).default}});var _conveyorJoinTrapezoid=require("./conveyor-join-trapezoid");Object.defineProperty(exports,"ConveyorJoinTrapezoid",{enumerable:true,get:function get(){return _interopRequireDefault(_conveyorJoinTrapezoid).default}});var _wheelSorter=require("./wheel-sorter");Object.defineProperty(exports,"WheelSorter",{enumerable:true,get:function get(){return _interopRequireDefault(_wheelSorter).default}});var _scanner=require("./scanner");Object.defineProperty(exports,"Scanner",{enumerable:true,get:function get(){return _interopRequireDefault(_scanner).default}});function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}},{"./conveyor":3,"./conveyor-join":2,"./conveyor-join-trapezoid":1,"./scanner":8,"./wheel-sorter":9}],5:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,ValueHolder=_scene.ValueHolder;var TYPE_ROLLER=0;var TYPE_BELT=1;var FILL_STYLES=["#aaa","#6599cd","#6599cd","#ffba00","#e9746b"];var STROKE_STYLES=["#999","#003366","#003366","#d96f21","#a73928"];function pattern_for_belt_type(component){var height=component.bounds.height;var _component$model=component.model,_component$model$roll=_component$model.rollWidth,rollWidth=_component$model$roll===undefined?10:_component$model$roll,_component$model$conv=_component$model.conveyorType,conveyorType=_component$model$conv===undefined?TYPE_ROLLER:_component$model$conv;var width=Math.max(rollWidth,1);var color=FILL_STYLES[component.value]||FILL_STYLES[0];var stroke=STROKE_STYLES[component.value]||STROKE_STYLES[0];var lineWidth=1;if(!component._roller_pattern)component._roller_pattern=document.createElement("canvas");component._roller_pattern.width=width;component._roller_pattern.height=height;var context=component._roller_pattern.getContext("2d");context.beginPath();context.fillStyle=color;context.strokeStyle=stroke;context.lineWidth=lineWidth;context.moveTo(0,0);context.lineTo(width,0);context.lineTo(width,height);context.lineTo(0,height);context.lineTo(0,0);context.fill();context.beginPath();context.globalAlpha=.2;var x_for_belt=(component._step||0)%width;if(component.value==2)x_for_belt=width-x_for_belt;context.moveTo(x_for_belt,height);context.lineTo(x_for_belt,0);context.stroke();return component._roller_pattern}function pattern_for_roller_type(component){var height=component.bounds.height;var _component$model2=component.model,_component$model2$rol=_component$model2.rollWidth,rollWidth=_component$model2$rol===undefined?10:_component$model2$rol,_component$model2$con=_component$model2.conveyorType,conveyorType=_component$model2$con===undefined?TYPE_ROLLER:_component$model2$con;var width=Math.max(rollWidth,1);var color=FILL_STYLES[component.value]||FILL_STYLES[0];var stroke=STROKE_STYLES[component.value]||STROKE_STYLES[0];var lineWidth=1;if(!component._roller_pattern)component._roller_pattern=document.createElement("canvas");component._roller_pattern.width=width+2;component._roller_pattern.height=height;var context=component._roller_pattern.getContext("2d");context.beginPath();context.fillStyle=color;context.strokeStyle=stroke;context.lineWidth=lineWidth;context.ellipse(width/2,height-width/4-lineWidth,width/2,width/4,0,0,Math.PI);context.moveTo(0,height-width/4);context.lineTo(0,width/4);context.ellipse(width/2,width/4+lineWidth,width/2,width/4,0,Math.PI,0);context.lineTo(width,height-width/4);context.fill();context.stroke();context.globalAlpha=.2;context.lineWidth=width/3;var x_for_roll=component._step%width;if(component.value==2)x_for_roll=width-x_for_roll;context.moveTo(x_for_roll,height-width/4);context.lineTo(x_for_roll,width/4);context.stroke();return component._roller_pattern}var patterns=[pattern_for_roller_type,pattern_for_belt_type];exports.default=function(superclass){var A=function(_ValueHolder){_inherits(A,_ValueHolder);function A(){_classCallCheck(this,A);return _possibleConstructorReturn(this,(A.__proto__||Object.getPrototypeOf(A)).apply(this,arguments))}_createClass(A,[{key:"animOnState",value:function animOnState(){if(this.value!==1&&this.value!==2||this.disposed)return;if(!this._step||this._step>4e4)this._step=this.value==0;this._step++;var self=this;requestAnimationFrame(function(){self.clearCache("fillStyle");self.invalidate()})}},{key:"conveyorType",get:function get(){var conveyorType=this.get("conveyorType");if(conveyorType!=TYPE_BELT&&conveyorType!=TYPE_ROLLER)conveyorType=TYPE_ROLLER;return conveyorType}},{key:"fillStyle",get:function get(){return{image:patterns[this.conveyorType](this),offsetX:0,offsetY:0,type:"pattern"}}}]);return A}(ValueHolder(superclass));Component.memoize(A.prototype,"fillStyle",false);Component.memoize(A.prototype,"conveyorType",false);return A}},{}],6:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,ValueHolder=_scene.ValueHolder;var FILL_STYLES=["#aaa","#6599cd","#ffba00","#e9746b"];var STROKE_STYLES=["#999","#003366","#d96f21","#a73928"];function pattern(component){var _component$bounds=component.bounds,width=_component$bounds.width,height=_component$bounds.height;var color=FILL_STYLES[component.value]||FILL_STYLES[0];var stroke=STROKE_STYLES[component.value]||STROKE_STYLES[0];var lineWidth=1;var pattern_size=Math.max(width,height);if(!component._scanner_pattern)component._scanner_pattern=document.createElement("canvas");component._scanner_pattern.width=pattern_size;component._scanner_pattern.height=pattern_size;var ctx=component._scanner_pattern.getContext("2d");ctx.globalAlpha=.5;ctx.beginPath();ctx.fillStyle=color;ctx.rect(0,0,pattern_size,pattern_size);ctx.fill();ctx.globalAlpha=.8;ctx.beginPath();ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth+3;ctx.moveTo(0,0);ctx.lineTo(width,height);ctx.moveTo(width,0);ctx.lineTo(0,height);ctx.stroke();ctx.beginPath();ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth+5;var space=ctx.lineWidth/2;ctx.moveTo(space,space);ctx.lineTo(width-space,space);ctx.lineTo(width-space,height-space);ctx.lineTo(space,height-space);ctx.lineTo(space,space);ctx.stroke();return component._scanner_pattern}exports.default=function(superclass){var A=function(_ValueHolder){_inherits(A,_ValueHolder);function A(){_classCallCheck(this,A);return _possibleConstructorReturn(this,(A.__proto__||Object.getPrototypeOf(A)).apply(this,arguments))}_createClass(A,[{key:"fillStyle",get:function get(){return{image:pattern(this),offsetX:0,offsetY:0,type:"pattern"}}}]);return A}(ValueHolder(superclass));Component.memoize(A.prototype,"fillStyle",false);return A}},{}],7:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,ValueHolder=_scene.ValueHolder;var FILL_STYLES=["#aaa","#6599cd","#ffba00","#e9746b"];var STROKE_STYLES=["#999","#003366","#d96f21","#a73928"];function pattern(component){var _component$bounds=component.bounds,width=_component$bounds.width,height=_component$bounds.height;var _component$model=component.model,_component$model$tilt=_component$model.tilt,tilt=_component$model$tilt===undefined?0:_component$model$tilt,_component$model$whee=_component$model.wheelSize,wheelSize=_component$model$whee===undefined?3:_component$model$whee;tilt+=component.delta("tilt")||0;tilt%=3;tilt-=1;var color=FILL_STYLES[component.value]||FILL_STYLES[0];var stroke=STROKE_STYLES[component.value]||STROKE_STYLES[0];var lineWidth=1;var pattern_size=wheelSize*10||Math.min(width/5,height/5);if(!component._sorter_pattern)component._sorter_pattern=document.createElement("canvas");component._sorter_pattern.width=pattern_size;component._sorter_pattern.height=pattern_size;var ctx=component._sorter_pattern.getContext("2d");ctx.beginPath();ctx.fillStyle=color;ctx.rect(0,0,pattern_size,pattern_size);ctx.fill();ctx.beginPath();ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth;ctx.ellipse(pattern_size/2,pattern_size/2,pattern_size/3,pattern_size/3,0,0,2*Math.PI,0);ctx.translate(pattern_size/2,pattern_size/2);ctx.rotate(tilt);ctx.translate(-pattern_size/2,-pattern_size/2);ctx.moveTo(pattern_size/3,pattern_size/3);ctx.lineTo(pattern_size/3,pattern_size/3*2);ctx.moveTo(pattern_size/3*2,pattern_size/3);ctx.lineTo(pattern_size/3*2,pattern_size/3*2);ctx.stroke();ctx.setTransform(1,0,0,1,0,0);return component._sorter_pattern}exports.default=function(superclass){var A=function(_ValueHolder){_inherits(A,_ValueHolder);function A(){_classCallCheck(this,A);return _possibleConstructorReturn(this,(A.__proto__||Object.getPrototypeOf(A)).apply(this,arguments))}_createClass(A,[{key:"animOnState",value:function animOnState(){if(this.value!==1||this.disposed)return;var self=this;var alpha=Math.floor(Math.random()*100);if(alpha<10)alpha=2;else if(alpha>90)alpha=1;else alpha=0;requestAnimationFrame(function(){self.delta("tilt",alpha);self.clearCache("fillStyle");self.invalidate()})}},{key:"fillStyle",get:function get(){return{image:pattern(this),offsetX:0,offsetY:0,type:"pattern"}}}]);return A}(ValueHolder(superclass));Component.memoize(A.prototype,"fillStyle",false);return A}},{}],8:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _mixinScanner=require("./mixin-scanner");var _mixinScanner2=_interopRequireDefault(_mixinScanner);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,RectPath=_scene.RectPath,Shape=_scene.Shape;var NATURE={mutable:false,resizable:true,rotatable:true,properties:[{type:"number",label:"value",name:"value",property:"value"}]};var STAT_IDLE=0;var STAT_RUN=1;var STAT_CHUTE_FULL=2;var STAT_ERROR=3;var Scanner=function(_MixinScanner){_inherits(Scanner,_MixinScanner);function Scanner(){_classCallCheck(this,Scanner);return _possibleConstructorReturn(this,(Scanner.__proto__||Object.getPrototypeOf(Scanner)).apply(this,arguments))}_createClass(Scanner,[{key:"_draw",value:function _draw(ctx){var _model=this.model,width=_model.width,height=_model.height,left=_model.left,top=_model.top;ctx.beginPath();ctx.rect(left,top,width,height)}},{key:"is3dish",value:function is3dish(){return true}},{key:"nature",get:function get(){return NATURE}}]);return Scanner}((0,_mixinScanner2.default)(RectPath(Shape)));exports.default=Scanner;Component.register("scanner",Scanner)},{"./mixin-scanner":6}],9:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _mixinWheelSorter=require("./mixin-wheel-sorter");var _mixinWheelSorter2=_interopRequireDefault(_mixinWheelSorter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var _scene=scene,Component=_scene.Component,RectPath=_scene.RectPath,Shape=_scene.Shape;var NATURE={mutable:false,resizable:true,rotatable:true,properties:[{type:"number",label:"tilt",name:"tilt",property:"tilt"},{type:"number",label:"Wheel Size",name:"wheelSize",property:"wheelSize"},{type:"number",label:"value",name:"value",property:"value"},{type:"checkbox",label:"Animated",name:"animated",property:"animated"}]};var WheelSorter=function(_MixinWheelSorter){_inherits(WheelSorter,_MixinWheelSorter);function WheelSorter(){_classCallCheck(this,WheelSorter);return _possibleConstructorReturn(this,(WheelSorter.__proto__||Object.getPrototypeOf(WheelSorter)).apply(this,arguments))}_createClass(WheelSorter,[{key:"_draw",value:function _draw(ctx){var _model=this.model,width=_model.width,height=_model.height,left=_model.left,top=_model.top,animated=_model.animated;animated&&this.animOnState();ctx.beginPath();ctx.rect(left,top,width,height)}},{key:"is3dish",value:function is3dish(){return true}},{key:"nature",get:function get(){return NATURE}}]);return WheelSorter}((0,_mixinWheelSorter2.default)(RectPath(Shape)));exports.default=WheelSorter;Component.register("wheel-sorter",WheelSorter)},{"./mixin-wheel-sorter":7}]},{},[4]);