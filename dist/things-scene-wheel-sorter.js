!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@hatiolab/things-scene")):"function"==typeof define&&define.amd?define(["exports","@hatiolab/things-scene"],t):t((e=e||self)["things-scene-wheel-sorter"]={},e.scene)}(this,function(e,t){"use strict";const a=["#ccc","#afd0f1","#afd0f1","#ffba00","#e9746b"],r=["#999","#87b1db","#87b1db","#d96f21","#a73928"];const n=[function(e){var{height:t}=e.bounds,{rollWidth:n=10,animated:l}=e.model,o=Math.max(n,1),i=a[e.value]||a[0],s=r[e.value]||r[0],h=Math.min(1,o/10);o+=2*h,e._roller_pattern||(e._roller_pattern=document.createElement("canvas"));var d=Math.floor(2*o/3);e._roller_pattern.width=o+d,e._roller_pattern.height=t;var p=e._roller_pattern.getContext("2d");if(p.beginPath(),p.fillStyle=i,p.strokeStyle=s,p.lineWidth=h,p.ellipse(h+o/2,t-o/4-h,o/2,o/4,0,0,Math.PI),p.moveTo(h,t-o/4),p.lineTo(h,o/4),p.ellipse(h+o/2,o/4+h,o/2,o/4,0,Math.PI,0),p.lineTo(h+o,t-o/4),p.fill(),p.stroke(),p.globalAlpha=.2,p.lineWidth=o/3,l){var c=e._step%o;2==e.value&&(c=o-c),p.moveTo(c,t-o/4),p.lineTo(c,o/4),p.stroke()}return e._roller_pattern},function(e){var{height:t}=e.bounds,{rollWidth:n=10}=e.model,l=Math.max(n,1),o=a[e.value]||a[0],i=r[e.value]||r[0];e._roller_pattern||(e._roller_pattern=document.createElement("canvas")),e._roller_pattern.width=l,e._roller_pattern.height=t;var s=e._roller_pattern.getContext("2d");s.beginPath(),s.fillStyle=o,s.strokeStyle=i,s.lineWidth=1,s.moveTo(0,0),s.lineTo(l,0),s.lineTo(l,t),s.lineTo(0,t),s.lineTo(0,0),s.fill(),s.beginPath(),s.globalAlpha=.2;var h=(e._step||0)%l;return 2==e.value&&(h=l-h),s.moveTo(h,t),s.lineTo(h,0),s.stroke(),e._roller_pattern}];var l=e=>{var a=class extends(t.ValueHolder(e)){dispose(){super.dispose(),delete this._roller_pattern}animOnState(){if(!(1!==this.value&&2!==this.value||this.disposed)){(!this._step||this._step>4e4)&&(this._step=0==this.value),this._step++;var e=this;requestAnimationFrame(function(){e.clearCache("fillStyle"),e.invalidate()})}}get conveyorType(){var e=this.get("conveyorType");return 1!=e&&0!=e&&(e=0),e}get fillStyle(){return{image:n[this.conveyorType](this),offsetX:0,offsetY:0,type:"pattern"}}};return t.Component.memoize(a.prototype,"fillStyle",!1),t.Component.memoize(a.prototype,"conveyorType",!1),a};const o={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"select",label:"conveyor-type",name:"conveyorType",property:{options:[{display:"Roller",value:0},{display:"Belt",value:1}]}},{type:"number",label:"roll-width",name:"rollWidth"},{type:"number",label:"value",name:"value"},{type:"checkbox",label:"animation",name:"animated"}]};class i extends(l(t.RectPath(t.Shape))){get nature(){return o}render(e){var{width:t,height:a,left:r,top:n,animated:l=!1}=this.model;l&&this.animOnState(),e.beginPath(),e.rect(r,n,t,a)}is3dish(){return!1}}t.Component.register("conveyor",i),t.Component.register("conveyor-belt",i);const s={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"select",label:"conveyor-type",name:"conveyorType",property:{options:[{display:"Roller",value:0},{display:"Belt",value:1}]}},{type:"angle",label:"start-angle",name:"startAngle"},{type:"angle",label:"end-angle",name:"endAngle"},{type:"number",label:"ratio",name:"ratio"},{type:"number",label:"roll-width",name:"rollWidth"},{type:"number",label:"value",name:"value"},{type:"checkbox",label:"animation",name:"animated"}]};Math.PI;var h={ondragmove:function(e,t,a){var{cx:r,rx:n}=a.model,l=(a.transcoordP2S(e.x,e.y).x-r)/n*100;l=l>=100||l<=-100?100:Math.abs(l),a.set({ratio:l})}},d={ondragmove:function(e,t,a){var{cx:r,cy:n}=a.model,l=a.transcoordP2S(e.x,e.y),o=Math.atan2(-(l.y-n),l.x-r);o>0&&o<=Math.PI/2&&(o=Math.PI/2),o<0&&o>=-Math.PI/2&&(o=-Math.PI/2);var i=-o+Math.PI/2;a.set({startAngle:i})}},p={ondragmove:function(e,t,a){var{cx:r,cy:n}=a.model,l=a.transcoordP2S(e.x,e.y),o=Math.atan2(-(l.y-n),l.x-r);o>0&&o>=Math.PI/2&&(o=Math.PI/2),o<0&&o<=-Math.PI/2&&(o=-Math.PI/2);var i=-o+Math.PI/2;a.set({endAngle:i})}};class c extends(l(t.Donut)){get nature(){return s}is3dish(){return!1}render(e){var{ratio:t=50,cx:a,cy:r,rx:n,ry:l,startAngle:o=0,endAngle:i=Math.PI/2,animated:s=!1}=this.model;s&&this.animOnState(),e.beginPath(),o-=Math.PI/2,i-=Math.PI/2,e.ellipse(a,r,Math.abs(n),Math.abs(l),0,o,i),e.ellipse(a,r,Math.abs(n/100*t),Math.abs(l/100*t),0,i,o,!0),e.lineTo(n*Math.cos(o)+a,n*Math.sin(o)+r)}get controls(){var{cx:e,cy:t,rx:a,ratio:r,startAngle:n,endAngle:l}=this.model,o=[];return o.push({x:e+(a+a*r/100)/2*Math.sin(n),y:t-(a+a*r/100)/2*Math.cos(n),handler:d}),o.push({x:e+(a+a*r/100)/2*Math.sin(l),y:t-(a+a*r/100)/2*Math.cos(l),handler:p}),o.push({x:e+a/100*r,y:t,handler:h}),o}}t.Component.register("conveyor-join",c);const u={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"select",label:"conveyor-type",name:"conveyorType",property:{options:[{display:"Roller",value:0},{display:"Belt",value:1}]}},{type:"number",label:"roll-width",name:"rollWidth"},{type:"number",label:"value",name:"value"},{type:"checkbox",label:"animation",name:"animated"}]};class m extends(l(t.Polygon)){get nature(){return u}is3dish(){return!1}render(e){this.get("animated")&&this.animOnState(),super.render(e)}}t.Component.register("conveyor-join-trapezoid",m);const v=["#ccc","#afd0f1","#ffba00","#e9746b"],b=["#999","#87b1db","#d96f21","#a73928"];var y=e=>{var a=class extends(t.ValueHolder(e)){animOnState(){if(1===this.value&&!this.disposed){var e=this,t=Math.floor(100*Math.random());t=t<10?2:t>90?1:0,requestAnimationFrame(function(){e.delta("tilt",t),e.clearCache("fillStyle"),e.invalidate()})}}_draw_pattern(e){var{width:t,height:a,left:r,top:n}=this.bounds,{tilt:l=0,wheelSize:o=3}=this.model;l+=this.delta("tilt")||0,l%=3,l-=1;var i=v[this.value]||v[0],s=b[this.value]||b[0],h=10*o||Math.min(t/5,a/5);e.beginPath(),e.fillStyle=i,e.rect(r,n,t,a),e.fill(),e.strokeStyle=s,e.lineWidth=1,this._draw_wheel(e,h,l)}_draw_circle(e,t){for(var{width:a,height:r}=this.bounds,n=0,l=0;l<r;){for(n=0;n<a;)e.moveTo(n+t/2+t/3,l+t/2),e.ellipse(n+t/2,l+t/2,t/3,t/3,0,0,2*Math.PI,0),n+=t;l+=t}e.stroke()}_draw_inner(e,t,a){for(var{width:r,height:n}=this.bounds,l=0,o=0;o<n;){for(l=0;l<r;)e.translate(l,o),e.beginPath(),e.translate(t/2,t/2),e.rotate(a),e.moveTo(-t/6,-t/6),e.lineTo(-t/6,t/6),e.moveTo(t/6,-t/6),e.lineTo(t/6,t/6),e.stroke(),e.rotate(-a),e.translate(-t/2,-t/2),e.translate(-l,-o),l+=t;o+=t}}_draw_wheel(e,t,a){var{left:r,top:n}=this.bounds;e.beginPath(),e.translate(r,n),this._draw_circle(e,t),this._draw_inner(e,t,a)}};return t.Component.memoize(a.prototype,"fillStyle",!1),a};const g={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"number",label:"tilt",name:"tilt"},{type:"number",label:"wheel-size",name:"wheelSize"},{type:"number",label:"value",name:"value"},{type:"checkbox",label:"animation",name:"animated"}]};class f extends(y(t.RectPath(t.Shape))){get nature(){return g}render(e){var{width:t,height:a,left:r,top:n,animated:l}=this.model;l&&this.animOnState(),e.beginPath(),e.rect(r,n,t,a),e.clip()}postrender(e){super.postrender(e),this._draw_pattern(e)}is3dish(){return!1}}t.Component.register("wheel-sorter",f);const _=["rgba(0,0,0,.4)","rgba(175,208,241,.7)","rgba(255,186,0,.7)","rgba(198,50,40,.7)"],T=["rgba(0,0,0,.7)","rgba(175,208,241,1)","rgba(255,186,0,1)","rgba(198,50,40,1)"];function P(e){var{width:t,height:a}=e.bounds,r=_[e.value]||_[0],n=T[e.value]||T[0];e._scanner_pattern||(e._scanner_pattern=document.createElement("canvas")),e._scanner_pattern.width=t,e._scanner_pattern.height=a;var l,o=e._scanner_pattern.getContext("2d"),i=0,s=0;o.beginPath(),o.fillStyle=r,o.strokeStyle=n,o.rect(0,0,t,a),o.fill(),l=t/40,i=t/4,s=a/4,o.beginPath(),o.fillStyle="rgba(0,0,0,.7)",o.strokeStyle=null,o.moveTo(i+l,s),o.lineTo(i+t/2-l,s),o.quadraticCurveTo(i+t/2,s,i+t/2,s+l),o.lineTo(i+t/2,s+a/2-l),o.quadraticCurveTo(i+t/2,s+a/2,i+t/2-l,s+a/2),o.lineTo(i+l,s+a/2),o.quadraticCurveTo(i,s+a/2,i,s+a/2-l),o.lineTo(i,s+l),o.quadraticCurveTo(i,s,i+l,s),o.fill(),i+=.1*t,s+=.05*a;var h=0,d=.3*t,p=.4*a;return o.beginPath(),o.fillStyle="#fff",o.moveTo(i,s),o.rect(i,s+h,d,p/14*.9),h=p/14*2,o.rect(i,s+h,d,p/14*.3),h=p/14*4,o.rect(i,s+h,d,p/14*.4),h=p/14*6,o.rect(i,s+h,d,p/14*.8),h=p/14*8,o.rect(i,s+h,d,p/14*.6),h=p/14*10,o.rect(i,s+h,d,p/14),h=p/14*11,o.rect(i,s+h,d,p/14),h=p/14*14,o.rect(i,s+h,d,p/14*.3),o.fill(),o.beginPath(),i=t/2,s=.1*a,o.strokeStyle="#cc3300",o.lineWidth=1,o.moveTo(i,s),o.lineTo(i,.9*a),o.stroke(),e._scanner_pattern}var M=e=>{var a=class extends(t.ValueHolder(e)){dispose(){super.dispose(),delete this._scanner_pattern}get fillStyle(){return{image:P(this),offsetX:0,offsetY:0,type:"pattern",fitPattern:!0}}};return t.Component.memoize(a.prototype,"fillStyle",!1),a};const x={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"number",label:"value",name:"value"},{type:"number",label:"round",name:"round"}]};class S extends(M(t.RectPath(t.Shape))){get nature(){return x}render(e){var{width:t,height:a,left:r,top:n}=this.model,l=t/10;e.beginPath(),e.moveTo(r+l,n),e.lineTo(r+t-l,n),e.quadraticCurveTo(r+t,n,r+t,n+l),e.lineTo(r+t,n+a-l),e.quadraticCurveTo(r+t,n+a,r+t-l,n+a),e.lineTo(r+l,n+a),e.quadraticCurveTo(r,n+a,r,n+a-l),e.lineTo(r,n+l),e.quadraticCurveTo(r,n,r+l,n),e.clip()}is3dish(){return!1}}t.Component.register("scanner",S),e.Conveyor=i,e.ConveyorJoin=c,e.ConveyorJoinTrapezoid=m,e.WheelSorter=f,e.Scanner=S,Object.defineProperty(e,"__esModule",{value:!0})});